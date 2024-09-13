import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './src/api/routes/authRoutes.js';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Verificar las variables de entorno
console.log('PORT:', process.env.PORT);
console.log('MONGO_URL:', process.env.MONGO_URL);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('JWT_SECRET:', ${process.env.JWT_SECRET_KEY}_SECRET);

app.use(express.json());
app.use('/api/auth', authRoutes);

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connection successfully'))
  .catch(err => console.error('Database connection error:', err));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
