import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import './database.js';
import apiRouter from './src/api/router.js';

const server = express();
server.use(express.json());
server.use(cors({ origin: true }));

// Rutas de autenticación
server.use('/auth', authRoutes); // Esto debería funcionar

// Asegúrate de que apiRouter no esté interfiriendo
server.use(apiRouter);

// Puerto y escucha del servidor
const { PORT } = process.env;
const port = PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});