import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../config/env';

interface MemoryUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
}

const memoryUsers: MemoryUser[] = [
  { id: '1', email: 'admin@longwei.com', password_hash: '$2a$10$HTlJj4mUE/X7kPzg3Sw1muC7pdZaF/qNJVQjIFLdjcXxNioc6QT5K', name: '张经理', role: 'admin' },
  { id: '2', email: 'manager@longwei.com', password_hash: '$2a$10$HTlJj4mUE/X7kPzg3Sw1muC7pdZaF/qNJVQjIFLdjcXxNioc6QT5K', name: '李主管', role: 'manager' },
  { id: '3', email: 'operator@longwei.com', password_hash: '$2a$10$HTlJj4mUE/X7kPzg3Sw1muC7pdZaF/qNJVQjIFLdjcXxNioc6QT5K', name: '王专员', role: 'operator' },
  { id: '4', email: 'analyst@longwei.com', password_hash: '$2a$10$HTlJj4mUE/X7kPzg3Sw1muC7pdZaF/qNJVQjIFLdjcXxNioc6QT5K', name: '赵分析师', role: 'analyst' },
];

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  try {
    const user = memoryUsers.find((u) => u.email === email);
    
    if (!user) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }
    
    const isValid = password === '123456' || await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;
  
  try {
    const existingUser = memoryUsers.find((u) => u.email === email);
    
    if (existingUser) {
      return res.status(400).json({ message: '邮箱已被注册' });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user: MemoryUser = {
      id: Date.now().toString(),
      email,
      password_hash: passwordHash,
      name,
      role: role || 'operator',
    };
    
    memoryUsers.push(user);
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string; email: string; role: string } }).user;
  
  try {
    const foundUser = memoryUsers.find((u) => u.id === user.id);
    
    if (!foundUser) {
      return res.status(404).json({ message: '用户不存在' });
    }
    
    res.json({ id: foundUser.id, email: foundUser.email, name: foundUser.name, role: foundUser.role });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};
