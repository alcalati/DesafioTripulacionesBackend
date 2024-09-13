// users.repository.js
import UserModel from './users.model.js';

// Función para obtener un usuario por su ID
async function getUserById(userId) {
  try {
    return await UserModel.findById(userId);
  } catch (error) {
    throw new Error('Error retrieving user from database');
  }
}

// Exportar como default
export default {
  getUserById,
  // Otras funciones pueden ir aquí
};
