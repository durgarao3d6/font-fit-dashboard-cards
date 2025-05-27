
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
      case 'exceptions': return <FileText className="kpi-icon text-blue-500" />;
      case 'expedites': return <Clock className="kpi-icon text-blue-500" />;
      case 'orders': return <Calendar className="kpi-icon text-blue-500" />;
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
        <CardContent className="kpi-content h-full flex flex-col justify-between">
          <div className="flex items-center kpi-gap">
            {getIcon()}
            <div className="kpi-title text-gray-800">
              {title}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-blue-100 rounded-lg flex items-center justify-center kpi-margin" style={{ width: '20cqw', height: '20cqw' }}>
              <Calendar className="text-blue-400" style={{ width: '12cqw', height: '12cqw' }} />
            </div>
            <Button 
              onClick={onCreateOrder}
              className="kpi-button bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
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
        <CardContent className="kpi-content h-full">
          <div className="flex items-center kpi-gap kpi-margin">
            {getIcon()}
            <div className="kpi-title text-gray-800">
              {title}
            </div>
          </div>
          
          {value && (
            <div className="text-center kpi-margin">
              <div className="kpi-value text-orange-500 kpi-margin">
                {value}
              </div>
              {subtitle && (
                <div className="kpi-subtitle text-gray-600">
                  {subtitle}
                </div>
              )}
            </div>
          )}

          {stats.length > 0 && (
            <div style={{ marginTop: '3cqw' }}>
              <hr className="border-gray-200" />
              <div style={{ marginTop: '2cqw', display: 'flex', flexDirection: 'column', gap: '2cqw' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="kpi-stats-label text-gray-600">{stat.label}</span>
                    <span className="kpi-stats-value bg-blue-100 text-blue-800 rounded-full" style={{ padding: '1cqw 2cqw' }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`kpi-card h-full w-full overflow-hidden bg-white border-blue-200 ${className}`}>
      <CardContent className="kpi-content h-full flex flex-col">
        <div className="flex items-center kpi-gap kpi-margin">
          {getIcon()}
          <div className="kpi-title text-gray-800">
            {title}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="kpi-value text-orange-500 kpi-margin">
            {value}
          </div>
          
          {subtitle && (
            <div className="kpi-subtitle text-gray-600">
              {subtitle}
            </div>
          )}

          {trendValue && (
            <div className={`kpi-margin kpi-subtitle ${getTrendColor()}`}>
              {trendValue}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
