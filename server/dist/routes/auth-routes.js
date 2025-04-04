import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log('username', username, password);
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    console.log('token', token);
    return res.json({ token });
};
const router = Router();
router.post('/login', login);
export default router;
