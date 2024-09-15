import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import apiRouter from './src/api/router.js';
import './database.js';

const server = express();
server.use(express.json());
server.use(cors({ origin: true }));

// Rutas de autenticación
server.use('/api/auth', authRoutes);

// Rutas API
server.use('/api', apiRouter);

// Puerto y escucha del servidor
const { PORT } = process.env;
const port = PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
