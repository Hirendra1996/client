import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../dummy data';

const ShopByCategory = () => {
  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 mt-10 md:mt-14">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Shop by Category
          </h2>
          <p className="text-slate-500 mt-1">Explore products curated for every need.</p>
        </div>
        <Link
          to="/products"
          className="hidden md:inline-flex text-brand-600 font-bold text-sm hover:gap-3 gap-2 transition-all items-center"
        >
          View All →
        </Link>
      </div>

      <div id="catGrid" className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${encodeURIComponent(cat.name)}`}
            className="card-hover group bg-white border border-slate-200 rounded-2xl overflow-hidden block"
          >
            <div className="overflow-hidden img-zoom aspect-[4/3]">
              <img
                src={cat.img}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3.5 md:p-4">
              <p className="font-extrabold text-sm md:text-base text-slate-900 group-hover:text-brand-600 transition-colors">
                {cat.name}
              </p>
              <p className="text-xs text-slate-500">{cat.count}</p>
              <p className="text-brand-600 text-xs md:text-sm font-bold mt-1.5 group-hover:gap-3 gap-1.5 flex items-center transition-all">
                Explore <span>→</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
