import userRepository from './users.repository.js';

export async function getUserById(id) {
  return await userRepository.getUserById(id);
}
