import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/errorHandler';
import { verifyToken, requireManager } from '../middleware/auth';
import { createShift, publishWeeklySchedule, getShifts } from '../controllers/shift.controller';

const router = Router();

router.use(verifyToken);

router.get('/', getShifts);

router.post(
  '/',
  requireManager,
  [
    body('title').notEmpty(),
    body('shift_date').isDate(),
    body('start_time').notEmpty(),
    body('end_time').notEmpty(),
    body('user_ids').isArray()
  ],
  validateRequest,
  createShift
);

router.post(
  '/publish',
  requireManager,
  [
    body('start_date').isDate(),
    body('end_date').isDate()
  ],
  validateRequest,
  publishWeeklySchedule
);

export default router;
