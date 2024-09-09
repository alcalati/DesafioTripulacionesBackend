import Router from 'express';
import * as workshopController from './workshop.controller.js';

const router = Router();

router.get('/all', workshopController.getAll);
router.get('/byDay', workshopController.getByDay); // Filtrar por 1 o 2

export default router;
