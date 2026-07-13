import { LucideIcon } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

const colorClasses = {
  primary: {
    bg: 'bg-primary/10',
    icon: 'text-primary',
    border: 'border-primary/20',
  },
  success: {
    bg: 'bg-success/10',
    icon: 'text-success',
    border: 'border-success/20',
  },
  warning: {
    bg: 'bg-warning/10',
    icon: 'text-warning',
    border: 'border-warning/20',
  },
  danger: {
    bg: 'bg-danger/10',
    icon: 'text-danger',
    border: 'border-danger/20',
  },
  info: {
    bg: 'bg-info/10',
    icon: 'text-info',
    border: 'border-info/20',
  },
};

export const DataCard = ({ title, value, icon: Icon, trend, color }: DataCardProps) => {
  const colors = colorClasses[color];
  
  return (
    <div className="card animate-fade-in hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-dark counter-animate">
            {typeof value === 'number' && value >= 1000 
              ? value.toLocaleString() 
              : value}
          </p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${
              trend.isUp ? 'text-success' : 'text-danger'
            }`}>
              <span>{trend.isUp ? '↑' : '↓'}</span>
              <span>{trend.value}</span>
              <span className="text-gray-400">vs 上周</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.bg} ${colors.border} border`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
};