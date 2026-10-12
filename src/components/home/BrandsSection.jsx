import React from 'react';
import { BRANDS } from '../../dummy data';
import { useApp } from '../../context/AppContext';

const BrandsSection = () => {
  const { addToast } = useApp();

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10 md:mt-14">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Shop Your Favorite Brands
        </h2>
        <p className="text-slate-500 mt-1">Authentic products from top-rated labels.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {BRANDS.map((b) => (
          <a
            key={b.id}
            href="#brands"
            onClick={(e) => {
              e.preventDefault();
              addToast(`Browsing ${b.name}`, `${b.cat} collection`);
            }}
            className="bg-white border-2 border-slate-200 rounded-2xl p-6 text-center card-hover hover:border-brand-600 group transition block"
          >
            <p className="font-black text-lg tracking-widest group-hover:text-brand-600 transition-colors">
              {b.name}
            </p>
            <p className="text-xs text-slate-500 mt-1">{b.cat} • {b.items}</p>
          </a>
        ))}
      </div>

      <div className="text-center mt-5">
        <button
          onClick={() => addToast('Brand Directory', 'Over 200+ partner brands available')}
          className="border-2 border-slate-900 font-bold text-sm px-8 py-2.5 rounded-full hover:bg-slate-900 hover:text-white transition"
        >
          VIEW ALL BRANDS
        </button>
      </div>
    </section>
  );
};

export default BrandsSection;
