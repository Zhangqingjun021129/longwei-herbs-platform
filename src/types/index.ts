export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'operator' | 'analyst';
  created_at: string;
  updated_at: string;
}

export interface Product {
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

export interface Competitor {
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

export interface CompetitorData {
  id: string;
  competitor_id: string;
  price: number;
  sales_volume: number;
  review_count: number;
  rating: number;
  recorded_at: string;
}

export interface AdPlan {
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

export interface AdPerformance {
  id: string;
  ad_plan_id: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  recorded_at: string;
}

export interface SalesData {
  id: string;
  product_id: string;
  quantity: number;
  revenue: number;
  platform: string;
  sale_date: string;
}

export interface PlatformConfig {
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

export interface DashboardStats {
  total_sales: number;
  total_orders: number;
  conversion_rate: number;
  total_traffic: number;
  active_ads: number;
  monitored_competitors: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill?: boolean;
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'manager' | 'operator' | 'analyst';
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

export type PlatformType = 'taobao' | 'tmall' | 'xiaohongshu' | 'douyin' | 'jd';

export const PLATFORM_NAMES: Record<PlatformType, string> = {
  taobao: '淘宝',
  tmall: '天猫',
  xiaohongshu: '小红书',
  douyin: '抖音',
  jd: '京东',
};

export const ROLE_NAMES: Record<User['role'], string> = {
  admin: '超级管理员',
  manager: '运营主管',
  operator: '运营专员',
  analyst: '数据分析师',
};