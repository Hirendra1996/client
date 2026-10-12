import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import ProductCard from '../product/ProductCard';
import { getFlashProducts } from '../../dummy data';

const FlashSale = () => {
  const flashProducts = getFlashProducts();

  // Live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: '02',
    minutes: '12',
    seconds: '57'
  });

  useEffect(() => {
    let endTime = Date.now() + (2 * 3600 + 14 * 60 + 36) * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      let diff = Math.max(0, endTime - now);

      if (diff === 0) {
        endTime = Date.now() + 6 * 3600 * 1000;
        diff = endTime - now;
      }

      const h = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const m = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const s = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

      setTimeLeft({ hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="flash" className="mt-10 md:mt-14 bg-slate-900 py-10 md:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header row */}
        <div className="flex flex-wrap items-center gap-4 justify-between mb-6">
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-extrabold flex items-center gap-2">
              ⚡ Flash Sale{' '}
              <span className="bg-sale text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full animate-pulse">
                LIVE
              </span>
            </h2>
            <p className="text-slate-400 mt-1">Limited-time deals. Grab them before they're gone.</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Countdown */}
            <div className="flex items-center gap-2 tick" aria-label="Countdown">
              <span className="text-slate-400 text-xs font-bold hidden sm:block">ENDS IN</span>
              <span className="bg-white/10 border border-white/15 text-white font-black text-xl px-3 py-2 rounded-xl min-w-[52px] text-center">
                {timeLeft.hours}
              </span>
              <span className="text-white font-black">:</span>
              <span className="bg-white/10 border border-white/15 text-white font-black text-xl px-3 py-2 rounded-xl min-w-[52px] text-center">
                {timeLeft.minutes}
              </span>
              <span className="text-white font-black">:</span>
              <span className="bg-sale text-white font-black text-xl px-3 py-2 rounded-xl min-w-[52px] text-center">
                {timeLeft.seconds}
              </span>
            </div>

            <a
              href="/products"
              className="hidden md:inline-flex bg-white text-slate-900 font-bold text-sm px-5 py-2.5 rounded-full hover:bg-brand-100 transition"
            >
              View All Deals →
            </a>
          </div>
        </div>

        {/* Swiper Slider Row */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.3}
            navigation={{
              prevEl: '.flash-prev',
              nextEl: '.flash-next'
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              480: {
                slidesPerView: 2.1,
                spaceBetween: 16
              },
              768: {
                slidesPerView: 3.1,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20
              },
              1280: {
                slidesPerView: 4.2,
                spaceBetween: 20
              }
            }}
            className="pb-2"
          >
            {flashProducts.map((p) => (
              <SwiperSlide key={p.id}>
                <ProductCard product={p} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button
            className="flash-prev hidden md:grid absolute -left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-pop place-items-center hover:bg-brand-600 hover:text-white transition z-20 cursor-pointer disabled:opacity-40"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            className="flash-next hidden md:grid absolute -right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-pop place-items-center hover:bg-brand-600 hover:text-white transition z-20 cursor-pointer disabled:opacity-40"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
