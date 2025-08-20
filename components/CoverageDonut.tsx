import React, { useState } from 'react';

type CoverageDonutProps = {
  percent: number;
  size?: number;
  label?: string;
  onHoverChange?: (hover: boolean) => void;
};

const CoverageDonut: React.FC<CoverageDonutProps> = ({ percent, size = 120, label = 'Coverage', onHoverChange }) => {
  const [hoverArea, setHoverArea] = useState<'none' | 'filled' | 'remaining'>('none');

  const filled = Math.max(0, Math.min(100, percent));

  const strokeWidth = Math.max(8, Math.round(size * 0.12));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - filled / 100);

  const blue = '#2563EB';
  const blueHover = '#1D4ED8';
  const gray = '#e6e9ed';
  const grayHover = '#cbd5e1';

  function enter(area: 'filled' | 'remaining') {
    setHoverArea(area);
    if (onHoverChange) onHoverChange(true);
  }

  function leave() {
    setHoverArea('none');
    if (onHoverChange) onHoverChange(false);
  }

  return (
    <div style={{ width: size }} className="flex flex-col items-center">
      <div className={`relative transition-transform duration-200 ${hoverArea !== 'none' ? 'scale-105' : ''}`}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            {/* remaining track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={hoverArea === 'remaining' ? grayHover : gray}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              onMouseEnter={() => enter('remaining')}
              onMouseLeave={leave}
              style={{ transition: 'stroke 120ms ease' }}
            />

            {/* filled arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={hoverArea === 'filled' ? blueHover : blue}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              onMouseEnter={() => enter('filled')}
              onMouseLeave={leave}
              style={{ transition: 'stroke 120ms ease, stroke-dashoffset 350ms ease' }}
            />
          </g>
        </svg>

        {/* center content */}
        <div
          onMouseEnter={() => enter('filled')}
          onMouseLeave={leave}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex flex-col items-center justify-center"
          style={{ width: Math.round(size * 0.6), height: Math.round(size * 0.6) }}
        >
          <div className={`text-2xl font-bold ${hoverArea !== 'none' ? 'text-blue-700' : 'text-blue-600'}`}>{percent}%</div>
          <div className="text-xs text-gray-500">{label}</div>
        </div>

        {/* tooltip placed above donut with z-index */}
        <div
          style={{ left: '50%', transform: 'translateX(-50%)' }}
          className={`absolute -top-10 px-2 py-1 bg-gray-800 text-white text-xs rounded transition-opacity duration-150 z-50 ${hoverArea !== 'none' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          Coverage: {percent}%
        </div>
      </div>
    </div>
  );
};

export default CoverageDonut;
