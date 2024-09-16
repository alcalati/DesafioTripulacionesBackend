import accommodationRepository from './accommodation.repository.js';

export async function getAll() {
  return await accommodationRepository.getAll();
}