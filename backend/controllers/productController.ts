import { Request, Response } from 'express';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  cost_price: number;
  stock: number;
  category: string;
  platform: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const memoryProducts: Product[] = [
  { id: '1', name: 'Ginseng Extract', sku: 'LW-GS-001', price: 198.00, cost_price: 85.00, stock: 500, category: 'Herbs', platform: 'Taobao', status: 'active', created_at: '2024-01-01', updated_at: '2024-01-20' },
  { id: '2', name: 'Astragalus Root', sku: 'LW-AS-002', price: 68.00, cost_price: 25.00, stock: 1000, category: 'Herbs', platform: 'Tmall', status: 'active', created_at: '2024-01-02', updated_at: '2024-01-19' },
  { id: '3', name: 'Ganoderma Lucidum', sku: 'LW-GL-003', price: 298.00, cost_price: 120.00, stock: 300, category: 'Mushroom', platform: 'Xiaohongshu', status: 'active', created_at: '2024-01-03', updated_at: '2024-01-18' },
  { id: '4', name: 'Lotus Seed', sku: 'LW-LS-004', price: 45.00, cost_price: 18.00, stock: 800, category: 'Seeds', platform: 'Douyin', status: 'active', created_at: '2024-01-04', updated_at: '2024-01-17' },
  { id: '5', name: 'Wolfberry', sku: 'LW-WB-005', price: 35.00, cost_price: 12.00, stock: 1200, category: 'Seeds', platform: 'Jingdong', status: 'active', created_at: '2024-01-05', updated_at: '2024-01-16' },
];

export const getProducts = async (req: Request, res: Response) => {
  const { platform, category, status } = req.query;
  
  let filtered = memoryProducts;
  
  if (platform) filtered = filtered.filter(p => p.platform === platform);
  if (category) filtered = filtered.filter(p => p.category === category);
  if (status) filtered = filtered.filter(p => p.status === status);
  
  res.json(filtered);
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = memoryProducts.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, sku, price, cost_price, stock, category, platform } = req.body;
  
  const product: Product = {
    id: Date.now().toString(),
    name,
    sku,
    price,
    cost_price,
    stock,
    category,
    platform,
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  memoryProducts.push(product);
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const index = memoryProducts.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  memoryProducts[index] = { ...memoryProducts[index], ...req.body, updated_at: new Date().toISOString() };
  res.json(memoryProducts[index]);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const index = memoryProducts.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  memoryProducts.splice(index, 1);
  res.status(204).send();
};