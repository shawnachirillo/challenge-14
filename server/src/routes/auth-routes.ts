import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log('🧾 req.body:', req.body);
console.log('🔑 username:', username, '| password:', password);


  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: 'Authentication failed' });

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) return res.status(401).json({ message: 'Authentication failed' });

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) throw new Error('JWT_SECRET is not defined');

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
  return res.status(500).json({ message: 'An unexpected error occurred.' });
});

export default router;
