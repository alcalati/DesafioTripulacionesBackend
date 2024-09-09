import workshopRepository from './workshop.repository.js';

export async function getAll() {
  return await workshopRepository.getAll();
}

export async function getByDay(day) {
  return await workshopRepository.getByDay(day); // Pasamos el número 1 o 2
}
