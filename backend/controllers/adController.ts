import { Request, Response } from 'express';

interface Ad {
  id: string;
  name: string;
  platform: string;
  type: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  status: string;
  start_date: string;
  end_date: string;
}

const memoryAds: Ad[] = [
  { id: '1', name: 'Ginseng Campaign', platform: 'Taobao', type: 'search', budget: 5000.00, spent: 3200.00, impressions: 50000, clicks: 3000, conversions: 150, status: 'active', start_date: '2024-01-01', end_date: '2024-01-31' },
  { id: '2', name: 'Astragalus Promotion', platform: 'Douyin', type: 'video', budget: 8000.00, spent: 6500.00, impressions: 120000, clicks: 8000, conversions: 280, status: 'active', start_date: '2024-01-05', end_date: '2024-01-25' },
  { id: '3', name: 'Ganoderma Display', platform: 'Xiaohongshu', type: 'feed', budget: 3000.00, spent: 2100.00, impressions: 35000, clicks: 2500, conversions: 90, status: 'paused', start_date: '2024-01-10', end_date: '2024-01-20' },
];

export const getAds = async (req: Request, res: Response) => {
  const { platform, status, type } = req.query;
  
  let filtered = memoryAds;
  
  if (platform) filtered = filtered.filter(a => a.platform === platform);
  if (status) filtered = filtered.filter(a => a.status === status);
  if (type) filtered = filtered.filter(a => a.type === type);
  
  res.json(filtered);
};

export const getAd = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ad = memoryAds.find(a => a.id === id);
  
  if (!ad) {
    return res.status(404).json({ message: 'Ad not found' });
  }
  
  res.json(ad);
};

export const createAd = async (req: Request, res: Response) => {
  const { name, platform, type, budget, start_date, end_date } = req.body;
  
  const ad: Ad = {
    id: Date.now().toString(),
    name,
    platform,
    type,
    budget,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    status: 'active',
    start_date,
    end_date,
  };
  
  memoryAds.push(ad);
  res.status(201).json(ad);
};

export const updateAd = async (req: Request, res: Response) => {
  const { id } = req.params;
  const index = memoryAds.findIndex(a => a.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Ad not found' });
  }
  
  memoryAds[index] = { ...memoryAds[index], ...req.body };
  res.json(memoryAds[index]);
};

export const deleteAd = async (req: Request, res: Response) => {
  const { id } = req.params;
  const index = memoryAds.findIndex(a => a.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Ad not found' });
  }
  
  memoryAds.splice(index, 1);
  res.status(204).send();
};