import express from 'express';
import { register, login, forgotPassword } from '../controllers/authController.js';
import { check, validationResult } from 'express-validator';
import { verifyEmail } from '../controllers/authController.js'; // Importar la función de verificación

const router = express.Router();

router.get('/verify-email/:token', verifyEmail);

// Validación de datos
const validateUser = [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6, }).withMessage('Password must be at least 6 characters'),
];

// Registro de usuario
router.post('/register', validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, register);

// Login de usuario
router.post('/login', login);

// Recuperación de contraseña
router.post('/forgot-password', forgotPassword);

export default router;
