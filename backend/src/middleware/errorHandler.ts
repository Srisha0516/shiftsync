import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    const field = (errors.array()[0] as any).path || (errors.array()[0] as any).param;
    res.status(400).json({ error: `${field}: ${firstError}` });
    return;
  }
  next();
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
};
