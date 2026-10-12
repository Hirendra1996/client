import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import ProductCard from '../product/ProductCard';
import { getNewArrivals } from '../../dummy data';

const NewArrivals = () => {
  const newProducts = getNewArrivals();

  return (
    <section id="new" className="max-w-7xl mx-auto px-4 mt-10 md:mt-14">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Fresh Arrivals
          </h2>
          <p className="text-slate-500 mt-1">Discover what's new this week.</p>
        </div>
        <div className="flex gap-2">
          <button
            className="new-prev w-10 h-10 rounded-full border border-slate-300 grid place-items-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition disabled:opacity-40"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            className="new-next w-10 h-10 rounded-full border border-slate-300 grid place-items-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition disabled:opacity-40"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.3}
          navigation={{
            prevEl: '.new-prev',
            nextEl: '.new-next'
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
          {newProducts.map((p) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default NewArrivals;
