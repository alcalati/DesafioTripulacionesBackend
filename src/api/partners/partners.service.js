import partnersRepository from './partners.repository.js';

export async function getAll() {
  return await partnersRepository.getAll();
}

