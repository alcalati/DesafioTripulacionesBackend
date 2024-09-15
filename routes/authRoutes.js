import express from 'express';
import { register, login, forgotPassword, verifyEmail } from '../controllers/authController.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// Validación de datos
const validateUser = [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Registro de usuario
router.post('/register', validateUser, (req, res, next) => {
  console.log('Validating user registration');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, (req, res) => {
  console.log('Passing to register controller');
  register(req, res);
});

// Login de usuario
router.post('/login', (req, res) => {
  console.log('Login request received');
  login(req, res);
});

// Recuperación de contraseña
router.post('/forgot-password', (req, res) => {
  console.log('Forgot password request received');
  forgotPassword(req, res);
});

// Confirmación de email
router.get('/verify-email/:token', (req, res) => {
  console.log('Email verification request received with token:', req.params.token);
  verifyEmail(req, res);
});

export default router;
