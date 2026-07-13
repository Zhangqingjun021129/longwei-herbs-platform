import { useState } from 'react';
import { Download, Calendar, BarChart3, PieChart, TrendingUp, Users } from 'lucide-react';
import { LineChartComponent } from '@/components/LineChart';
import { BarChartComponent } from '@/components/BarChart';
import { PieChartComponent } from '@/components/PieChart';
import { DataCard } from '@/components/DataCard';

const generateSalesData = () => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
  return months.map((month) => ({
    name: month,
    销售额: Math.floor(Math.random() * 50000) + 30000,
  }));
};

const generateTrafficData = () => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
  return months.map((month) => ({
    name: month,
    访客数: Math.floor(Math.random() * 5000) + 3000,
    浏览量: Math.floor(Math.random() * 15000) + 8000,
  }));
};

const generateConversionData = () => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
  return months.map((month) => ({
    name: month,
    转化率: (Math.random() * 2 + 2).toFixed(1),
    客单价: Math.floor(Math.random() * 100) + 80,
  }));
};

const generatePlatformData = () => [
  { name: '淘宝', value: 35000 },
  { name: '天猫', value: 28000 },
  { name: '京东', value: 18000 },
  { name: '抖音', value: 22000 },
  { name: '小红书', value: 12000 },
];

const generateCategoryData = () => [
  { name: '黄芪', value: 25000 },
  { name: '当归', value: 20000 },
  { name: '党参', value: 15000 },
  { name: '枸杞', value: 18000 },
  { name: '其他', value: 10000 },
];

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">数据分析</h1>
          <p className="text-gray-500 mt-1">多维度数据报表，助力决策</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === 'week' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              本周
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === 'month' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              本月
            </button>
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === 'quarter' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              本季度
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                timeRange === 'year' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              本年
            </button>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            导出报表
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DataCard
          title="总销售额"
          value="¥115,000"
          icon={TrendingUp}
          trend={{ value: '+12.5%', isUp: true }}
          color="success"
        />
        <DataCard
          title="总访客数"
          value="32,850"
          icon={Users}
          trend={{ value: '+8.3%', isUp: true }}
          color="primary"
        />
        <DataCard
          title="转化率"
          value="3.8%"
          icon={BarChart3}
          trend={{ value: '+0.5%', isUp: true }}
          color="info"
        />
        <DataCard
          title="客单价"
          value="¥128"
          icon={PieChart}
          trend={{ value: '+5.2%', isUp: true }}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent
          title="销售趋势"
          data={generateSalesData()}
          dataKey="销售额"
        />
        <LineChartComponent
          title="流量趋势"
          data={generateTrafficData()}
          dataKey="访客数"
          secondaryDataKey="浏览量"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PieChartComponent
          title="平台销售分布"
          data={generatePlatformData()}
        />
        <PieChartComponent
          title="品类销售分布"
          data={generateCategoryData()}
        />
        <BarChartComponent
          title="转化数据"
          data={generateConversionData()}
          dataKey="转化率"
        />
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-dark mb-4">数据摘要</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">销售增长</p>
            <p className="text-2xl font-bold text-success">+12.5%</p>
            <p className="text-xs text-gray-400">较上月</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">流量增长</p>
            <p className="text-2xl font-bold text-primary">+8.3%</p>
            <p className="text-xs text-gray-400">较上月</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">转化提升</p>
            <p className="text-2xl font-bold text-info">+0.5%</p>
            <p className="text-xs text-gray-400">较上月</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">客单价增长</p>
            <p className="text-2xl font-bold text-warning">+5.2%</p>
            <p className="text-xs text-gray-400">较上月</p>
          </div>
        </div>
      </div>
    </div>
  );
};