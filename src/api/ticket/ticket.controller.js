import * as ticketService from './ticket.service.js';

export async function getAll(req, res) {
  try {
    const allTickets = await ticketService.getAll();
    res.json(allTickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error, });
  }
}

// Controlador para filtrar por tipo (public o private)
export async function getByType(req, res) {
  const { type, } = req.query; // Se espera "public" o "private"
  try {
    const tickets = await ticketService.getByType(type);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets by type', error, });
  }
}
