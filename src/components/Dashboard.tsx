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
}

const Dashboard: React.FC = () => {
  const [layouts, setLayouts] = useState<{ [key: string]: LayoutItem[] }>({
    lg: [
      { i: 'exceptions', x: 0, y: 0, w: 4, h: 4 },
      { i: 'expedites', x: 4, y: 0, w: 4, h: 4 },
      { i: 'orders', x: 8, y: 0, w: 4, h: 4 },
    ]
  });

  const kpiData = [
    {
      id: 'exceptions',
      title: 'Exceptions',
      value: '17',
      subtitle: 'Need Updates',
      type: 'simple' as const
    },
    {
      id: 'expedites',
      title: 'Expedites',
      value: '04',
      subtitle: 'Need Updates',
      type: 'detailed' as const,
      stats: [
        { label: 'Total Expedites', value: '14' },
        { label: 'Picked Up', value: '04' },
        { label: 'Delivered', value: '06' }
      ]
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'orders' as const
    }
  ];

  const onLayoutChange = (layout: LayoutItem[], allLayouts: { [key: string]: LayoutItem[] }) => {
    setLayouts({ lg: allLayouts.lg || layout });
  };

  const handleCreateOrder = () => {
    console.log('Create Order clicked');
    // Add your create order logic here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
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
              type={kpi.type}
              stats={kpi.stats}
              onCreateOrder={kpi.id === 'orders' ? handleCreateOrder : undefined}
              className="shadow-sm"
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
          <li>• Three different card layouts: Simple, Detailed, and Orders</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
