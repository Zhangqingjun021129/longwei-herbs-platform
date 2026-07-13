import { useState } from 'react';
import { Plus, Edit, Trash2, Mail, User, Shield } from 'lucide-react';
import { BaseTable } from '@/components/BaseTable';
import { User as UserType, ROLE_NAMES } from '@/types';

const mockUsers: UserType[] = [
  { id: '1', email: 'admin@longwei.com', name: '张经理', role: 'admin', created_at: '2024-01-01', updated_at: '2024-01-20' },
  { id: '2', email: 'manager@longwei.com', name: '李主管', role: 'manager', created_at: '2024-01-05', updated_at: '2024-01-19' },
  { id: '3', email: 'operator@longwei.com', name: '王专员', role: 'operator', created_at: '2024-01-08', updated_at: '2024-01-18' },
  { id: '4', email: 'analyst@longwei.com', name: '赵分析师', role: 'analyst', created_at: '2024-01-10', updated_at: '2024-01-17' },
  { id: '5', email: 'operator2@longwei.com', name: '陈专员', role: 'operator', created_at: '2024-01-12', updated_at: '2024-01-20' },
];

export const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', name: '', role: 'operator' as UserType['role'] });

  const handleAdd = () => {
    const user: UserType = {
      id: Date.now().toString(),
      ...newUser,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setUsers([...users, user]);
    setShowAddModal(false);
    setNewUser({ email: '', name: '', role: 'operator' });
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const formatRole = (role: UserType['role']) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        role === 'admin' ? 'bg-danger/10 text-danger' :
        role === 'manager' ? 'bg-primary/10 text-primary' :
        role === 'operator' ? 'bg-info/10 text-info' :
        'bg-warning/10 text-warning'
      }`}>
        {ROLE_NAMES[role]}
      </span>
    );
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">用户管理</h1>
          <p className="text-gray-500 mt-1">管理团队成员，分配角色权限</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          添加用户
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-dark">{users.length}</p>
            <p className="text-sm text-gray-500">总用户数</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-danger" />
          </div>
          <div>
            <p className="text-2xl font-bold text-dark">{users.filter((u) => u.role === 'admin').length}</p>
            <p className="text-sm text-gray-500">管理员</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center">
            <Mail className="w-6 h-6 text-info" />
          </div>
          <div>
            <p className="text-2xl font-bold text-dark">{users.filter((u) => u.role === 'manager').length}</p>
            <p className="text-sm text-gray-500">运营主管</p>
          </div>
        </div>
        <div className="card flex items-center gap-4">
          <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold text-dark">{users.filter((u) => u.role === 'operator').length}</p>
            <p className="text-sm text-gray-500">运营专员</p>
          </div>
        </div>
      </div>

      <BaseTable
        columns={[
          { key: 'name', label: '用户名' },
          { key: 'email', label: '邮箱' },
          { key: 'role', label: '角色', format: (v) => formatRole(v as UserType['role']) },
          { key: 'created_at', label: '创建时间', format: (v) => new Date(v as string).toLocaleDateString() },
          { key: 'updated_at', label: '更新时间', format: (v) => new Date(v as string).toLocaleDateString() },
        ]}
        data={users}
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
          </>
        )}
      />

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md animate-slide-up">
            <h2 className="text-xl font-bold text-dark mb-4">添加用户</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">用户名</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="input-field"
                  placeholder="请输入用户名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">邮箱</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="input-field"
                  placeholder="请输入邮箱"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">角色</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserType['role'] })}
                  className="input-field"
                >
                  {Object.entries(ROLE_NAMES).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                  ))}
                </select>
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