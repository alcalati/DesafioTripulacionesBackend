import User from '../src/api/users/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendPasswordResetEmail, sendVerificationEmail } from '../utils/emailService.js';
import crypto from 'crypto';
import QRCode from 'qrcode';  // Importamos la librería para generar el QR

export const register = async (req, res) => {
  const { username, email, password, name, lastName, company, charge, role, linkedIn, allergies } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Generar QR con la URL del LinkedIn
    const qrCode = await QRCode.toDataURL(linkedIn);

    // Crear el nuevo usuario con todos los campos incluyendo el QR generado
    const user = new User({
      username,
      email,
      password,
      name,
      lastName,
      company,
      charge,
      role,
      linkedIn,
      allergies,
      qrCode,  // Almacenamos el QR en la base de datos
    });

    // Guardar el token de verificación y el usuario en la base de datos
    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.verificationToken = verificationToken;
    await user.save();

    const verificationLink = `https://desafiotripulacionesbackend.onrender.com/auth/verify-email/${verificationToken}`;

    // Enviar email de verificación
    await sendVerificationEmail(email, 'Email Verification', `Click here to verify your email: ${verificationLink}`);

    res.status(200).json({ message: 'User registered successfully, please check your email to verify your account.' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user', details: err.message });
  }
};


export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ error: 'Invalid token' });

    // Marcar al usuario como confirmado
    user.verificationToken = undefined;
    user.confirmed = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error verifying email', details: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.confirmed) {
      return res.status(403).json({ error: 'Please verify your email before logging in.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');
    const resetLink = `https://desafiotripulacionesbackend.onrender.com/${token}`;

    // Enviar email con Nodemailer
    await sendPasswordResetEmail(user.email, 'Password Reset', `Click here to reset your password: ${resetLink}`);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Error sending password reset email' });
  }
};
