import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';
import { getTrendingProducts } from '../../dummy data';

const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'popular', label: 'Popular' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'best', label: 'Best Sellers' }
  ];

  const handleTabChange = (tabId) => {
    if (tabId === activeTab) return;
    setIsLoading(true);
    setActiveTab(tabId);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  const products = getTrendingProducts(activeTab);

  return (
    <section id="trending" className="max-w-7xl mx-auto px-4 mt-10 md:mt-14">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Trending Products
          </h2>
          <p className="text-slate-500 mt-1">Most loved by shoppers this week.</p>
        </div>

        {/* Filter Tabs & View All */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2 bg-white border border-slate-200 p-1.5 rounded-full" role="tablist">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`tabBtn text-xs md:text-sm font-bold px-4 md:px-5 py-2 rounded-full transition ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <Link
            to="/products"
            className="hidden sm:inline-flex text-brand-600 font-bold text-sm hover:underline items-center gap-1"
          >
            All Products →
          </Link>
        </div>
      </div>

      {/* Grid or Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white border rounded-2xl overflow-hidden p-4 space-y-3">
                <div className="skeleton aspect-square rounded-xl" />
                <div className="skeleton h-3 rounded w-1/3" />
                <div className="skeleton h-4 rounded w-4/5" />
                <div className="skeleton h-4 rounded w-1/2" />
              </div>
            ))}
        </div>
      ) : (
        <div id="trendGrid" className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;
