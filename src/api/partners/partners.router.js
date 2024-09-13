import Router from 'express';
import * as partnerController from './partners.controller.js';

const router = Router();

// Ruta para obtener todos los partners
router.get('/', partnerController.getAllPartners);

export default router;
