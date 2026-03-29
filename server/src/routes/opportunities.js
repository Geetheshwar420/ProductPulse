import express from 'express';
import { OpportunityController } from '../controllers/opportunity.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Apply for a testing opportunity
router.post('/apply', authenticateToken, OpportunityController.apply);

// Get my testing applications (for tester)
router.get('/me', authenticateToken, OpportunityController.getMyApplications);

// Get all applications (for admins)
router.get('/all', authenticateToken, OpportunityController.getAllApplications);
// Update application status
router.patch('/:id/status', authenticateToken, OpportunityController.updateStatus);

export default router;
