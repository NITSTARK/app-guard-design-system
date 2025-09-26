
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'No token provided' } });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Invalid or expired token' } });
    }
    req.userId = user.userId;
    next();
  });
};
