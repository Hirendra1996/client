import React from 'react';

const PromoBanner = () => {
  const scrollToTrending = () => {
    const el = document.getElementById('trending');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10 md:mt-14">
      <div className="grid md:grid-cols-2 bg-brand-600 rounded-3xl overflow-hidden shadow-lift relative">
        {/* Radial dot background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
            backgroundSize: '28px 28px'
          }}
        />

        {/* Text Content */}
        <div className="p-8 md:p-12 relative z-10">
          <span className="bg-white text-brand-700 text-xs font-extrabold px-4 py-1.5 rounded-full">
            UP TO 50% OFF • PREMIUM PICKS
          </span>
          <h2 className="text-white text-3xl md:text-4xl font-black mt-4 leading-tight">
            Upgrade Your Everyday.
          </h2>
          <p className="text-indigo-100 mt-2 md:text-lg">
            Premium products at prices you'll love. Audio, wearables, home essentials &amp; more.
          </p>
          <div className="flex flex-wrap gap-3 mt-6 items-center">
            <button
              onClick={scrollToTrending}
              className="bg-white text-brand-700 font-extrabold px-8 py-3 rounded-full hover:bg-slate-900 hover:text-white transition text-sm shadow-md"
            >
              SHOP COLLECTION
            </button>
            <div className="flex items-center gap-2 text-white text-sm font-semibold">
              <span className="stars">★★★★★</span> 4.9 • 120k reviews
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="relative min-h-[240px] md:min-h-[340px]">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
            alt="Premium watch collection"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute top-5 right-5 bg-sale text-white font-black px-4 py-2 rounded-full rotate-3 shadow-pop text-sm">
            UP TO 50% OFF
          </span>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
