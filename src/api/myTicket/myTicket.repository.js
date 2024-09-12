import myTicketModel from './myTicket.model.js';

// Repositorio para crear un nuevo ticket de compra
export async function createTicket(userId, ticketId, qrCode) {
  const newTicket = new myTicketModel({
    user: userId,
    ticket: ticketId,
    qrCode, // Guardamos el código QR generado
  });

  return await newTicket.save();
}

// Repositorio para buscar un ticket por su ID y el del usuario
export async function findTicketByIds(ticketId, userId) {
  return await myTicketModel.findOne({ ticket: ticketId, user: userId, }).lean();
}

export default {
  createTicket,
  findTicketByIds,
};
