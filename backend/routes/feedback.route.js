import express from 'express'; 
import {
  submitFeedback,
  getFeedbackForClass,
  getFeedbackForInstructor
} from '../controllers/feedback.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post('/', protect, submitFeedback);
router.get('/class/:classId', protect, getFeedbackForClass);
router.get('/instructor', protect, getFeedbackForInstructor);

export default router;