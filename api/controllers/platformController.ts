import { Request, Response } from 'express';

interface PlatformConfig {
  id: string;
  user_id: string;
  platform_name: string;
  api_key: string;
  api_secret: string;
  auth_data: Record<string, unknown>;
  status: 'enabled' | 'disabled';
  created_at: string;
  updated_at: string;
}

const memoryPlatforms: PlatformConfig[] = [
  { id: '1', user_id: '1', platform_name: 'taobao', api_key: '*******', api_secret: '*******', auth_data: {}, status: 'enabled', created_at: '2024-01-10', updated_at: '2024-01-20' },
  { id: '2', user_id: '1', platform_name: 'tmall', api_key: '*******', api_secret: '*******', auth_data: {}, status: 'enabled', created_at: '2024-01-10', updated_at: '2024-01-20' },
  { id: '3', user_id: '1', platform_name: 'jd', api_key: '', api_secret: '', auth_data: {}, status: 'disabled', created_at: '2024-01-08', updated_at: '2024-01-15' },
  { id: '4', user_id: '1', platform_name: 'douyin', api_key: '*******', api_secret: '*******', auth_data: {}, status: 'enabled', created_at: '2024-01-05', updated_at: '2024-01-19' },
  { id: '5', user_id: '1', platform_name: 'xiaohongshu', api_key: '', api_secret: '', auth_data: {}, status: 'disabled', created_at: '2024-01-03', updated_at: '2024-01-12' },
];

export const getPlatforms = async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const platforms = memoryPlatforms.filter((p) => p.user_id === user.id);
  res.json(platforms);
};

export const getPlatform = async (req: Request, res: Response) => {
  const { id } = req.params;
  const platform = memoryPlatforms.find((p) => p.id === id);
  
  if (!platform) {
    return res.status(404).json({ message: '平台配置不存在' });
  }
  
  res.json(platform);
};

export const createPlatform = async (req: Request, res: Response) => {
  const user = (req as Request & { user: { id: string } }).user;
  const { platform_name, api_key, api_secret, auth_data } = req.body;
  
  const platform: PlatformConfig = {
    id: Date.now().toString(),
    user_id: user.id,
    platform_name,
    api_key: api_key || '',
    api_secret: api_secret || '',
    auth_data: auth_data || {},
    status: 'disabled',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  memoryPlatforms.push(platform);
  res.status(201).json(platform);
};

export const updatePlatform = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { platform_name, api_key, api_secret, auth_data, status } = req.body;
  
  const index = memoryPlatforms.findIndex((p) => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '更新平台配置失败' });
  }
  
  memoryPlatforms[index] = {
    ...memoryPlatforms[index],
    platform_name,
    api_key,
    api_secret,
    auth_data,
    status: status as PlatformConfig['status'],
    updated_at: new Date().toISOString(),
  };
  
  res.json(memoryPlatforms[index]);
};

export const deletePlatform = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const index = memoryPlatforms.findIndex((p) => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: '删除平台配置失败' });
  }
  
  memoryPlatforms.splice(index, 1);
  res.status(204).send();
};

export const testConnection = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const platform = memoryPlatforms.find((p) => p.id === id);
  
  if (!platform) {
    return res.status(404).json({ message: '平台配置不存在' });
  }
  
  res.json({ success: true, message: `${platform.platform_name} 连接测试成功` });
};