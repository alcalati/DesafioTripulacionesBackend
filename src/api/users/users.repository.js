import userModel from './users.model.js';

// Repositorio para obtener un usuario por _id
async function getUserById(id) {
  return await userModel.findById(id).lean();
}

export default { getUserById, };
