import ticketRepository from './ticket.repository.js';

async function getAll() {
  const allTickets = await ticketRepository.getAll();
  return allTickets;
}

export default getAll;