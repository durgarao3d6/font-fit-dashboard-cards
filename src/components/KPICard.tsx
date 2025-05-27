
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Clock, Calendar } from 'lucide-react';

interface KPICardProps {
  title: string;
  value?: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  type?: 'simple' | 'detailed' | 'orders';
  stats?: Array<{ label: string; value: string }>;
  onCreateOrder?: () => void;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  trend = 'neutral',
  trendValue,
  className = '',
  type = 'simple',
  stats = [],
  onCreateOrder
}) => {
  const getIcon = () => {
    switch (title.toLowerCase()) {
      case 'exceptions': return <FileText className="w-6 h-6 text-blue-500" />;
      case 'expedites': return <Clock className="w-6 h-6 text-blue-500" />;
      case 'orders': return <Calendar className="w-6 h-6 text-blue-500" />;
      default: return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (type === 'orders') {
    return (
      <Card className={`kpi-card h-full w-full overflow-hidden bg-blue-50 border-blue-200 ${className}`}>
        <CardContent className="kpi-content p-6 h-full flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            {getIcon()}
            <div className="kpi-title font-semibold text-gray-800">
              {title}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-12 h-12 text-blue-400" />
            </div>
            <Button 
              onClick={onCreateOrder}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
            >
              Create Order
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (type === 'detailed') {
    return (
      <Card className={`kpi-card h-full w-full overflow-hidden bg-white border-blue-200 ${className}`}>
        <CardContent className="kpi-content p-6 h-full">
          <div className="flex items-center gap-3 mb-6">
            {getIcon()}
            <div className="kpi-title font-semibold text-gray-800">
              {title}
            </div>
          </div>
          
          {value && (
            <div className="text-center mb-6">
              <div className="kpi-value font-bold text-orange-500 mb-2">
                {value}
              </div>
              {subtitle && (
                <div className="text-gray-600 text-sm">
                  {subtitle}
                </div>
              )}
            </div>
          )}

          {stats.length > 0 && (
            <div className="space-y-3">
              <hr className="border-gray-200" />
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{stat.label}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`kpi-card h-full w-full overflow-hidden bg-white border-blue-200 ${className}`}>
      <CardContent className="kpi-content p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          {getIcon()}
          <div className="kpi-title font-semibold text-gray-800">
            {title}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="kpi-value font-bold text-orange-500 mb-2">
            {value}
          </div>
          
          {subtitle && (
            <div className="text-gray-600 text-sm">
              {subtitle}
            </div>
          )}

          {trendValue && (
            <div className={`mt-2 text-sm ${getTrendColor()}`}>
              {trendValue}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
