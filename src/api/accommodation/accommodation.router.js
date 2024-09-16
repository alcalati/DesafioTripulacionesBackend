import Router from 'express';
import * as accommodationController from './accommodation.controller.js';

const router = Router();

router.get('/all', accommodationController.getAll);

export default router;