import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { sendConfirmationEmail } from '../utils/emailService.js';

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Hashear la contraseña (agrega la lógica que usas para el hash)
    const hashedPassword = password; // Suponiendo que ya lo hasheas en otro lugar

    // Crear un nuevo usuario con confirmed: false
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmed: false,
    });

    await newUser.save();

    // Generar token JWT para confirmar email
    const emailToken = jwt.sign({ email }, process.env.JWT _SECRET, { expiresIn: '48h' });

    // Generar el URL de confirmación
    const confirmationUrl = `http://localhost:3000/api/auth/confirm/${emailToken}`;

    // Enviar email de confirmación
    await sendConfirmationEmail(email, 'Confirma tu registro', confirmationUrl);

    res.status(201).json({
      message: 'Te hemos enviado un email para confirmar tu registro.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
};

// Confirmar el email
export const confirmEmail = async (req, res) => {
  try {
    const { emailToken } = req.params;

    // Verificar el token
    const decoded = jwt.verify(emailToken, process.env.JWT _SECRET);

    // Actualizar el estado del usuario a "confirmed: true"
    await User.updateOne({ email: decoded.email }, { confirmed: true });

    res.status(200).send('Tu correo ha sido confirmado exitosamente.');
  } catch (error) {
    console.error(error);
    res.status(400).send('Enlace de confirmación inválido o expirado.');
  }
};
