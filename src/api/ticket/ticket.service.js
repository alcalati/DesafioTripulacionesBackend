import ticketRepository from './ticket.repository.js';

export async function getAll() {
  const allTickets = await ticketRepository.getAll();
  return allTickets;
}
