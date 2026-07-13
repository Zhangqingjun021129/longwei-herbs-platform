import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

interface MemoryUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const memoryUsers: MemoryUser[] = [
  { id: '1', email: 'admin@longwei.com', password_hash: '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', name: '张经理', role: 'admin', created_at: '2024-01-01', updated_at: '2024-01-20' },
  { id: '2', email: 'manager@longwei.com', password_hash: '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', name: '李主管', role: 'manager', created_at: '2024-01-05', updated_at: '2024-01-19' },
  { id: '3', email: 'operator@longwei.com', password_hash: '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', name: '王专员', role: 'operator', created_at: '2024-01-08', updated_at: '2024-01-18' },
  { id: '4', email: 'analyst@longwei.com', password_hash: '$2a$10$N9qo8uLOickgx2ZMRZoMye.IjzqAKL9xL5jvMFVdNJHvGCgTq/VEq', name: '赵分析师', role: 'analyst', created_at: '2024-01-10', updated_at: '2024-01-17' },
];

export const getUsers = async (req: Request, res: Response) => {
  const users = memoryUsers.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    created_at: u.created_at,
    updated_at: u.updated_at,
  }));
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const user = memoryUsers.find((u) => u.id === id);
  
  if (!user) {
    return res.status(404).json({ message: '用户不存在' });
  }
  
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  });
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;
  
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  memoryUsers.push(user);
  
  res.status(201).json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name, role, password } = req.body;
  
  const index = memoryUsers.findIndex((u) => u.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '更新用户失败' });
  }
  
  const updateData: Partial<MemoryUser> = {
    email,
    name,
    role,
    updated_at: new Date().toISOString(),
  };
  
  if (password) {
    updateData.password_hash = await bcrypt.hash(password, 10);
  }
  
  memoryUsers[index] = { ...memoryUsers[index], ...updateData };
  
  res.json({
    id: memoryUsers[index].id,
    email: memoryUsers[index].email,
    name: memoryUsers[index].name,
    role: memoryUsers[index].role,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const index = memoryUsers.findIndex((u) => u.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '删除用户失败' });
  }
  
  memoryUsers.splice(index, 1);
  res.status(204).send();
};