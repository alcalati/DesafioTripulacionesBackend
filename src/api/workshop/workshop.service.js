import workshopRepository from './workshop.repository.js';

export async function getAll() {
  const allWorkshops = await workshopRepository.getAll();
  return allWorkshops;
}
