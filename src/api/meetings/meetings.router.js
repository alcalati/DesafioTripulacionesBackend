import Router from 'express';
import * as meetingController from './meetings.controller.js';

const router = Router();

// Ruta para agendar una reunión
router.post('/schedule', meetingController.scheduleMeeting);

// Ruta para obtener las reuniones de un usuario
router.get('/:userId/meetings', meetingController.getUserMeetings);

export default router;
