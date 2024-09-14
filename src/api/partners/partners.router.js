import Router from 'express';
import * as partnerController from './partners.controller.js';

const router = Router();

router.get('/all', partnerController.getAll);

export default router;
