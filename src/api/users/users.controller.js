import * as userService from './users.service.js';

// Controlador para obtener un usuario por _id
export async function getUserById(req, res) {
  const { id, } = req.params; // Extraemos el id de los parámetros de la URL
  try {
    const user = await userService.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found', });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user by ID', error, });
  }
}
