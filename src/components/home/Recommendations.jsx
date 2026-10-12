import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import ProductCard from '../product/ProductCard';
import { useApp } from '../../context/AppContext';
import { getRecommendedProducts } from '../../dummy data';

const Recommendations = () => {
  const { user, setIsLoginOpen } = useApp();
  const recommendedProducts = getRecommendedProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10 md:mt-14">
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Recommended For You
          </h2>
          <p className="text-slate-500 mt-1">Picked based on your interests.</p>
        </div>
        <div className="flex gap-2">
          <button
            className="rec-prev w-10 h-10 rounded-full border border-slate-300 grid place-items-center hover:bg-slate-900 hover:text-white transition disabled:opacity-40"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            className="rec-next w-10 h-10 rounded-full border border-slate-300 grid place-items-center hover:bg-slate-900 hover:text-white transition disabled:opacity-40"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>

      {/* Guest Login Banner (Hidden if logged in) */}
      {!user && (
        <div
          id="loginBanner"
          className="mb-5 bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-100 rounded-2xl p-4 md:p-5 flex flex-wrap items-center gap-4 justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-brand-600 text-white grid place-items-center text-xl shrink-0">
              👋
            </span>
            <div>
              <p className="font-bold">Sign in to get personalized recommendations</p>
              <p className="text-sm text-slate-600">
                Unlock curated picks, price-drop alerts &amp; faster checkout.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLoginOpen(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-8 py-2.5 rounded-full transition shadow-sm"
          >
            LOGIN
          </button>
        </div>
      )}

      {/* Swiper Slider Row */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1.3}
          navigation={{
            prevEl: '.rec-prev',
            nextEl: '.rec-next'
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
          {recommendedProducts.map((p) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Recommendations;
