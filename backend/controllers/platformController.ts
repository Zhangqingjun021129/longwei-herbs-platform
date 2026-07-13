import { Request, Response } from 'express';

interface Platform {
  id: string;
  name: string;
  short_name: string;
  type: string;
  status: string;
  api_status: string;
  last_sync: string;
  data_count: number;
}

const memoryPlatforms: Platform[] = [
  { id: '1', name: 'Taobao', short_name: 'taobao', type: 'ecommerce', status: 'connected', api_status: 'active', last_sync: '2024-01-21 10:30:00', data_count: 500 },
  { id: '2', name: 'Tmall', short_name: 'tmall', type: 'ecommerce', status: 'connected', api_status: 'active', last_sync: '2024-01-21 10:25:00', data_count: 300 },
  { id: '3', name: 'Xiaohongshu', short_name: 'xiaohongshu', type: 'social', status: 'connected', api_status: 'active', last_sync: '2024-01-21 10:20:00', data_count: 200 },
  { id: '4', name: 'Douyin', short_name: 'douyin', type: 'social', status: 'connected', api_status: 'active', last_sync: '2024-01-21 10:15:00', data_count: 400 },
  { id: '5', name: 'Jingdong', short_name: 'jingdong', type: 'ecommerce', status: 'connected', api_status: 'active', last_sync: '2024-01-21 10:10:00', data_count: 250 },
];

export const getPlatforms = async (req: Request, res: Response) => {
  res.json(memoryPlatforms);
};

export const getPlatform = async (req: Request, res: Response) => {
  const { id } = req.params;
  const platform = memoryPlatforms.find(p => p.id === id);
  
  if (!platform) {
    return res.status(404).json({ message: 'Platform not found' });
  }
  
  res.json(platform);
};

export const syncPlatform = async (req: Request, res: Response) => {
  const { id } = req.params;
  const platform = memoryPlatforms.find(p => p.id === id);
  
  if (!platform) {
    return res.status(404).json({ message: 'Platform not found' });
  }
  
  platform.last_sync = new Date().toISOString();
  res.json({ message: 'Sync started', platform });
};

export const updatePlatform = async (req: Request, res: Response) => {
  const { id } = req.params;
  const index = memoryPlatforms.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Platform not found' });
  }
  
  memoryPlatforms[index] = { ...memoryPlatforms[index], ...req.body };
  res.json(memoryPlatforms[index]);
};