import { useState } from 'react';
import { Plus, Edit, Trash2, Upload, Download, Package, Check, X } from 'lucide-react';
import { BaseTable } from '@/components/BaseTable';
import { Product } from '@/types';

const mockProducts: Product[] = [
  { id: '1', user_id: '1', name: '陇渭本草 野生黄芪', category: '黄芪', description: '甘肃特产，野生黄芪', price: 128, stock: 500, image_url: '', platform_data: {}, status: 'published', created_at: '2024-01-10', updated_at: '2024-01-20' },
  { id: '2', user_id: '1', name: '陇渭本草 当归片', category: '当归', description: '特级当归片', price: 98, stock: 300, image_url: '', platform_data: {}, status: 'published', created_at: '2024-01-08', updated_at: '2024-01-19' },
  { id: '3', user_id: '1', name: '陇渭本草 党参', category: '党参', description: '优质党参', price: 78, stock: 400, image_url: '', platform_data: {}, status: 'draft', created_at: '2024-01-05', updated_at: '2024-01-18' },
  { id: '4', user_id: '1', name: '陇渭本草 枸杞', category: '枸杞', description: '宁夏枸杞', price: 58, stock: 600, image_url: '', platform_data: {}, status: 'published', created_at: '2024-01-03', updated_at: '2024-01-20' },
  { id: '5', user_id: '1', name: '陇渭本草 天麻', category: '天麻', description: '云南天麻', price: 168, stock: 200, image_url: '', platform_data: {}, status: 'offline', created_at: '2024-01-01', updated_at: '2024-01-15' },
];

export const ProductManagement = () => {
  const [products, setProducts] = useState(mockProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', description: '', price: 0, stock: 0 });

  const handleAdd = () => {
    const product: Product = {
      id: Date.now().toString(),
      user_id: '1',
      ...newProduct,
      image_url: '',
      platform_data: {},
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setProducts([...products, product]);
    setShowAddModal(false);
    setNewProduct({ name: '', category: '', description: '', price: 0, stock: 0 });
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleStatusChange = (id: string, status: Product['status']) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const formatStatus = (status: Product['status']) => {
    switch (status) {
      case 'published':
        return <span className="badge-success">已上架</span>;
      case 'draft':
        return <span className="badge-warning">草稿</span>;
      case 'offline':
        return <span className="badge-danger">已下架</span>;
    }
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">商品管理</h1>
          <p className="text-gray-500 mt-1">管理商品库，配置上架规则</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Upload className="w-4 h-4" />
            批量导入
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            导出商品
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            添加商品
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-dark">{products.length}</p>
            <p className="text-sm text-gray-500">总商品数</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
            <Check className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-dark">{products.filter((p) => p.status === 'published').length}</p>
            <p className="text-sm text-gray-500">已上架</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
            <X className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold text-dark">{products.filter((p) => p.status === 'offline').length}</p>
            <p className="text-sm text-gray-500">已下架</p>
          </div>
        </div>
      </div>

      <BaseTable
        columns={[
          { key: 'name', label: '商品名称' },
          { key: 'category', label: '分类' },
          { key: 'price', label: '价格', format: (v) => `¥${v}` },
          { key: 'stock', label: '库存', format: (v) => Number(v).toLocaleString() },
          { key: 'status', label: '状态', format: (v) => formatStatus(v as Product['status']) },
          { key: 'updated_at', label: '更新时间', format: (v) => new Date(v as string).toLocaleDateString() },
        ]}
        data={products}
        searchable
        searchKey="name"
        onAdd={() => setShowAddModal(true)}
        actions={(item) => (
          <>
            <button className="p-2 text-info hover:bg-blue-50 rounded-lg transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button onClick={() => handleDelete(item.id)} className="p-2 text-danger hover:bg-red-50 rounded-lg transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <select
              value={item.status}
              onChange={(e) => handleStatusChange(item.id, e.target.value as Product['status'])}
              className="text-sm px-2 py-1 border border-gray-200 rounded-lg"
            >
              <option value="draft">草稿</option>
              <option value="published">上架</option>
              <option value="offline">下架</option>
            </select>
          </>
        )}
      />

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg animate-slide-up">
            <h2 className="text-xl font-bold text-dark mb-4">添加商品</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">商品名称</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="input-field"
                  placeholder="请输入商品名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">分类</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="input-field"
                  placeholder="请输入分类"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">描述</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="input-field"
                  placeholder="请输入商品描述"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">价格</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="input-field"
                    placeholder="请输入价格"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">库存</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="input-field"
                    placeholder="请输入库存"
                  />
                </div>
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