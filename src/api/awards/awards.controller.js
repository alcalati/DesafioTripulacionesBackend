import * as awardService from './awards.service.js';

// Controlador para inscribirse en el premio
export async function createParticipation(req, res) {
  const { ideaTitle, description, participantId, } = req.body;
  try {
    const participation = await awardService.createParticipation({ ideaTitle, description, participant: participantId, });
    res.json(participation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating participation', error, });
  }
}

// Controlador para ver participaciones por usuario
export async function getParticipations(req, res) {
  const { participantId, } = req.params;
  try {
    const participations = await awardService.getParticipationsByParticipant(participantId);
    res.json(participations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching participations', error, });
  }
}

// Controlador para actualizar el estado del premio
export async function updateAwardStatus(req, res) {
  const { awardId, status, } = req.body;
  try {
    const updatedAward = await awardService.updateAwardStatus(awardId, status);
    res.json(updatedAward);
  } catch (error) {
    res.status(500).json({ message: 'Error updating award status', error, });
  }
}
