import meetingModel from './meetings.model.js';

// Repositorio para crear una reunión
export async function createMeeting(partnerId, clientId, start, end) {
  const meeting = new meetingModel({
    partner: partnerId,
    client: clientId,
    start,
    end,
    status: 'scheduled',
  });
  return await meeting.save();
}

// Repositorio para obtener reuniones por usuario
export async function getMeetingsByUser(userId) {
  return await meetingModel.find({
    $or: [{ partner: userId, }, { client: userId, },],
  }).lean();
}

// Repositorio para comprobar conflictos de horarios
export async function checkConflicts(partnerId, clientId, start, end) {
  return await meetingModel.findOne({
    $or: [
      { partner: partnerId, start: { $lt: end, }, end: { $gt: start, }, },
      { client: clientId, start: { $lt: end, }, end: { $gt: start, }, },
    ],
  });
}
