import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import feedbackRoutes from './routes/feedback.js';
import opportunityRoutes from './routes/opportunities.js';
import { ProductController } from './controllers/product.controller.js';
import { UserController } from './controllers/user.controller.js';
import { FeedbackController } from './controllers/feedback.controller.js';
import { OpportunityController } from './controllers/opportunity.controller.js';
import { adminOnly, authenticateToken } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security: HTTP headers
app.use(helmet());

// Security: CORS - restrict to known origins
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',');
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Security: Rate limiting on auth routes (max 20 requests per 15 min window)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

app.use(express.json({ limit: '1mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authLimiter, authRoutes);

// Feedback routes
app.get('/api/feedback/developer', authenticateToken, FeedbackController.getDeveloperFeedback);
app.use('/api/feedback', feedbackRoutes);

// Opportunity routes
app.patch('/api/opportunities/:id/status', authenticateToken, adminOnly, OpportunityController.updateStatus);
app.post('/api/opportunities/assign', authenticateToken, adminOnly, OpportunityController.assignTester);
app.use('/api/opportunities', opportunityRoutes);

// Product Management (Consolidated under ProductController)
app.get('/api/products/stats', authenticateToken, ProductController.getDashboardStats);
app.get('/api/products/me', authenticateToken, ProductController.getMyProducts);
app.get('/api/products', authenticateToken, ProductController.getAllProducts);
app.get('/api/products/:id', authenticateToken, ProductController.getProductById);
app.get('/api/products/:id/feedback', authenticateToken, ProductController.getProductFeedback);
app.post('/api/products', authenticateToken, ProductController.createProduct);
app.put('/api/products/:id/status', authenticateToken, adminOnly, ProductController.updateProductStatus);

// User Management
app.get('/api/users', authenticateToken, adminOnly, UserController.getAllUsers);
app.put('/api/users/:id/status', authenticateToken, adminOnly, UserController.updateUserStatus);
app.post('/api/users/award-points', authenticateToken, UserController.awardPoints);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', database: 'sqlite + drizzle' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
