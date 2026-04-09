import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/errorHandler';
import { verifyToken, requireManager } from '../middleware/auth';
import { generateSchedule } from '../controllers/ai.controller';

const router = Router();

router.post(
  '/generate-schedule',
  verifyToken,
  requireManager,
  [
    body('start_date').isDate(),
    body('end_date').isDate()
  ],
  validateRequest,
  generateSchedule
);

export default router;
