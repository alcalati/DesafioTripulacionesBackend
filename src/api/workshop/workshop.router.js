import Router from 'express';
import * as workshopController from './workshop.controller.js';

const router = Router();

router.get('/all', workshopController.getAll);

export default router;
