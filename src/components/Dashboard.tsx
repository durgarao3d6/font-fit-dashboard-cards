import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import KPICard from './KPICard';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

const Dashboard: React.FC = () => {
  const [layouts, setLayouts] = useState({
    lg: [
      { i: 'revenue', x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
      { i: 'users', x: 3, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
      { i: 'conversion', x: 6, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
      { i: 'orders', x: 9, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
      { i: 'growth', x: 0, y: 2, w: 4, h: 3, minW: 3, minH: 2 },
      { i: 'satisfaction', x: 4, y: 2, w: 4, h: 3, minW: 3, minH: 2 },
      { i: 'churn', x: 8, y: 2, w: 4, h: 3, minW: 3, minH: 2 },
    ] as LayoutItem[]
  });

  const kpiData = [
    {
      id: 'revenue',
      title: 'Total Revenue',
      value: '$2.4M',
      subtitle: 'This month',
      trend: 'up' as const,
      trendValue: '+12.5%'
    },
    {
      id: 'users',
      title: 'Active Users',
      value: '124.3K',
      subtitle: 'Last 30 days',
      trend: 'up' as const,
      trendValue: '+8.2%'
    },
    {
      id: 'conversion',
      title: 'Conversion Rate',
      value: '3.24%',
      subtitle: 'Average',
      trend: 'down' as const,
      trendValue: '-0.3%'
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: '8,549',
      subtitle: 'This week',
      trend: 'up' as const,
      trendValue: '+15.7%'
    },
    {
      id: 'growth',
      title: 'Monthly Growth',
      value: '23.8%',
      subtitle: 'Year over year',
      trend: 'up' as const,
      trendValue: '+5.2%'
    },
    {
      id: 'satisfaction',
      title: 'Customer Satisfaction',
      value: '4.8/5',
      subtitle: 'Average rating',
      trend: 'neutral' as const,
      trendValue: 'Stable'
    },
    {
      id: 'churn',
      title: 'Churn Rate',
      value: '2.1%',
      subtitle: 'Monthly',
      trend: 'down' as const,
      trendValue: '-0.8%'
    }
  ];

  const onLayoutChange = (layout: LayoutItem[], allLayouts: { [key: string]: LayoutItem[] }) => {
    setLayouts({ lg: allLayouts.lg || layout });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Drag and resize cards to customize your view</p>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        isDraggable={true}
        isResizable={true}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        useCSSTransforms={true}
      >
        {kpiData.map((kpi) => (
          <div key={kpi.id} className="grid-item">
            <KPICard
              title={kpi.title}
              value={kpi.value}
              subtitle={kpi.subtitle}
              trend={kpi.trend}
              trendValue={kpi.trendValue}
              className="shadow-sm border-gray-200"
            />
          </div>
        ))}
      </ResponsiveGridLayout>

      <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Features</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Drag cards to rearrange layout</li>
          <li>• Resize cards by dragging the bottom-right corner</li>
          <li>• Font sizes automatically adjust to card dimensions</li>
          <li>• Responsive design adapts to screen size</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
