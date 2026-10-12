import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  Users,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
  Headphones,
  Globe,
  Leaf,
  Layers,
  ChevronRight
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

const STATS = [
  { value: '2M+', label: 'Delighted Customers', sub: 'Across 28 states & 8 UTs' },
  { value: '50,000+', label: 'Curated Products', sub: '100% Genuine & Brand-Verified' },
  { value: '19,000+', label: 'Pincodes Served', sub: 'From metros to tier-4 towns' },
  { value: '99.4%', label: 'On-Time Deliveries', sub: 'Powered by smart logistics hubs' }
];

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: '100% Authentic Guarantee',
    desc: 'Every item on Velvora is sourced directly from certified brand principals or authorized distributors. Zero compromise on quality or counterfeit tolerance.'
  },
  {
    icon: HeartHandshake,
    title: 'Customer Obsession First',
    desc: 'Our 24/7 dedicated customer care team responds in under 90 seconds. We believe our relationship begins after your parcel is delivered, not before.'
  },
  {
    icon: Truck,
    title: 'Lightning-Fast Fulfillment',
    desc: 'Smart automated micro-warehouses in Gurugram, Mumbai, and Bengaluru ensure same-day dispatch and rapid 2-4 day delivery nationwide.'
  },
  {
    icon: Leaf,
    title: 'Sustainable & Green Future',
    desc: 'We are committed to 100% plastic-free recycled corrugated packaging, EV fleet deliveries in top cities, and a carbon-conscious supply chain.'
  }
];

const MILESTONES = [
  {
    year: '2022',
    title: 'The Inception',
    desc: 'Founded with a simple vision: give Indian shoppers access to premium, verified lifestyle and tech products without middleman markups.'
  },
  {
    year: '2023',
    title: 'Nationwide Expansion',
    desc: 'Scaled to 500+ top brand partners, inaugurated our Northern and Western fulfillment hubs, and achieved our first 500,000 orders.'
  },
  {
    year: '2024',
    title: 'Velvora Express & Flagships',
    desc: 'Launched next-day delivery across 12 metro cities and opened our state-of-the-art interactive product experience lounge in Mumbai.'
  },
  {
    year: '2025–2026',
    title: '2 Million Smiles & Beyond',
    desc: 'Reaching 19,000+ pincodes, pioneering AI-assisted shopping discovery, and setting industry benchmarks in instant doorstep returns.'
  }
];

