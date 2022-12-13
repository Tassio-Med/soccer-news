import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret' as string;

export function generateToken(userId: number) {
  const token = jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '3d' },
  );

  return token;
}

export function decodeToken(token: string) {
  const data = jwt.verify(token as string, JWT_SECRET) as jwt.JwtPayload;

  return data.userId;
}
