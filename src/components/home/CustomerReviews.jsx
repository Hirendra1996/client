import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { REVIEWS } from '../../dummy data';

const CustomerReviews = () => {
  return (
    <section className="mt-10 md:mt-14 bg-white border-y border-slate-200 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-slate-500 mt-1">4.8 average from 320,000+ verified reviews.</p>
          </div>
          <div className="flex gap-2">
            <button
              className="rev-prev w-10 h-10 rounded-full border border-slate-300 grid place-items-center hover:bg-slate-900 hover:text-white transition disabled:opacity-40"
              aria-label="Previous review"
            >
              ←
            </button>
            <button
              className="rev-next w-10 h-10 rounded-full border border-slate-300 grid place-items-center hover:bg-slate-900 hover:text-white transition disabled:opacity-40"
              aria-label="Next review"
            >
              →
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: '.rev-prev',
              nextEl: '.rev-next'
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: '!bg-brand-600 !w-8 !rounded-full',
              bulletClass: 'swiper-pagination-bullet !h-2 !transition-all !bg-slate-300'
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 16
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20
              }
            }}
            className="pb-12"
          >
            {REVIEWS.map((r) => (
              <SwiperSlide key={r.id}>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 card-hover h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <img
                        src={r.img}
                        alt={r.name}
                        loading="lazy"
                        className="w-12 h-12 rounded-full object-cover shrink-0"
                      />
                      <div>
                        <p className="font-bold text-sm flex items-center gap-2">
                          {r.name}{' '}
                          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            ✓ Verified Purchase
                          </span>
                        </p>
                        <p className="text-xs text-slate-500">
                          {r.city} • bought {r.prod}
                        </p>
                      </div>
                    </div>
                    <p className="stars mt-3">
                      {'★'.repeat(r.stars)}
                      {'☆'.repeat(5 - r.stars)}
                    </p>
                    <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                      "{r.text}"
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
