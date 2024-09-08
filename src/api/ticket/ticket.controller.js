import * as ticketService from './ticket.service.js';

export async function getAll(req, res) {
  const allTickets = await ticketService.getAll();
  res.json(allTickets);
}
