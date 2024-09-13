import * as awardRepository from './awards.repository.js';

// Crear nueva participación
export async function createParticipation(participationData) {
  return await awardRepository.createParticipation(participationData);
}

// Buscar participaciones por participante
export async function getParticipationsByParticipant(participantId) {
  return await awardRepository.findByParticipant(participantId);
}

// Actualizar el estado de la participación
export async function updateAwardStatus(awardId, status) {
  return await awardRepository.updateAwardStatus(awardId, status);
}
