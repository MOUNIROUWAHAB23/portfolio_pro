import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch"; // npm install node-fetch@2
import {
  SYSTEM_INSTRUCTION,
  buildGeminiContents,
  sanitizeMessage,
} from "./lib/godlightContext.js";

dotenv.config();

const GEMINI_MODEL = "gemini-3.8-flash";
const REQUEST_TIMEOUT_MS = 15000;

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// === ENDPOINT CONTACT ===
app.post("/api/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ code: 400, message: "Merci de remplir tous les champs obligatoires." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
    subject: "Message via formulaire de contact",
    text: `
      Nouveau message reçu :

      Prénom : ${firstName}
      Nom : ${lastName}
      Email : ${email}
      Téléphone : ${phone}

      Message :
      ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ code: 200, message: "Message envoyé !" });
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    res.status(500).json({ code: 500, message: "Erreur d'envoi du message." });
  }
});

// === ENDPOINT CHATBOT (Google Gemini) ===

app.post("/api/chat", async (req, res) => {
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

    res.json({ reply });
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("Timeout Gemini");
      return res.status(504).json({ reply: "La réponse a pris trop de temps. Réessayez." });
    }
    console.error("Erreur Google Gemini:", err);
    res.status(500).json({ reply: "Erreur serveur. Veuillez réessayer plus tard." });
  } finally {
    clearTimeout(timeout);
  }
});

// === SERVE REACT FRONTEND BUILD ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// === START SERVER ===
app.listen(PORT, () => {
  console.log(`✅ Serveur en écoute sur http://localhost:${PORT}`);
});