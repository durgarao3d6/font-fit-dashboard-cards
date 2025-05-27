
import React, { useEffect, useRef, useState } from 'react';
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
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState({ title: 16, value: 24, subtitle: 14 });

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

  useEffect(() => {
    const resizeText = () => {
      if (!cardRef.current || !titleRef.current || !valueRef.current) return;

      const cardWidth = cardRef.current.offsetWidth;
      const cardHeight = cardRef.current.offsetHeight;

      // Calculate font sizes based on card dimensions
      const baseTitleSize = Math.max(12, Math.min(24, cardWidth / 15));
      const baseValueSize = Math.max(18, Math.min(48, cardWidth / 8));
      const baseSubtitleSize = Math.max(10, Math.min(16, cardWidth / 20));

      // Adjust for height constraints
      const heightFactor = cardHeight / 150; // Base height reference
      const adjustedTitleSize = baseTitleSize * Math.min(1, heightFactor);
      const adjustedValueSize = baseValueSize * Math.min(1, heightFactor);
      const adjustedSubtitleSize = baseSubtitleSize * Math.min(1, heightFactor);

      setFontSize({
        title: adjustedTitleSize,
        value: adjustedValueSize,
        subtitle: adjustedSubtitleSize
      });
    };

    // Initial resize
    resizeText();

    // Create ResizeObserver for the card
    const resizeObserver = new ResizeObserver(() => {
      resizeText();
    });

    if (cardRef.current) {
      resizeObserver.observe(cardRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Card 
      ref={cardRef} 
      className={`h-full w-full overflow-hidden transition-all duration-200 hover:shadow-lg ${className}`}
    >
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div 
          ref={titleRef}
          className="font-medium text-gray-600 mb-2"
          style={{ fontSize: `${fontSize.title}px`, lineHeight: '1.2' }}
        >
          {title}
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div 
            ref={valueRef}
            className="font-bold text-gray-900 mb-1"
            style={{ fontSize: `${fontSize.value}px`, lineHeight: '1.1' }}
          >
            {value}
          </div>
          
          {(subtitle || trendValue) && (
            <div 
              className="flex items-center gap-2"
              style={{ fontSize: `${fontSize.subtitle}px`, lineHeight: '1.3' }}
            >
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
