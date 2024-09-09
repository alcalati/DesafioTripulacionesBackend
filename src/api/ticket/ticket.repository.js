import ticketModel from './ticket.model.js';

async function getAll() {
  return await ticketModel.find({}).lean();
}

// Repositorio para filtrar tickets por tipo (public o private en la posición 0 del array)
async function getByType(type) {
  return await ticketModel.find({ 'type.0': type, }).lean(); // Filtramos por el primer elemento del array `type`
}

export default { getAll, getByType, };