const LEADERSHIP = [
  {
    name: 'Aarav Malhotra',
    role: 'Co-Founder & Chief Executive Officer',
    bio: 'Ex-McKinsey & e-commerce veteran with 14+ years building high-growth consumer technology brands across Asia.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Devika Singhania',
    role: 'Co-Founder & Chief Operating Officer',
    bio: 'Supply chain pioneer formerly leading global fulfillment networks, passionate about tier-2/tier-3 logistics penetration.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Rohan Deshmukh',
    role: 'Chief Technology & Product Officer',
    bio: 'Built distributed high-throughput search systems and real-time recommendation engines serving millions of daily active users.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Header */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* 2. Main Content */}
      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden py-16 md:py-24">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-6 font-medium">
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">About Us</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-300 mb-5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                THE VELVORA PROMISE
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Crafting India's Most <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-pink-300">
                  Trusted Shopping Destination.
                </span>
              </h1>

              <p className="mt-5 text-base md:text-lg text-slate-300 leading-relaxed font-normal">
                Born out of a belief that luxury, authenticity, and lightning-fast convenience shouldn't be a privilege.
                At Velvora, we connect millions of modern Indian shoppers to world-class lifestyle, electronics, fashion,
                and essentials with complete transparency.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-6 py-3.5 rounded-full transition shadow-lg hover:shadow-indigo-500/25"
                >
                  Explore Our Catalog <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-6 py-3.5 rounded-full transition border border-white/15"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Stats Strip */}
        <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-lift transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-black text-brand-600 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-extrabold text-slate-900 mt-1">{stat.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Our Mission & Vision */}
        <section className="max-w-7xl mx-auto px-4 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-black tracking-widest text-brand-600 uppercase bg-brand-50 px-3 py-1 rounded-full">
                WHO WE ARE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3 tracking-tight">
                Built on Integrity, Driven by Innovation
              </h2>
              <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
                Founded in 2022, Velvora began with a simple observation: Indian consumers were constantly juggling
                between unreliable online marketplaces flooded with counterfeit items, unpredictable shipping times,
                and painful return processes.
              </p>
              <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
                We set out to create a fundamentally different shopping ecosystem. By building direct, authorized
                relationships with global and home-grown manufacturers and investing in proprietary regional fulfillment
                infrastructure, we guarantee 100% genuine products delivered in record time.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Zero Counterfeits, Ever</h3>
                    <p className="text-xs text-slate-500">
                      Multi-tier lab inspection and serialized tamper-evident holograms on every shipment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Doorstep Peace of Mind</h3>
                    <p className="text-xs text-slate-500">
                      Hassle-free 7-day returns with instant UPI refunds and free doorstep collections.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Empowering Indian Artisans & Brands</h3>
                    <p className="text-xs text-slate-500">
                      Proudly showcasing over 2,000+ Make in India manufacturers alongside premier global labels.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Feature Card Showcase */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80"
                  alt="Velvora Customer Experience & Warehouse"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-300 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                    STATE-OF-THE-ART FULFILLMENT
                  </span>
                  <h3 className="text-lg md:text-xl font-black mt-2">
                    Over 500,000 sq. ft. of Automated Smart Logistics
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Operating advanced climate-controlled fulfillment centers in Gurugram, Mumbai &amp; Bengaluru.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Core Values */}
        <section className="max-w-7xl mx-auto px-4 mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest text-brand-600 uppercase bg-brand-50 px-3 py-1 rounded-full">
              OUR PILLARS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Values That Guide Every Package
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Everything we build centers around making commerce more reliable, accessible, and delightful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. Growth Milestones */}
        <section className="max-w-7xl mx-auto px-4 mt-24">
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-white/10 px-3 py-1 rounded-full">
                OUR JOURNEY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3">
                From Day One to 2 Million Smiles
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Every milestone achieved is a testament to the trust our community places in us every day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {MILESTONES.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative"
                >
                  <div className="text-2xl font-black text-indigo-400 mb-2">{m.year}</div>
                  <h3 className="text-base font-bold text-white mb-1.5">{m.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Leadership Team */}
        <section className="max-w-7xl mx-auto px-4 mt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest text-brand-600 uppercase bg-brand-50 px-3 py-1 rounded-full">
              LEADERSHIP
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              The Minds Behind Velvora
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              A diverse team of engineers, supply-chain architects, and retail veterans committed to customer excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LEADERSHIP.map((leader, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center flex flex-col items-center"
              >
                <img
                  src={leader.avatar}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full object-cover shadow-md mb-4 ring-4 ring-brand-50"
                />
                <h3 className="text-lg font-bold text-slate-900">{leader.name}</h3>
                <span className="text-xs font-semibold text-brand-600 mt-0.5">{leader.role}</span>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Call to Action Banner */}
        <section className="max-w-7xl mx-auto px-4 mt-24">
          <div className="bg-gradient-to-r from-brand-600 to-indigo-700 text-white rounded-3xl p-8 md:p-12 shadow-lift flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h2 className="text-2xl md:text-3xl font-black">Ready to Experience the Velvora Difference?</h2>
              <p className="text-indigo-100 text-xs md:text-sm mt-2 max-w-xl">
                Discover over 50,000+ authentic products with free shipping above ₹999 and hassle-free 7-day doorstep returns.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center shrink-0">
              <Link
                to="/products"
                className="bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs px-6 py-3.5 rounded-full transition shadow-md"
              >
                Start Shopping Now
              </Link>
              <Link
                to="/contact"
                className="bg-indigo-900/40 hover:bg-indigo-900/60 text-white font-extrabold text-xs px-6 py-3.5 rounded-full transition border border-white/20"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <Footer />
      <MobileBottomNav />

      {/* 4. Floating Elements */}
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

export default AboutPage;
