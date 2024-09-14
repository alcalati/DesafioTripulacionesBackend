import nodemailer from 'nodemailer';
import { format } from 'url';

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'e-learningexperience@outlook.com',
    pass: '@Dexter2001',
  },
});

const sendConfirmationEmail = async (to, name, token) => {
  const url = format({
    protocol: 'https',
    host: 'desafiotripulacionesbackend.onrender.com',
    pathname: '/api/auth/confirm',
    query: { token },
  });

  const mailOptions = {
    from: 'e-learningexperience@outlook.com',
    to,
    subject: 'Confirm your registration',
    html: `<h2>Hello, ${name}!</h2>
           <p>To complete your registration, please <a href="${url}">click here</a>.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Could not send confirmation email');
  }
};

export { sendConfirmationEmail };
