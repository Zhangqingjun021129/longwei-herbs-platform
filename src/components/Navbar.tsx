import { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Package, 
  Target, 
  Users, 
  Settings, 
  ShoppingBag,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { ROLE_NAMES } from '@/types';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: '首页', icon: LayoutDashboard },
  { id: 'competitor', label: '竞品分析', icon: BarChart3 },
  { id: 'products', label: '商品管理', icon: Package },
  { id: 'ads', label: '投流管理', icon: Target },
  { id: 'analytics', label: '数据分析', icon: ShoppingBag },
  { id: 'platforms', label: '平台接入', icon: Users },
];

export const Navbar = ({ currentPage, onPageChange }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-primary-dark text-white shadow-xl z-50 flex flex-col">
      <div className="p-6 border-b border-primary-light">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
            <span className="text-primary-dark font-bold text-xl">陇</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">陇渭本草</h1>
            <p className="text-xs text-gray-400">电商运营平台</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onPageChange(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-light text-gold'
                      : 'text-gray-300 hover:bg-primary-light hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {(user?.role === 'admin') && (
          <div className="mt-8 px-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">管理</div>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => {
                    onPageChange('users');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentPage === 'users'
                      ? 'bg-primary-light text-gold'
                      : 'text-gray-300 hover:bg-primary-light hover:text-white'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span className="font-medium">用户管理</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onPageChange('settings');
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentPage === 'settings'
                      ? 'bg-primary-light text-gold'
                      : 'text-gray-300 hover:bg-primary-light hover:text-white'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">系统设置</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-primary-light">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{user?.name}</p>
            <p className="text-xs text-gray-400">{ROLE_NAMES[user?.role || 'operator']}</p>
          </div>
          <button
            onClick={logout}
            className="p-2 text-gray-400 hover:text-white hover:bg-primary-light rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-primary-dark p-2 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />
      )}
    </nav>
  );
};