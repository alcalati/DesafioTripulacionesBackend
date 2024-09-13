import * as meetingRepository from './meetings.repository.js';

// Servicio para agendar una reunión
export async function scheduleMeeting(partnerId, clientId, startTime) {
  const start = new Date(startTime);
  const end = new Date(startTime);
  end.setMinutes(end.getMinutes() + 30); // Duración de 30 minutos

  // Verificar si hay un conflicto de horarios
  const conflict = await meetingRepository.checkConflicts(partnerId, clientId, start, end);
  if (conflict) {
    throw new Error('Meeting time conflicts with an existing meeting');
  }

  return await meetingRepository.createMeeting(partnerId, clientId, start, end);
}
