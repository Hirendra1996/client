import React from 'react';
import { Link } from 'react-router-dom';
import {
  RefreshCw,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  CreditCard,
  PackageX,
  HelpCircle,
  ArrowRight,
  Phone,
  Mail,
  Zap,
  RotateCcw
} from 'lucide-react';

import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import CategoryNav from '../components/layout/CategoryNav';
import Footer from '../components/layout/Footer';
import MobileBottomNav from '../components/layout/MobileBottomNav';

import LoginModal from '../components/modals/LoginModal';
import LocationModal from '../components/modals/LocationModal';
import MobileMenuDrawer from '../components/modals/MobileMenuDrawer';

import ChatWidget from '../components/widgets/ChatWidget';
import BackToTop from '../components/widgets/BackToTop';
import ToastContainer from '../components/widgets/ToastContainer';
import CompareBar from '../components/widgets/CompareBar';

const RETURN_STEPS = [
  {
    step: '01',
    title: 'Submit Return Request',
    desc: 'Go to your Account Orders or Contact page within 7 days of delivery. Select the item and reason for return.'
  },
  {
    step: '02',
    title: 'Free Doorstep Pickup',
    desc: 'Our logistics partner visits your doorstep within 24 to 48 hours. No packaging charges or shipping labels needed.'
  },
  {
    step: '03',
    title: 'Fast Quality Check',
    desc: 'The courier representative conducts a quick doorstep verification of product tags, brand seals, and unused condition.'
  },
  {
    step: '04',
    title: 'Instant Refund Transfer',
    desc: 'Once handed over, the refund is triggered instantly. UPI & Wallet refunds reflect in under 24 hours.'
  }
];

const CATEGORY_ELIGIBILITY = [
  {
    category: 'Fashion, Clothing & Apparel',
    window: '7 Days',
    conditions: 'Unworn, unwashed, original brand tags attached in original packaging.',
    type: 'Refund or Size Exchange'
  },
  {
    category: 'Footwear & Bags',
    window: '7 Days',
    conditions: 'Unused, tried on clean surfaces only, with original shoe box and dust bags.',
    type: 'Refund or Size Exchange'
  },
  {
    category: 'Electronics & Mobiles',
    window: '7 Days',
    conditions: 'Defective, damaged, or dead-on-arrival. Complete original box, manuals & accessories required.',
    type: 'Doorstep Replacement / Refund'
  },
  {
    category: 'Home, Kitchen & Decor',
    window: '7 Days',
    conditions: 'Complete set, unused, with all parts and original protective styrofoam.',
    type: 'Refund or Replacement'
  },
  {
    category: 'Beauty, Skincare & Fragrances',
    window: '7 Days (Conditions Apply)',
    conditions: 'Due to hygiene protocols, returnable only if outer plastic seal remains intact and unopened.',
    type: 'Refund (if seal intact)'
  },
  {
    category: 'Watches & Fine Accessories',
    window: '7 Days',
    conditions: 'Brand warranty card, original presentation box, and scratch guards intact.',
    type: 'Refund or Replacement'
  }
];

