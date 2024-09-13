import ticketRepository from './ticket.repository.js';

export async function getAll() {
  return await ticketRepository.getAll();
}

// Servicio para filtrar por tipo (public o private)
export async function getByType(type) {
  return await ticketRepository.getByType(type);
}
