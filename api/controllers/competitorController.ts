import { Request, Response } from 'express';

interface Competitor {
  id: string;
  user_id: string;
  name: string;
  platform: string;
  product_url: string;
  price: number;
  sales_volume: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

const memoryCompetitors: Competitor[] = [
  { id: '1', user_id: '1', name: '云南白药 三七粉', platform: 'taobao', product_url: 'https://taobao.com/item/123', price: 98, sales_volume: 12580, metadata: {}, created_at: '2024-01-15', updated_at: '2024-01-20' },
  { id: '2', user_id: '1', name: '同仁堂 黄芪', platform: 'tmall', product_url: 'https://tmall.com/item/456', price: 158, sales_volume: 8920, metadata: {}, created_at: '2024-01-14', updated_at: '2024-01-20' },
  { id: '3', user_id: '1', name: '福胶 阿胶', platform: 'jd', product_url: 'https://jd.com/item/789', price: 398, sales_volume: 5640, metadata: {}, created_at: '2024-01-13', updated_at: '2024-01-19' },
  { id: '4', user_id: '1', name: '东阿阿胶', platform: 'xiaohongshu', product_url: 'https://xiaohongshu.com/item/321', price: 458, sales_volume: 4230, metadata: {}, created_at: '2024-01-12', updated_at: '2024-01-18' },
  { id: '5', user_id: '1', name: '仲景 六味地黄丸', platform: 'douyin', product_url: 'https://douyin.com/item/654', price: 68, sales_volume: 15680, metadata: {}, created_at: '2024-01-11', updated_at: '2024-01-20' },
];

export const getCompetitors = async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const competitors = memoryCompetitors.filter((c) => c.user_id === user.id);
  res.json(competitors);
};

export const getCompetitor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const competitor = memoryCompetitors.find((c) => c.id === id);
  
  if (!competitor) {
    return res.status(404).json({ message: '竞品不存在' });
  }
  
  res.json(competitor);
};

export const createCompetitor = async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const { name, platform, product_url, price, sales_volume, metadata } = req.body;
  
  const competitor: Competitor = {
    id: Date.now().toString(),
    user_id: user.id,
    name,
    platform,
    product_url,
    price,
    sales_volume: sales_volume || 0,
    metadata: metadata || {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  memoryCompetitors.push(competitor);
  res.status(201).json(competitor);
};

export const updateCompetitor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, platform, product_url, price, sales_volume, metadata } = req.body;
  
  const index = memoryCompetitors.findIndex((c) => c.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '更新竞品失败' });
  }
  
  memoryCompetitors[index] = {
    ...memoryCompetitors[index],
    name,
    platform,
    product_url,
    price,
    sales_volume,
    metadata,
    updated_at: new Date().toISOString(),
  };
  
  res.json(memoryCompetitors[index]);
};

export const deleteCompetitor = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const index = memoryCompetitors.findIndex((c) => c.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '删除竞品失败' });
  }
  
  memoryCompetitors.splice(index, 1);
  res.status(204).send();
};

export const getCompetitorAnalysis = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const mockData = [
    { id: '1', competitor_id: id, price: 98, sales_volume: 12580, review_count: 3240, rating: 4.8, recorded_at: '2024-01-15' },
    { id: '2', competitor_id: id, price: 95, sales_volume: 13200, review_count: 3520, rating: 4.7, recorded_at: '2024-01-16' },
    { id: '3', competitor_id: id, price: 98, sales_volume: 11800, review_count: 3100, rating: 4.8, recorded_at: '2024-01-17' },
    { id: '4', competitor_id: id, price: 102, sales_volume: 10500, review_count: 2850, rating: 4.7, recorded_at: '2024-01-18' },
    { id: '5', competitor_id: id, price: 98, sales_volume: 12100, review_count: 3380, rating: 4.8, recorded_at: '2024-01-19' },
  ];
  
  res.json(mockData);
};