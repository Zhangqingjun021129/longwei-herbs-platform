import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { BaseTable } from '@/components/BaseTable';
import { LineChartComponent } from '@/components/LineChart';
import { BarChartComponent } from '@/components/BarChart';
import { Competitor } from '@/types';
import { PLATFORM_NAMES } from '@/types';

const mockCompetitors: Competitor[] = [
  { id: '1', user_id: '1', name: '云南白药 三七粉', platform: 'taobao', product_url: 'https://taobao.com/item/123', price: 98, sales_volume: 12580, metadata: {}, created_at: '2024-01-15', updated_at: '2024-01-20' },
  { id: '2', user_id: '1', name: '同仁堂 黄芪', platform: 'tmall', product_url: 'https://tmall.com/item/456', price: 158, sales_volume: 8920, metadata: {}, created_at: '2024-01-14', updated_at: '2024-01-20' },
  { id: '3', user_id: '1', name: '福胶 阿胶', platform: 'jd', product_url: 'https://jd.com/item/789', price: 398, sales_volume: 5640, metadata: {}, created_at: '2024-01-13', updated_at: '2024-01-19' },
  { id: '4', user_id: '1', name: '东阿阿胶', platform: 'xiaohongshu', product_url: 'https://xiaohongshu.com/item/321', price: 458, sales_volume: 4230, metadata: {}, created_at: '2024-01-12', updated_at: '2024-01-18' },
  { id: '5', user_id: '1', name: '仲景 六味地黄丸', platform: 'douyin', product_url: 'https://douyin.com/item/654', price: 68, sales_volume: 15680, metadata: {}, created_at: '2024-01-11', updated_at: '2024-01-20' },
];

const generatePriceData = () => {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  return days.map((day) => ({
    name: day,
    云南白药: 98 + Math.floor(Math.random() * 10),
    同仁堂: 158 + Math.floor(Math.random() * 15),
    福胶: 398 + Math.floor(Math.random() * 20),
  }));
};

const generateSalesData = () => {
  return [
    { name: '云南白药', 销量: 12580 },
    { name: '同仁堂', 销量: 8920 },
    { name: '福胶', 销量: 5640 },
    { name: '东阿阿胶', 销量: 4230 },
    { name: '仲景', 销量: 15680 },
  ];
};

export const CompetitorAnalysis = () => {
  const [competitors, setCompetitors] = useState(mockCompetitors);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState({ name: '', platform: '', product_url: '', price: 0 });

  const handleAdd = () => {
    const competitor: Competitor = {
      id: Date.now().toString(),
      user_id: '1',
      ...newCompetitor,
      sales_volume: 0,
      metadata: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setCompetitors([...competitors, competitor]);
    setShowAddModal(false);
    setNewCompetitor({ name: '', platform: '', product_url: '', price: 0 });
  };

  const handleDelete = (id: string) => {
    setCompetitors(competitors.filter((c) => c.id !== id));
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">竞品分析</h1>
          <p className="text-gray-500 mt-1">监控竞品动态，分析市场趋势</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          添加竞品
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartComponent
          title="竞品价格趋势"
          data={generatePriceData()}
          dataKey="云南白药"
          secondaryDataKey="同仁堂"
        />
        <BarChartComponent
          title="竞品销量对比"
          data={generateSalesData()}
          dataKey="销量"
        />
      </div>

      <BaseTable
        columns={[
          { key: 'name', label: '竞品名称' },
          { key: 'platform', label: '平台', format: (v) => PLATFORM_NAMES[v as keyof typeof PLATFORM_NAMES] },
          { key: 'price', label: '价格', format: (v) => `¥${v}` },
          { key: 'sales_volume', label: '销量', format: (v) => Number(v).toLocaleString() },
          { key: 'updated_at', label: '更新时间', format: (v) => new Date(v as string).toLocaleDateString() },
        ]}
        data={competitors}
        searchable
        searchKey="name"
        onAdd={() => setShowAddModal(true)}
        actions={(item) => (
          <>
            <button className="p-2 text-info hover:bg-blue-50 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-warning hover:bg-yellow-50 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button onClick={() => handleDelete(item.id)} className="p-2 text-danger hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      />

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md animate-slide-up">
            <h2 className="text-xl font-bold text-dark mb-4">添加竞品</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">竞品名称</label>
                <input
                  type="text"
                  value={newCompetitor.name}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
                  className="input-field"
                  placeholder="请输入竞品名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">平台</label>
                <select
                  value={newCompetitor.platform}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, platform: e.target.value })}
                  className="input-field"
                >
                  <option value="">请选择平台</option>
                  {Object.entries(PLATFORM_NAMES).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">商品链接</label>
                <input
                  type="text"
                  value={newCompetitor.product_url}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, product_url: e.target.value })}
                  className="input-field"
                  placeholder="请输入商品链接"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">价格</label>
                <input
                  type="number"
                  value={newCompetitor.price}
                  onChange={(e) => setNewCompetitor({ ...newCompetitor, price: Number(e.target.value) })}
                  className="input-field"
                  placeholder="请输入价格"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="btn-secondary">取消</button>
              <button onClick={handleAdd} className="btn-primary">添加</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};