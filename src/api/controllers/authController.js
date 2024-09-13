import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendConfirmationEmail } from '../utils/emailService.js';

// Obtén las variables de entorno
const JWT_SECRET = `${${process.env.JWT_SECRET_KEY}_SECRET}`;
const EMAIL_USER = `${process.env.EMAIL_USER}`;
const EMAIL_PASS = `${process.env.EMAIL_PASS}`;

// Registro de usuario
export const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'El usuario ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario con "confirmed" en false
    const user = new User({
      email,
      password: hashedPassword,
      username,
      confirmed: false,
    });

    // Generar el token de confirmación
    const confirmationToken = jwt.sign(
      { email: user.email },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Establecer el token y su expiración en el usuario
    user.confirmationToken = confirmationToken;
    user.confirmationTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutos
    await user.save();

    // Crear URL de confirmación
    const url = `http://localhost:3000/api/auth/confirm/${confirmationToken}`;

    // Enviar email de confirmación
    await sendConfirmationEmail(user.email, 'Confirma tu registro', `Para finalizar tu registro, haz clic en el siguiente enlace: <a href="${url}">${url}</a>`);

    res.status(201).send({
      message: 'Te hemos enviado un email para confirmar tu registro',
      user,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// Confirmar email
export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Verificar el token
    const payload = jwt.verify(token, JWT_SECRET);

    // Verificar si el token ha expirado
    const user = await User.findOne({ email: payload.email });
    if (!user || user.confirmationTokenExpires < Date.now()) {
      return res.status(400).send('El enlace de confirmación ha expirado o el usuario no existe.');
    }

    // Actualizar el estado del usuario a "confirmed: true"
    user.confirmed = true;
    user.confirmationToken = undefined;
    user.confirmationTokenExpires = undefined;
    await user.save();

    res.status(200).send('Tu correo ha sido verificado correctamente.');
  } catch (err) {
    res.status(400).send('Enlace roto o inválido.');
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send({ message: 'Usuario no encontrado' });

  // Verificar si el usuario ha confirmado el email
  if (!user.confirmed) {
    return res.status(400).send({ message: 'Debes confirmar tu email para iniciar sesión' });
  }

  // Verificar la contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send({ message: 'Contraseña incorrecta' });

  // Generar el token de acceso
  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' });

  // Generar el token de refresh
  const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

  res.status(200).send({
    accessToken,
    refreshToken,
    user,
  });
};

// Refrescar token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Verificar el token de refresh
    const payload = jwt.verify(refreshToken, JWT_SECRET);

    // Generar un nuevo token de acceso
    const newAccessToken = jwt.sign({ userId: payload.userId }, JWT_SECRET, { expiresIn: '15m' });

    res.status(200).send({
      accessToken: newAccessToken,
    });
  } catch (err) {
    res.status(400).send({ error: 'Token de refresh inválido o expirado' });
  }
};

// Recuperación de contraseña (placeholder)
export const forgotPassword = async (req, res) => {
  // Lógica para recuperación de contraseña (ej. enviar un correo con un enlace para resetear la contraseña)
  res.status(200).send({ message: 'Funcionalidad de recuperación de contraseña aún no implementada' });
};
