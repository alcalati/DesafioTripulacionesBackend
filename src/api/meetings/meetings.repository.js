import meetingModel from './meetings.model.js';

// Repositorio para crear una reunión
export async function createMeeting(partnerId, clientId, startTime, endTime) {
  const meeting = new meetingModel({
    partner: partnerId,
    client: clientId,
    startTime,
    endTime,
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
export async function checkConflicts(partnerId, clientId, startTime, endTime) {
  return await meetingModel.findOne({
    $or: [
      { partner: partnerId, startTime: { $lt: endTime, }, endTime: { $gt: startTime, }, },
      { client: clientId, startTime: { $lt: endTime, }, endTime: { $gt: startTime, }, },
    ],
  });
}
