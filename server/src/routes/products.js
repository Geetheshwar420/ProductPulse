import express from 'express';
import { ProductController } from '../controllers/product.controller.js';

import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/me', authenticateToken, ProductController.getMyProducts);
router.get('/stats', authenticateToken, ProductController.getDashboardStats);
router.get('/:id', ProductController.getProductById);

export default router;
