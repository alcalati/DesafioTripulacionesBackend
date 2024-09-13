import express from 'express';
import { registerUser, login, forgotPassword, confirmEmail } from '../controllers/authController.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// Validación de datos para el registro
const validateUser = [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('username').notEmpty().withMessage('Username is required')
];

// Registro de usuario
router.post('/register', validateUser, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, registerUser);

// Login de usuario
router.post('/login', login);

// Recuperación de contraseña
router.post('/forgot-password', forgotPassword);

// Confirmación de email
router.get('/confirm/:token', confirmEmail);

export default router;
