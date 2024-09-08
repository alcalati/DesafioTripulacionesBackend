import Router from 'express';
import * as ticketController from './ticket.controller.js';

const router = Router();

router.get('/all', ticketController.getAll);

export default router;
