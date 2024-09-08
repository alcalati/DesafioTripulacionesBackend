import ticketModel from './ticket.model.js';

async function getAll() {
  const allTickets = await ticketModel.find({}).lean();
  return allTickets;
}

export default getAll;