import partnerRepository from './partner.repository.js';

export async function getAll() {
  return await partnerRepository.getAll();
}
