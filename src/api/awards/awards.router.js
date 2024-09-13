import Router from 'express';
import * as awardController from './awards.controller.js';

const router = Router();

router.post('/participation', awardController.createParticipation); // Inscripción
router.get('/participant/:participantId', awardController.getParticipations); // Ver participaciones
router.put('/update-status', awardController.updateAwardStatus); // Actualizar el estado del premio

export default router;
