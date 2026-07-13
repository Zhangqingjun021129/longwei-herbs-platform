import { Request, Response } from 'express';

interface Product {
  id: string;
  user_id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  platform_data: Record<string, unknown>;
  status: 'draft' | 'published' | 'offline';
  created_at: string;
  updated_at: string;
}

const memoryProducts: Product[] = [
  { id: '1', user_id: '1', name: '陇渭本草 野生黄芪', category: '黄芪', description: '甘肃特产，野生黄芪', price: 128, stock: 500, image_url: '', platform_data: {}, status: 'published', created_at: '2024-01-10', updated_at: '2024-01-20' },
  { id: '2', user_id: '1', name: '陇渭本草 当归片', category: '当归', description: '特级当归片', price: 98, stock: 300, image_url: '', platform_data: {}, status: 'published', created_at: '2024-01-08', updated_at: '2024-01-19' },
  { id: '3', user_id: '1', name: '陇渭本草 党参', category: '党参', description: '优质党参', price: 78, stock: 400, image_url: '', platform_data: {}, status: 'draft', created_at: '2024-01-05', updated_at: '2024-01-18' },
  { id: '4', user_id: '1', name: '陇渭本草 枸杞', category: '枸杞', description: '宁夏枸杞', price: 58, stock: 600, image_url: '', platform_data: {}, status: 'published', created_at: '2024-01-03', updated_at: '2024-01-20' },
  { id: '5', user_id: '1', name: '陇渭本草 天麻', category: '天麻', description: '云南天麻', price: 168, stock: 200, image_url: '', platform_data: {}, status: 'offline', created_at: '2024-01-01', updated_at: '2024-01-15' },
];

export const getProducts = async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const products = memoryProducts.filter((p) => p.user_id === user.id);
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = memoryProducts.find((p) => p.id === id);
  
  if (!product) {
    return res.status(404).json({ message: '商品不存在' });
  }
  
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const { name, category, description, price, stock, image_url, platform_data, status } = req.body;
  
  const product: Product = {
    id: Date.now().toString(),
    user_id: user.id,
    name,
    category,
    description,
    price,
    stock,
    image_url: image_url || '',
    platform_data: platform_data || {},
    status: (status as Product['status']) || 'draft',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  memoryProducts.push(product);
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, description, price, stock, image_url, platform_data, status } = req.body;
  
  const index = memoryProducts.findIndex((p) => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '更新商品失败' });
  }
  
  memoryProducts[index] = {
    ...memoryProducts[index],
    name,
    category,
    description,
    price,
    stock,
    image_url,
    platform_data,
    status: status as Product['status'],
    updated_at: new Date().toISOString(),
  };
  
  res.json(memoryProducts[index]);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const index = memoryProducts.findIndex((p) => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '删除商品失败' });
  }
  
  memoryProducts.splice(index, 1);
  res.status(204).send();
};