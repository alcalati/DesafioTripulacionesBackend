import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './src/api/routes/authRoutes.js'; // Ruta corregida para authRoutes
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const app = express();

// Middleware para analizar cuerpos JSON
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Conectar a la base de datos
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB_NAME, // Usar el nombre de la base de datos desde .env
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connection successfully'))
  .catch(err => console.error('Database connection error:', err));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
