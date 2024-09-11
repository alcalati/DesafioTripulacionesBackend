import Router from 'express';
import * as userController from './users.controller.js';

const router = Router();

router.get('/:id', userController.getUserById); // Ruta para obtener un usuario por su _id

export default router;
