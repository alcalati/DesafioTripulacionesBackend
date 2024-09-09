import Router from 'express';
import * as ticketController from './ticket.controller.js';

const router = Router();

router.get('/all', ticketController.getAll);
router.get('/byType', ticketController.getByType); // Ruta para filtrar por tipo (public o private)

export default router;
