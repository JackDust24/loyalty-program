import { Request, Response, NextFunction } from 'express';
import { generateAccessToken, verifyRefreshToken } from '../utils/jwt';
import jwt from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_SECRET!;

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res
      .status(401)
      .json({ error: 'Authorization header missing or malformed' });
    return;
  }

  const token = authHeader.split(' ')[1];

  console.log('CHECK - ', JWT_ACCESS_SECRET);

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as any;
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const handleRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token not found' });
  }

  console.log(refreshToken);

  try {
    const payload = verifyRefreshToken(refreshToken) as any;
    req.user = payload;
    next();
  } catch (err) {
    console.error('Invalid refresh token:', err);
    // res.clearCookie('refreshToken', {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'strict',
    // });
    res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};
