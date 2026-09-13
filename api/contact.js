import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ code: 405, message: "Méthode non autorisée." });
  }

  const { firstName, lastName, email, phone, message } = req.body || {};

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
Téléphone : ${phone || "-"}

Message :
${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ code: 200, message: "Message envoyé !" });
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    return res.status(500).json({ code: 500, message: "Erreur d'envoi du message." });
  }
}
