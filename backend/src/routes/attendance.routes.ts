import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/errorHandler';
import { verifyToken } from '../middleware/auth';
import { clockIn, clockOut } from '../controllers/attendance.controller';

const router = Router();

router.use(verifyToken);

router.post(
  '/clock-in',
  [body('shift_assignment_id').notEmpty()],
  validateRequest,
  clockIn
);

router.post(
  '/clock-out',
  [body('shift_assignment_id').notEmpty()],
  validateRequest,
  clockOut
);

export default router;
