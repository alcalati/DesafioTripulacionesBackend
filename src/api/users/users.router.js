import Router from 'express';
import * as userController from './users.controller.js';
import { protect } from '../../../middlewares/authMiddleware.js';

const router = Router();

// Rutas protegidas
router.get('/:id', protect, userController.getUserById);

export default router;
