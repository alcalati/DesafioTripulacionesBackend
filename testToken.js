import { sendConfirmationEmail } from './src/api/utils/emailService.js';

// Definir el token y la URL de confirmación
const emailToken = 'your_test_token'; // Puedes usar un token de prueba si lo tienes
const confirmationLink = `http://localhost:3000/api/auth/confirm/${emailToken}`;

// Probar la función de envío de correo
sendConfirmationEmail('nhentai17@gmail.com', 'Confirm Your Email', confirmationLink)
  .then(() => console.log('Email sent successfully'))
  .catch(err => console.error('Error sending email:', err));
