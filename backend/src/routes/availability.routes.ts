import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/errorHandler';
import { verifyToken, requireManager } from '../middleware/auth';
import { setAvailability, getTeamAvailability } from '../controllers/availability.controller';

const router = Router();

router.use(verifyToken);

router.post(
  '/',
  [
    body('day_of_week').isInt({ min: 0, max: 6 }),
    body('start_time').notEmpty(),
    body('end_time').notEmpty()
  ],
  validateRequest,
  setAvailability
);

router.get('/team', requireManager, getTeamAvailability);

export default router;
