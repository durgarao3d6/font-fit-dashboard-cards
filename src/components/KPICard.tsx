
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  trend = 'neutral',
  trendValue,
  className = ''
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <Card className={`kpi-card h-full w-full overflow-hidden transition-all duration-200 hover:shadow-lg ${className}`}>
      <CardContent className="kpi-content p-4 h-full flex flex-col justify-between">
        <div className="kpi-title font-medium text-gray-600 mb-2">
          {title}
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="kpi-value font-bold text-gray-900 mb-1">
            {value}
          </div>
          
          {(subtitle || trendValue) && (
            <div className="kpi-subtitle flex items-center gap-2">
              {subtitle && (
                <span className="text-gray-500">{subtitle}</span>
              )}
              {trendValue && (
                <span className={`flex items-center gap-1 ${getTrendColor()}`}>
                  <span>{getTrendIcon()}</span>
                  <span>{trendValue}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
