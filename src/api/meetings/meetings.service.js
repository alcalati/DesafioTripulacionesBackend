import * as meetingRepository from './meetings.repository.js';

// Servicio para agendar una reunión
export async function scheduleMeeting(partnerId, clientId, start, end) {
  start = start.toString().slice(0, 19);
  end = end.toString().slice(0, 19);

  // Verificar si hay un conflicto de horarios
  const conflict = await meetingRepository.checkConflicts(partnerId, clientId, start, end);
  if (conflict) {
    throw new Error('Meeting time conflicts with an existing meeting');
  }

  return await meetingRepository.createMeeting(partnerId, clientId, start, end);
}
