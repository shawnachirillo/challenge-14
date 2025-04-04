import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.sendStatus(401); // Unauthorized
    return;
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    res.sendStatus(500); // Internal Server Error if secret key is missing
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.sendStatus(403); // Forbidden
      return;
    }

    req.user = user as JwtPayload;
    next();
  });
};
