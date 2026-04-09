import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/errorHandler';
import { registerManager, login, inviteEmployee, employeeSignup, refreshTokenEndpoint } from '../controllers/auth.controller';
import { verifyToken, requireManager } from '../middleware/auth';

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('full_name').notEmpty(),
    body('business_name').notEmpty()
  ],
  validateRequest,
  registerManager
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validateRequest,
  login
);

router.post(
  '/invite',
  verifyToken,
  requireManager,
  [body('email').isEmail()],
  validateRequest,
  inviteEmployee
);

router.post(
  '/signup',
  [
    body('token').notEmpty(),
    body('password').isLength({ min: 6 }),
    body('full_name').notEmpty()
  ],
  validateRequest,
  employeeSignup
);

router.post('/refresh', [body('token').notEmpty()], validateRequest, refreshTokenEndpoint);

export default router;
