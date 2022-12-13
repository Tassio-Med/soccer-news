import { NextFunction, Request, Response } from 'express';
import { decodeToken } from '../utils/token';

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization: token } = req.headers;

    if (!token) return res.status(401).json({ message: 'Token must be a valid token' });

    const userId = decodeToken(token as string);

    req.body.user = userId;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
