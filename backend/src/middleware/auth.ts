import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    businessId: string;
  };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret) as any;
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      businessId: decoded.businessId
    };
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token.' });
  }
};

export const requireManager = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'manager') {
    res.status(403).json({ error: 'Manager access required.' });
    return;
  }
  next();
};
