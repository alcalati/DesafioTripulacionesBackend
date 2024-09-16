import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'e-learningexperience@outlook.com',
    pass: '@Dexter2001',
  },
});

// Función para enviar el código QR por email
export const sendQrCodeEmail = async (to, qrCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your Ticket QR Code',
    text: 'Please find your ticket QR code attached.',
    attachments: [
      {
        filename: 'ticket-qr.png',
        content: qrCode.split("base64,")[1],
        encoding: 'base64'
      },
    ],
  };

  return transporter.sendMail(mailOptions);
};
// Función para enviar el correo de verificación
export const sendVerificationEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

// También puedes mantener la función para el restablecimiento de contraseña
export const sendPasswordResetEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};
