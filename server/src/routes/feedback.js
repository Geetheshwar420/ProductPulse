import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { FeedbackController } from '../controllers/feedback.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure Multer for screenshots
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.post('/', authenticateToken, upload.array('screenshots'), FeedbackController.submitFeedback);
router.get('/recent', authenticateToken, FeedbackController.getRecentFeedback);
router.get('/product/:productId', FeedbackController.getProductFeedback);

export default router;
