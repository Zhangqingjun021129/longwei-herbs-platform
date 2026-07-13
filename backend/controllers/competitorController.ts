import { Request, Response } from 'express';

interface Competitor {
  id: string;
  name: string;
  platform: string;
  category: string;
  product_count: number;
  avg_price: number;
  followers: number;
  monthly_sales: number;
  status: string;
  created_at: string;
}

const memoryCompetitors: Competitor[] = [
  { id: '1', name: 'HerbKing', platform: 'Taobao', category: 'Herbs', product_count: 150, avg_price: 120.00, followers: 50000, monthly_sales: 12000, status: 'active', created_at: '2024-01-01' },
  { id: '2', name: 'NatureWell', platform: 'Tmall', category: 'Herbs', product_count: 200, avg_price: 150.00, followers: 80000, monthly_sales: 18000, status: 'active', created_at: '2024-01-02' },
  { id: '3', name: 'GreenLife', platform: 'Xiaohongshu', category: 'Mushroom', product_count: 80, avg_price: 200.00, followers: 30000, monthly_sales: 8000, status: 'active', created_at: '2024-01-03' },
  { id: '4', name: 'HealthPlus', platform: 'Douyin', category: 'Seeds', product_count: 120, avg_price: 60.00, followers: 60000, monthly_sales: 15000, status: 'active', created_at: '2024-01-04' },
];

export const getCompetitors = async (req: Request, res: Response) => {
  const { platform, category } = req.query;
  
  let filtered = memoryCompetitors;
  
  if (platform) filtered = filtered.filter(c => c.platform === platform);
  if (category) filtered = filtered.filter(c => c.category === category);
  
  res.json(filtered);
};

export const getCompetitor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const competitor = memoryCompetitors.find(c => c.id === id);
  
  if (!competitor) {
    return res.status(404).json({ message: 'Competitor not found' });
  }
  
  res.json(competitor);
};

export const createCompetitor = async (req: Request, res: Response) => {
  const { name, platform, category, product_count, avg_price, followers, monthly_sales } = req.body;
  
  const competitor: Competitor = {
    id: Date.now().toString(),
    name,
    platform,
    category,
    product_count,
    avg_price,
    followers,
    monthly_sales,
    status: 'active',
    created_at: new Date().toISOString(),
  };
  
  memoryCompetitors.push(competitor);
  res.status(201).json(competitor);
};

export const updateCompetitor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const index = memoryCompetitors.findIndex(c => c.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Competitor not found' });
  }
  
  memoryCompetitors[index] = { ...memoryCompetitors[index], ...req.body };
  res.json(memoryCompetitors[index]);
};

export const deleteCompetitor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const index = memoryCompetitors.findIndex(c => c.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Competitor not found' });
  }
  
  memoryCompetitors.splice(index, 1);
  res.status(204).send();
};