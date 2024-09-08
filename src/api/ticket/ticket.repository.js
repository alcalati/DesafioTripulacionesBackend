import ticketModel from './ticket.model.js';

export async function getAll() {
  const allTickets = await ticketModel.find({}).lean();
  return allTickets;
}