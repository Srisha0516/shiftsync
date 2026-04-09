import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/errorHandler';
import { verifyToken, requireManager } from '../middleware/auth';
import { applyLeave, approveLeave } from '../controllers/leave.controller';

const router = Router();

router.use(verifyToken);

router.post(
  '/',
  [
    body('start_date').isDate(),
    body('end_date').isDate(),
    body('reason').notEmpty()
  ],
  validateRequest,
  applyLeave
);

router.post('/:leave_id/approve', requireManager, approveLeave);

export default router;
