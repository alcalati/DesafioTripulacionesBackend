import awardModel from './awards.model.js';

// Crear nueva participación
export async function createParticipation(participationData) {
  const participation = new awardModel(participationData);
  return await participation.save();
}

// Buscar participaciones por participante
export async function findByParticipant(participantId) {
  return await awardModel.find({ participant: participantId, });
}

// Actualizar el estado del premio
export async function updateAwardStatus(awardId, status) {
  return await awardModel.findByIdAndUpdate(awardId, { status, }, { new: true, });
}

export default { createParticipation, findByParticipant, updateAwardStatus, };
