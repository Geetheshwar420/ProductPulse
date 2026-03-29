import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.put('/update-password', authenticateToken, AuthController.updatePassword);
router.get('/profile/:id', authenticateToken, AuthController.getProfile);

export default router;
