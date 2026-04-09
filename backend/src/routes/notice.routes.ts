import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/errorHandler';
import { verifyToken, requireManager } from '../middleware/auth';
import { createNotice, getNotices } from '../controllers/notice.controller';

const router = Router();

router.use(verifyToken);

router.get('/', getNotices);
router.post(
  '/',
  requireManager,
  [body('content').notEmpty()],
  validateRequest,
  createNotice
);

export default router;
