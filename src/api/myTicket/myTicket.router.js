import Router from 'express';
import * as myTicketController from './myTicket.controller.js';
// import { isAdmin } from '../../middleware/role.middleware.js'; // Middleware para verificar si es admin


const router = Router();

router.post('/purchase', myTicketController.purchaseTicket); // Ruta para comprar una entrada y generar el QR
// router.post('/validateQR', isAdmin, myTicketController.validateQR); // Solo admins pueden acceder a esta ruta
router.post('/validateQR', myTicketController.validateQR); // Solo admins pueden acceder a esta ruta

export default router;
