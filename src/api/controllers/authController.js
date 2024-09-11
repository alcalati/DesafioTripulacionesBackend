import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendPasswordResetEmail } from '../utils/emailService.js';
import crypto from 'crypto';

// Registrar un nuevo usuario
export const register = async (req, res) => {
  const { username, email, password, name, lastName, company, charge, role, linkedin, allergies } = req.body;

  console.log("Datos recibidos en el registro:", req.body);

  try {
    // Validación de campos obligatorios
    if (!username || !email || !password) {
      console.log("Campos obligatorios faltantes");
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ email });
    console.log("Usuario encontrado con el email:", existingUser);

    if (existingUser) {
      console.log("Email ya registrado:", email);
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Contraseña hasheada:", hashedPassword);

    // Crear nuevo usuario
    const user = new User({
      username,
      email,
      password: hashedPassword,
      name,
      lastName, // Asegurarse de que el campo sea lastName, no last-Name
      company,
      charge,
      role,
      linkedin,
      allergies,
    });

    // Guardar usuario en la base de datos
    const savedUser = await user.save();
    console.log("Usuario guardado:", savedUser);

    // Responder con mensaje de éxito
    res.status(201).json({ message: 'User registered successfully', user });

  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Iniciar sesión de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).json({ error: 'Error logging in' });
  }
};

// Recuperación de contraseña
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    
    // Enviar email con Nodemailer
    await sendPasswordResetEmail(user.email, 'Password Reset', `Click here to reset your password: ${resetLink}`);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error("Error al enviar el correo de recuperación:", err);
    res.status(500).json({ error: 'Error sending password reset email' });
  }
};
