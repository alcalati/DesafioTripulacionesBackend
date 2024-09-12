import * as meetingService from './meetings.service.js';

export async function scheduleMeeting(req, res) {
  const { partnerId, clientId, startTime, } = req.body;
  try {
    const meeting = await meetingService.scheduleMeeting(partnerId, clientId, startTime);
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling meeting', error, });
  }
}

export async function getUserMeetings(req, res) {
  const { userId, } = req.params;
  try {
    const meetings = await meetingService.getUserMeetings(userId);
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving meetings', error, });
  }
}