const REFUND_TIMELINES = [
  { method: 'UPI (GPay, PhonePe, Paytm)', timeline: '2 to 24 Hours', note: 'Fastest settlement mode' },
  { method: 'Credit & Debit Cards', timeline: '2 to 4 Business Days', note: 'Depends on issuing bank' },
  { method: 'Net Banking (50+ Banks)', timeline: '2 to 3 Business Days', note: 'Direct bank account transfer' },
  { method: 'Cash on Delivery (COD)', timeline: 'Instant to 24 Hours', note: 'Transferred via UPI ID or Bank NEFT' },
  { method: 'Velvora Wallet / Store Credit', timeline: 'Instant (Under 5 mins)', note: 'Usable immediately on all products' }
];

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Header */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* 2. Main Content */}
      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden py-14 md:py-20">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-6 font-medium">
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">Refund &amp; Return Policy</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300 mb-4">
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                7-DAY HASSLE-FREE RETURNS • INSTANT UPI REFUNDS
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Simple, Transparent Returns &amp; Fast Refunds
              </h1>

              <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                We believe your online shopping experience should be completely risk-free. If a product doesn't meet
                your expectations or size, we make doorstep returns and refunds fast, seamless, and free of charge.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-bold px-6 py-3.5 rounded-full transition shadow-lg"
                >
                  <RefreshCw className="w-4 h-4" /> Initiate a Return / Refund Request
                </Link>
                <a
                  href="#timelines"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm font-bold px-6 py-3.5 rounded-full transition border border-white/15"
                >
                  Check Refund Timelines
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. 4-Step Visual Process */}
        <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-card">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-[11px] font-black uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                HOW IT WORKS
              </span>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2">
                Effortless 4-Step Doorstep Returns
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {RETURN_STEPS.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 hover:border-brand-500 transition relative"
                >
                  <div className="text-2xl font-black text-brand-600 mb-2">{s.step}</div>
                  <h3 className="font-bold text-slate-900 text-base mb-1.5">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Category-Wise Return Windows */}
        <section className="max-w-7xl mx-auto px-4 mt-16">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-black tracking-widest text-brand-600 uppercase bg-brand-50 px-3 py-1 rounded-full">
              PRODUCT ELIGIBILITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
              Category-Wise Return Windows &amp; Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              All return windows commence from the date and timestamp of confirmed delivery.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Return Window</th>
                    <th className="py-4 px-6">Condition Required</th>
                    <th className="py-4 px-6">Resolution Offered</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {CATEGORY_ELIGIBILITY.map((cat, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="py-4 px-6 font-bold text-slate-900">{cat.category}</td>
                      <td className="py-4 px-6">
                        <span className="bg-emerald-50 text-emerald-700 font-extrabold px-2.5 py-1 rounded-full text-xs">
                          {cat.window}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-600">{cat.conditions}</td>
                      <td className="py-4 px-6 text-xs font-semibold text-brand-600">{cat.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. Refund Timelines & Settlement Modes */}
        <section id="timelines" className="max-w-7xl mx-auto px-4 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Refund Settlement Timelines</h3>
                  <p className="text-xs text-slate-500">How and when you receive your money back</p>
                </div>
              </div>

              <div className="space-y-3">
                {REFUND_TIMELINES.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 gap-2 text-xs"
                  >
                    <div>
                      <strong className="text-slate-900 block text-sm">{item.method}</strong>
                      <span className="text-slate-500 text-[11px]">{item.note}</span>
                    </div>
                    <span className="font-extrabold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full text-xs text-center">
                      {item.timeline}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs text-indigo-950">
                <span className="font-bold block mb-1">💡 For Cash on Delivery (COD) Orders:</span>
                When initiating a COD return, you can simply enter your verified UPI ID or bank account details on the
                return screen to receive direct instant bank credits as soon as the courier collects the item.
              </div>
            </div>

            {/* Non-Returnable Items Notice */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <PackageX className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Non-Returnable Items</h3>
                  <p className="text-xs text-slate-500">Exceptions based on health and security</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                For reasons of hygiene, safety, and manufacturer policies, the following categories cannot be returned
                once delivered in undamaged condition:
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Innerwear, lingerie, swimwear, and socks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Cosmetics, perfumes, and hair care items with opened hygiene seals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Personalized or custom-monogrammed products.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>Electronic software licenses, digital gift cards, or downloadable codes.</span>
                </li>
              </ul>

              <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <strong>Damaged or Wrong Item Delivered?</strong>
                <p className="mt-1">
                  If you received a defective, physically damaged, or wrong item, report it within <strong>48 hours</strong>{' '}
                  of delivery with photos. We provide immediate priority replacement regardless of category!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Instant Help & Action Strip */}
        <section className="max-w-7xl mx-auto px-4 mt-16">
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-xl md:text-2xl font-black">Need Help With a Return or Refund?</h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
                Our support team is on standby 24/7. Submit your query or talk to an agent immediately.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-6 py-3 rounded-full transition"
              >
                Go to Support Desk
              </Link>
              <a
                href="tel:18004190000"
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-6 py-3 rounded-full transition border border-white/20"
              >
                Call 1800-419-0000
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer & Modals */}
      <Footer />
      <MobileBottomNav />

      <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-3 items-end">
        <BackToTop />
        <ChatWidget />
      </div>

      <LoginModal />
      <LocationModal />
      <MobileMenuDrawer />
      <CompareBar />
      <ToastContainer />
    </div>
  );
};

export default RefundPolicyPage;
