import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

interface MemoryUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
}

const memoryUsers: MemoryUser[] = [
  { id: '1', email: 'admin@longwei.com', password_hash: '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', name: 'Zhang Jingli', role: 'admin' },
  { id: '2', email: 'manager@longwei.com', password_hash: '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', name: 'Li Zhuguan', role: 'manager' },
  { id: '3', email: 'operator@longwei.com', password_hash: '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', name: 'Wang Zhuanyuan', role: 'operator' },
  { id: '4', email: 'analyst@longwei.com', password_hash: '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', name: 'Zhao Fenxishi', role: 'analyst' },
];

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  try {
    const user = memoryUsers.find((u) => u.email === email);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  
  try {
    const existingUser = memoryUsers.find((u) => u.email === email);
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user: MemoryUser = {
      id: Date.now().toString(),
      email,
      password_hash: passwordHash,
      name,
      role: 'operator',
    };
    
    memoryUsers.push(user);
    
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
    
    const user = memoryUsers.find((u) => u.id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};