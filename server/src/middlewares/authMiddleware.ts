import { Request, Response, NextFunction } from 'express';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization'];
  if (token && token === 'Bearer faketoken_user1') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
