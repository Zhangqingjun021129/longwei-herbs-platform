import { useState, useEffect } from 'react';
import { TrendingUp, ShoppingBag, Users, Target, AlertCircle, Package } from 'lucide-react';
import { DataCard } from '@/components/DataCard';
import { LineChartComponent } from '@/components/LineChart';
import { BarChartComponent } from '@/components/BarChart';
import { PieChartComponent } from '@/components/PieChart';
import { QuickActions } from '@/components/QuickActions';
import { DashboardStats } from '@/types';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const generateMockSalesData = () => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
  return months.map((month) => ({
    name: month,
    销售额: Math.floor(Math.random() * 50000) + 30000,
    订单量: Math.floor(Math.random() * 500) + 200,
  }));
};

const generateMockTrafficData = () => {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  return days.map((day) => ({
    name: day,
    访客数: Math.floor(Math.random() * 2000) + 1000,
  }));
};

const generateMockPlatformData = () => {
  return [
    { name: '淘宝', value: 35000 },
    { name: '天猫', value: 28000 },
    { name: '京东', value: 18000 },
    { name: '抖音', value: 22000 },
    { name: '小红书', value: 12000 },
  ];
};

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [stats, setStats] = useState<DashboardStats>({
    total_sales: 115000,
    total_orders: 1256,
    conversion_rate: 3.8,
    total_traffic: 32850,
    active_ads: 8,
    monitored_competitors: 24,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        total_sales: prev.total_sales + Math.floor(Math.random() * 1000),
        total_orders: prev.total_orders + Math.floor(Math.random() * 10),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAction = (action: string) => {
    switch (action) {
      case 'add-product':
        onNavigate('products');
        break;
      case 'competitor-analysis':
        onNavigate('competitor');
        break;
      case 'create-ad':
        onNavigate('ads');
        break;
      case 'export-report':
        onNavigate('analytics');
        break;
      case 'sync-data':
        break;
    }
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">欢迎回来</h1>
          <p className="text-gray-500 mt-1">这是您今天的业务概览</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-lg">
          <AlertCircle className="w-5 h-5 text-gold" />
          <span className="text-sm font-medium text-primary-dark">今日有 3 条待处理任务</span>
        </div>
      </div>

      <QuickActions onAction={handleAction} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <DataCard
          title="总销售额"
          value={`¥${stats.total_sales.toLocaleString()}`}
          icon={TrendingUp}
          trend={{ value: '+12.5%', isUp: true }}
          color="success"
        />
        <DataCard
          title="订单量"
          value={stats.total_orders}
          icon={ShoppingBag}
          trend={{ value: '+8.3%', isUp: true }}
          color="primary"
        />
        <DataCard
          title="转化率"
          value={`${stats.conversion_rate}%`}
          icon={Target}
          trend={{ value: '+0.5%', isUp: true }}
          color="info"
        />
        <DataCard
          title="总流量"
          value={stats.total_traffic.toLocaleString()}
          icon={Users}
          trend={{ value: '+15.2%', isUp: true }}
          color="warning"
        />
        <DataCard
          title="活跃投放"
          value={stats.active_ads}
          icon={Target}
          color="primary"
        />
        <DataCard
          title="竞品监控"
          value={stats.monitored_competitors}
          icon={Package}
          color="danger"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent
          title="销售趋势"
          data={generateMockSalesData()}
          dataKey="销售额"
          secondaryDataKey="订单量"
        />
        <BarChartComponent
          title="本周流量"
          data={generateMockTrafficData()}
          dataKey="访客数"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PieChartComponent
          title="平台销售分布"
          data={generateMockPlatformData()}
        />
        <div className="card lg:col-span-2">
          <h3 className="text-lg font-semibold text-dark mb-4">实时监控</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['淘宝', '天猫', '京东', '抖音'].map((platform) => (
              <div key={platform} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-dark">{platform}</span>
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                </div>
                <p className="text-2xl font-bold text-primary">在线</p>
                <p className="text-xs text-gray-500 mt-1">正常运行</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};