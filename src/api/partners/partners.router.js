import Router from 'express';
import * as partnerController from './partners.controller.js';

const router = Router();

// Ruta para obtener todos los partners
router.get('/all', partnerController.getAllPartners);

export default router;
