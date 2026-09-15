import {
  SYSTEM_INSTRUCTION,
  buildGeminiContents,
  sanitizeMessage,
} from "../lib/godlightContext.js";

const GEMINI_MODEL = "gemini-3.8-flash";
const REQUEST_TIMEOUT_MS = 15000;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ reply: "Méthode non autorisée." });
  }

  const message = sanitizeMessage(req.body?.message);
  if (!message) {
    return res.status(400).json({ reply: "Message manquant." });
  }

  if (!process.env.GOOGLE_API_KEY) {
    console.error("GOOGLE_API_KEY manquante.");
    return res.status(500).json({
      reply: "L'assistant n'est pas configuré pour le moment. Merci d'utiliser le formulaire de contact.",
    });
  }

  const contents = buildGeminiContents(req.body?.history, message);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GOOGLE_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents,
          generationConfig: { temperature: 0.6, maxOutputTokens: 512 },
        }),
        signal: controller.signal,
      }
    );

    const data = await geminiResponse.json();

    let reply = "Réponse vide.";
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof candidateText === "string" && candidateText.trim()) {
      reply = candidateText.trim();
    } else if (data?.error?.message) {
      console.error("Erreur Gemini:", data.error.message);
      reply = "Désolé, je n'ai pas pu répondre pour le moment. Réessayez ou utilisez le formulaire de contact.";
    }

    return res.status(200).json({ reply });
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("Timeout Gemini");
      return res.status(504).json({ reply: "La réponse a pris trop de temps. Réessayez." });
    }
    console.error("Erreur Google Gemini:", err);
    return res.status(500).json({ reply: "Erreur serveur. Veuillez réessayer plus tard." });
  } finally {
    clearTimeout(timeout);
  }
}
