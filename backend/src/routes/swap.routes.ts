import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/errorHandler';
import { verifyToken, requireManager } from '../middleware/auth';
import { requestSwap, approveSwap } from '../controllers/swap.controller';

const router = Router();

router.use(verifyToken);

router.post(
  '/',
  [
    body('shift_id').notEmpty(),
    body('target_id').notEmpty()
  ],
  validateRequest,
  requestSwap
);

router.post('/:swap_id/approve', requireManager, approveSwap);

export default router;
