import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export default async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;

  const data = jwt.verify(token as string, JWT_SECRET) as jwt.JwtPayload;

  req.body.user = data.userId;

  next();
}
