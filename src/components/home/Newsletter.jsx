import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useApp();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast('Subscribed! 🎉', `10% promo code sent to ${email}`);
    setEmail('');
  };

  return (
    <section className="max-w-3xl mx-auto px-4 mt-10 md:mt-14 text-center">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-card">
        <span className="inline-grid w-14 h-14 rounded-2xl bg-brand-50 text-2xl place-items-center">
          ✉️
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold mt-4">
          Get 10% Off Your First Order
        </h2>
        <p className="text-slate-500 mt-2">
          Subscribe for exclusive deals, new arrivals and special offers.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="mt-5 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 border-2 border-slate-200 focus:border-brand-600 rounded-full px-5 py-3 text-sm outline-none transition"
            aria-label="Email"
          />
          <button
            type="submit"
            className="bg-slate-900 hover:bg-brand-600 text-white font-bold text-sm px-8 py-3 rounded-full transition shadow-md"
          >
            SUBSCRIBE
          </button>
        </form>
        <p className="text-xs text-slate-400 mt-3">
          No spam. Unsubscribe anytime. 🔒 Your data is safe.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
