export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ reply: "Méthode non autorisée." });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ reply: "Message manquant." });
  }

  try {
    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GOOGLE_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await geminiResponse.json();

    let reply = "Réponse vide.";
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (typeof candidateText === "string") {
      reply = candidateText;
    } else if (data?.error?.message) {
      reply = "Erreur Gemini: " + data.error.message;
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Erreur Google Gemini:", err);
    return res.status(500).json({ reply: "Erreur serveur. Veuillez réessayer plus tard." });
  }
}
