import { Request, Response } from 'express';

interface AdPlan {
  id: string;
  user_id: string;
  name: string;
  platform: string;
  budget: number;
  spent: number;
  status: 'pending' | 'active' | 'paused' | 'completed';
  start_time: string;
  end_time: string;
  targeting: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

const memoryAdPlans: AdPlan[] = [
  { id: '1', user_id: '1', name: '黄芪新品推广', platform: 'taobao', budget: 10000, spent: 6850, status: 'active', start_time: '2024-01-15', end_time: '2024-01-25', targeting: {}, created_at: '2024-01-14', updated_at: '2024-01-20' },
  { id: '2', user_id: '1', name: '当归促销活动', platform: 'douyin', budget: 8000, spent: 8000, status: 'completed', start_time: '2024-01-10', end_time: '2024-01-18', targeting: {}, created_at: '2024-01-09', updated_at: '2024-01-18' },
  { id: '3', user_id: '1', name: '枸杞品牌曝光', platform: 'xiaohongshu', budget: 15000, spent: 3200, status: 'active', start_time: '2024-01-18', end_time: '2024-02-01', targeting: {}, created_at: '2024-01-17', updated_at: '2024-01-20' },
  { id: '4', user_id: '1', name: '党参精准投放', platform: 'jd', budget: 5000, spent: 0, status: 'pending', start_time: '2024-01-22', end_time: '2024-01-30', targeting: {}, created_at: '2024-01-20', updated_at: '2024-01-20' },
  { id: '5', user_id: '1', name: '天麻预售推广', platform: 'tmall', budget: 12000, spent: 4500, status: 'paused', start_time: '2024-01-12', end_time: '2024-01-22', targeting: {}, created_at: '2024-01-11', updated_at: '2024-01-19' },
];

export const getAdPlans = async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const adPlans = memoryAdPlans.filter((a) => a.user_id === user.id);
  res.json(adPlans);
};

export const getAdPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const adPlan = memoryAdPlans.find((a) => a.id === id);
  
  if (!adPlan) {
    return res.status(404).json({ message: '投放计划不存在' });
  }
  
  res.json(adPlan);
};

export const createAdPlan = async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const { name, platform, budget, start_time, end_time, targeting } = req.body;
  
  const adPlan: AdPlan = {
    id: Date.now().toString(),
    user_id: user.id,
    name,
    platform,
    budget,
    spent: 0,
    status: 'pending',
    start_time,
    end_time,
    targeting: targeting || {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  memoryAdPlans.push(adPlan);
  res.status(201).json(adPlan);
};

export const updateAdPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, platform, budget, start_time, end_time, targeting } = req.body;
  
  const index = memoryAdPlans.findIndex((a) => a.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '更新投放计划失败' });
  }
  
  memoryAdPlans[index] = {
    ...memoryAdPlans[index],
    name,
    platform,
    budget,
    start_time,
    end_time,
    targeting,
    updated_at: new Date().toISOString(),
  };
  
  res.json(memoryAdPlans[index]);
};

export const deleteAdPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const index = memoryAdPlans.findIndex((a) => a.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '删除投放计划失败' });
  }
  
  memoryAdPlans.splice(index, 1);
  res.status(204).send();
};

export const startAdPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const index = memoryAdPlans.findIndex((a) => a.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '启动投放计划失败' });
  }
  
  memoryAdPlans[index].status = 'active';
  memoryAdPlans[index].updated_at = new Date().toISOString();
  
  res.json(memoryAdPlans[index]);
};

export const stopAdPlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const index = memoryAdPlans.findIndex((a) => a.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '停止投放计划失败' });
  }
  
  memoryAdPlans[index].status = 'paused';
  memoryAdPlans[index].updated_at = new Date().toISOString();
  
  res.json(memoryAdPlans[index]);
};

export const getAdAnalytics = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const mockData = [
    { id: '1', ad_plan_id: id, impressions: 52000, clicks: 3850, conversions: 125, revenue: 16250, recorded_at: '2024-01-15' },
    { id: '2', ad_plan_id: id, impressions: 48000, clicks: 3520, conversions: 118, revenue: 15340, recorded_at: '2024-01-16' },
    { id: '3', ad_plan_id: id, impressions: 55000, clicks: 4100, conversions: 132, revenue: 17160, recorded_at: '2024-01-17' },
    { id: '4', ad_plan_id: id, impressions: 51000, clicks: 3780, conversions: 128, revenue: 16640, recorded_at: '2024-01-18' },
    { id: '5', ad_plan_id: id, impressions: 58000, clicks: 4250, conversions: 145, revenue: 18850, recorded_at: '2024-01-19' },
  ];
  
  res.json(mockData);
};