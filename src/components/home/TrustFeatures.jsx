import React from 'react';
import { TRUST_FEATURES } from '../../dummy data';

const TrustFeatures = () => {
  const getIcon = (type) => {
    switch (type) {
      case 'truck':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 7h13v10H3zM16 10h3l2 3v4h-5z" />
            <circle cx="7" cy="19" r="1.5" />
            <circle cx="18" cy="19" r="1.5" />
          </svg>
        );
      case 'shield':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        );
      case 'refresh':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 12a9 9 0 109-9M3 5v4h4" />
            <path d="M12 7v5l3 3" />
          </svg>
        );
      case 'headset':
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 13a8 8 0 0116 0" />
            <rect x="2" y="13" width="4" height="7" rx="2" />
            <rect x="18" y="13" width="4" height="7" rx="2" />
            <path d="M20 20a4 4 0 01-4 2h-2" />
          </svg>
        );
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {TRUST_FEATURES.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 flex items-center gap-3 card-hover"
          >
            <span className={`w-11 h-11 rounded-xl ${item.color} grid place-items-center shrink-0`}>
              {getIcon(item.icon)}
            </span>
            <div>
              <p className="font-bold text-sm md:text-base">{item.title}</p>
              <p className="text-xs md:text-sm text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustFeatures;
