import express from 'express';
import './database.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const server = express();
server.use(express.json());
server.use(cors({ origin: true }));

// Rutas de autenticación
server.use('/api/auth', authRoutes);

// Puerto y escucha del servidor
const { PORT } = process.env;
const port = PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
