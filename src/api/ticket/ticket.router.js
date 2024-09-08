import Router from 'express';
import * as ticketController from './clothes.controller.js';

const router = Router();

router.get('/all', ticketController.getAll);

export default router;
