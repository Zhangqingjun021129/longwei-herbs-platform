import { useState } from 'react';
import { Plus, Play, Pause, Trash2, BarChart3, Target, DollarSign } from 'lucide-react';
import { BaseTable } from '@/components/BaseTable';
import { LineChartComponent } from '@/components/LineChart';
import { AdPlan } from '@/types';
import { PLATFORM_NAMES } from '@/types';

const mockAdPlans: AdPlan[] = [
  { id: '1', user_id: '1', name: '黄芪新品推广', platform: 'taobao', budget: 10000, spent: 6850, status: 'active', start_time: '2024-01-15', end_time: '2024-01-25', targeting: {}, created_at: '2024-01-14', updated_at: '2024-01-20' },
  { id: '2', user_id: '1', name: '当归促销活动', platform: 'douyin', budget: 8000, spent: 8000, status: 'completed', start_time: '2024-01-10', end_time: '2024-01-18', targeting: {}, created_at: '2024-01-09', updated_at: '2024-01-18' },
  { id: '3', user_id: '1', name: '枸杞品牌曝光', platform: 'xiaohongshu', budget: 15000, spent: 3200, status: 'active', start_time: '2024-01-18', end_time: '2024-02-01', targeting: {}, created_at: '2024-01-17', updated_at: '2024-01-20' },
  { id: '4', user_id: '1', name: '党参精准投放', platform: 'jd', budget: 5000, spent: 0, status: 'pending', start_time: '2024-01-22', end_time: '2024-01-30', targeting: {}, created_at: '2024-01-20', updated_at: '2024-01-20' },
  { id: '5', user_id: '1', name: '天麻预售推广', platform: 'tmall', budget: 12000, spent: 4500, status: 'paused', start_time: '2024-01-12', end_time: '2024-01-22', targeting: {}, created_at: '2024-01-11', updated_at: '2024-01-19' },
];

const generateAdPerformanceData = () => {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  return days.map((day) => ({
    name: day,
    曝光量: Math.floor(Math.random() * 50000) + 20000,
    点击量: Math.floor(Math.random() * 5000) + 1000,
  }));
};

export const AdManagement = () => {
  const [adPlans, setAdPlans] = useState(mockAdPlans);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAdPlan, setNewAdPlan] = useState({ name: '', platform: '', budget: 0, start_time: '', end_time: '' });

  const handleAdd = () => {
    const adPlan: AdPlan = {
      id: Date.now().toString(),
      user_id: '1',
      ...newAdPlan,
      spent: 0,
      status: 'pending',
      targeting: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setAdPlans([...adPlans, adPlan]);
    setShowAddModal(false);
    setNewAdPlan({ name: '', platform: '', budget: 0, start_time: '', end_time: '' });
  };

  const handleDelete = (id: string) => {
    setAdPlans(adPlans.filter((a) => a.id !== id));
  };

  const handleStatusChange = (id: string, status: AdPlan['status']) => {
    setAdPlans(adPlans.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const formatStatus = (status: AdPlan['status']) => {
    switch (status) {
      case 'active':
        return <span className="badge-success">投放中</span>;
      case 'pending':
        return <span className="badge-info">待启动</span>;
      case 'paused':
        return <span className="badge-warning">已暂停</span>;
      case 'completed':
        return <span className="badge-danger">已完成</span>;
    }
  };

  const formatBudget = (budget: number, spent: number) => {
    const percentage = (spent / budget) * 100;
    return (
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>¥{spent.toLocaleString()}</span>
          <span>¥{budget.toLocaleString()}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              percentage > 90 ? 'bg-danger' : percentage > 70 ? 'bg-warning' : 'bg-primary'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">投流管理</h1>
          <p className="text-gray-500 mt-1">创建和管理广告投放计划</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          创建投放计划
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-dark">{adPlans.length}</p>
            <p className="text-sm text-gray-500">投放计划</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
            <Play className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-dark">{adPlans.filter((a) => a.status === 'active').length}</p>
            <p className="text-sm text-gray-500">进行中</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-gold" />
          </div>
          <div>
            <p className="text-2xl font-bold text-dark">¥{adPlans.reduce((sum, a) => sum + a.spent, 0).toLocaleString()}</p>
            <p className="text-sm text-gray-500">总消耗</p>
          </div>
        </div>
      </div>

      <LineChartComponent
        title="投放效果趋势"
        data={generateAdPerformanceData()}
        dataKey="曝光量"
        secondaryDataKey="点击量"
      />

      <BaseTable
        columns={[
          { key: 'name', label: '计划名称' },
          { key: 'platform', label: '投放平台', format: (v) => PLATFORM_NAMES[v as keyof typeof PLATFORM_NAMES] },
          { key: 'budget', label: '预算', format: (_, item) => formatBudget(item.budget, item.spent) },
          { key: 'status', label: '状态', format: (v) => formatStatus(v as AdPlan['status']) },
          { key: 'start_time', label: '开始时间', format: (v) => new Date(v as string).toLocaleDateString() },
          { key: 'end_time', label: '结束时间', format: (v) => new Date(v as string).toLocaleDateString() },
        ]}
        data={adPlans}
        searchable
        searchKey="name"
        onAdd={() => setShowAddModal(true)}
        actions={(item) => (
          <>
            <button className="p-2 text-info hover:bg-blue-50 rounded-lg transition-colors">
              <BarChart3 className="w-4 h-4" />
            </button>
            {item.status === 'active' ? (
              <button onClick={() => handleStatusChange(item.id, 'paused')} className="p-2 text-warning hover:bg-yellow-50 rounded-lg transition-colors">
                <Pause className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={() => handleStatusChange(item.id, 'active')} className="p-2 text-success hover:bg-green-50 rounded-lg transition-colors">
                <Play className="w-4 h-4" />
              </button>
            )}
            <button onClick={() => handleDelete(item.id)} className="p-2 text-danger hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      />

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg animate-slide-up">
            <h2 className="text-xl font-bold text-dark mb-4">创建投放计划</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">计划名称</label>
                <input
                  type="text"
                  value={newAdPlan.name}
                  onChange={(e) => setNewAdPlan({ ...newAdPlan, name: e.target.value })}
                  className="input-field"
                  placeholder="请输入计划名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">投放平台</label>
                <select
                  value={newAdPlan.platform}
                  onChange={(e) => setNewAdPlan({ ...newAdPlan, platform: e.target.value })}
                  className="input-field"
                >
                  <option value="">请选择平台</option>
                  {Object.entries(PLATFORM_NAMES).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">预算金额</label>
                <input
                  type="number"
                  value={newAdPlan.budget}
                  onChange={(e) => setNewAdPlan({ ...newAdPlan, budget: Number(e.target.value) })}
                  className="input-field"
                  placeholder="请输入预算金额"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">开始时间</label>
                  <input
                    type="date"
                    value={newAdPlan.start_time}
                    onChange={(e) => setNewAdPlan({ ...newAdPlan, start_time: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">结束时间</label>
                  <input
                    type="date"
                    value={newAdPlan.end_time}
                    onChange={(e) => setNewAdPlan({ ...newAdPlan, end_time: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="btn-secondary">取消</button>
              <button onClick={handleAdd} className="btn-primary">创建</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};