import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: String },
  charge: { type: String },
  role: { type: String },
  linkedIn: { type: String },
  allergies: { type: String },
  verificationToken: { type: String }, // Campo para almacenar el token de verificación
  confirmed: { type: Boolean, default: false }, // Para confirmar el correo
  qrCode: { type: String }, // Campo para almacenar el QR code generado con LinkedIn
});

// Hash de la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
export default User;