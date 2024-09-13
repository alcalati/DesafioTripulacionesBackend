import * as meetingService from './meetings.service.js';

// Controlador para agendar una reunión
export async function scheduleMeeting(req, res) {
  const { partnerId, clientId, startTime } = req.body;

  if (!partnerId || !clientId || !startTime) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const meeting = await meetingService.scheduleMeeting(partnerId, clientId, startTime);
    res.json(meeting);
  } catch (error) {
    if (error.message === 'Partner or client does not exist in the user database') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error scheduling meeting', error: error.message });
  }
}

// Controlador para obtener reuniones de un usuario
export async function getUserMeetings(req, res) {
  const { userId } = req.params;

  try {
    const meetings = await meetingService.getUserMeetings(userId);
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving meetings', error: error.message });
  }
}
