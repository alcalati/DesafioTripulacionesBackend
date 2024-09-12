import Router from 'express';
import * as meetingController from './meetings.controller.js';

const router = Router();

router.post('/schedule', meetingController.scheduleMeeting);
router.get('/:userId/meetings', meetingController.getUserMeetings);

export default router;
