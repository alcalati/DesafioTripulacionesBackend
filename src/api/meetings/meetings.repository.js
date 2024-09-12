import meetingModel from './meetings.model.js';

// Crear una nueva reunión
export async function createMeeting(partnerId, clientId, startTime, endTime) {
  const meeting = new meetingModel({ partner: partnerId, client: clientId, startTime, endTime, });
  return await meeting.save();
}

// Buscar reuniones de un cliente o partner
export async function getMeetingsByUser(userId) {
  return await meetingModel.find({ $or: [{ partner: userId, }, { client: userId, },], }).lean();
}
