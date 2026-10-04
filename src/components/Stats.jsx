import React from 'react';

export default function Stats() {
  const statData = [
    { label: 'Increase in pick up speed', value: 58, suffix: '%' },
    { label: 'Less fuel consumption', value: 23, suffix: '%' },
    { label: 'Increase in battery life', value: 27, suffix: '%' }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 mt-12 w-full max-w-4xl mx-auto justify-between px-4 z-20 relative">
      {statData.map((stat, index) => (
        <div 
          key={index} 
          className="stat-item flex flex-col items-center text-center opacity-0 translate-y-10"
        >
          <div className="text-5xl font-bold text-accent mb-2 text-glow">
            <span className="stat-number" data-target={stat.value}>0</span>
            {stat.suffix}
          </div>
          <div className="text-gray-400 text-sm uppercase tracking-widest max-w-[150px]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
