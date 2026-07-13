import { Plus, TrendingUp, ShoppingCart, FileText, RefreshCw } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const actions = [
  { id: 'add-product', label: '添加商品', icon: Plus, color: 'bg-green-500' },
  { id: 'competitor-analysis', label: '竞品分析', icon: TrendingUp, color: 'bg-blue-500' },
  { id: 'create-ad', label: '创建投放', icon: ShoppingCart, color: 'bg-purple-500' },
  { id: 'export-report', label: '导出报表', icon: FileText, color: 'bg-orange-500' },
  { id: 'sync-data', label: '同步数据', icon: RefreshCw, color: 'bg-teal-500' },
];

export const QuickActions = ({ onAction }: QuickActionsProps) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-dark mb-4">快捷操作</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={() => onAction(action.id)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white group-hover:shadow-lg transition-shadow`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-dark">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};