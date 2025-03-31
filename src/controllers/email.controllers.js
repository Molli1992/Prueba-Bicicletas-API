import nodemailer from "nodemailer";
import { UserNODEMAILER, PassNODEMAILER } from "../config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: UserNODEMAILER,
    pass: PassNODEMAILER,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ---------------------------------------- contact Email ------------------------------------------

export const contactEmail = async (req, res) => {
  try {
    const clientName = decodeURIComponent(req.body.clientName);
    const clientLastName = decodeURIComponent(req.body.clientLastName);
    const clientEmail = decodeURIComponent(req.body.clientEmail);
    const clientPhone = decodeURIComponent(req.body.clientPhone);
    const clientMessage = decodeURIComponent(req.body.clientMessage);

    if (
      !clientName ||
      !clientLastName ||
      !clientPhone ||
      !clientEmail ||
      !clientMessage
    ) {
      return res.status(400).send("Falta enviar datos obligatorios");
    }

    const mailOptions = {
      from: UserNODEMAILER,
      to: "felipe.blaksley@hotmail.com",
      subject: `Portfolio Felipe Blaksley`,
      html: `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 16px; background-color: #f9f9f9;">
          <h2 style="color: #8b0000; text-align: center; margin-bottom: 24px;">Mensaje de Contacto</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            Hola <strong>Portfolio Felipe Blaksley</strong>, un usuario ha enviado un mensaje desde el formulario de contacto de su sitio web.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;">
          <h3 style="color: #8b0000;">Detalles del mensaje</h3>
          <ul style="font-size: 15px; line-height: 1.5; list-style: none; padding: 0;">
            <li><strong>Nombre:</strong> ${clientName}</li>
            <li><strong>Apellido:</strong> ${clientLastName}</li>
            <li><strong>Email:</strong> ${clientEmail}</li>
            <li><strong>Telefono:</strong> ${clientPhone}</li>
          </ul>
          <p style="font-size: 16px; line-height: 1.5; margin-top: 16px;">
            <strong>Comentarios:</strong>
          </p>
          <blockquote style="font-size: 15px; line-height: 1.5; color: #555; padding: 12px; background-color: #f0f0f0; border-left: 4px solid #8b0000; margin: 0;">
            ${clientMessage}
          </blockquote>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;">
          <footer style="text-align: center; font-size: 14px; color: #777;">
            <p>Este correo fue generado automáticamente desde el sitio web de <strong>Portfolio Felipe Blaksley</strong>.</p>
          </footer>
    </div>
          `,
    };

    await transporter.sendMail(mailOptions);

    res.status(202).send({
      message: `Email enviado correctamente`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error interno del servidor", error: error });
  }
};
