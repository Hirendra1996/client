import React, { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Sparkles,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Upload,
  AlertCircle,
  Building2,
  Search,
  ExternalLink,
  Copy,
  Check,
  MessageCircle,
  RefreshCw,
  PackageCheck,
  CreditCard,
  Truck
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

import { useApp } from '../context/AppContext';

const INQUIRY_CATEGORIES = [
  {
    id: 'orders',
    label: 'Order Status & Tracking',
    icon: Truck,
    description: 'Track shipment, delay, or delivery confirmation',
    orderRequired: true
  },
  {
    id: 'returns',
    label: 'Returns & Refunds',
    icon: RefreshCw,
    description: 'Return request, pickup delay, or refund status',
    orderRequired: true
  },
  {
    id: 'product',
    label: 'Product Information',
    icon: PackageCheck,
    description: 'Specifications, size guides, warranty, or authenticity',
    orderRequired: false
  },
  {
    id: 'payment',
    label: 'Payment & Invoicing',
    icon: CreditCard,
    description: 'Failed transactions, UPI, EMI, or GST invoices',
    orderRequired: false
  },
  {
    id: 'partnership',
    label: 'Seller & Brand Partnership',
    icon: Building2,
    description: 'Sell on Velvora, corporate bulk orders, or brand tie-ups',
    orderRequired: false
  },
  {
    id: 'general',
    label: 'General Inquiries & Feedback',
    icon: MessageSquare,
    description: 'Account issues, suggestions, or grievance',
    orderRequired: false
  }
];

const FAQS = [
  {
    category: 'Orders',
    question: 'How do I track my order in real-time?',
    answer:
      'Once your order is dispatched, you will receive an SMS and email with an AWB tracking code. You can also visit our Track Order page or click "Track" under your account orders to see live GPS milestone updates.'
  },
  {
    category: 'Returns',
    question: 'What is Velvora’s 7-day return and replacement policy?',
    answer:
      'We offer a hassle-free 7-day return or replacement window from the delivery date for eligible products. Items must be unused, with tags intact and original packaging. Doorstep quality check and free pickup are provided.'
  },
  {
    category: 'Refunds',
    question: 'When will I receive my refund after a return?',
    answer:
      'Refunds are initiated within 24 hours of successful pickup and verification. For UPI and Debit/Credit cards, it reflects in 2–4 business days. For Cash on Delivery orders, funds are transferred instantly to your verified bank account or Velvora Wallet.'
  },
  {
    category: 'Shipping',
    question: 'What are the delivery charges and delivery times?',
    answer:
      'Delivery is 100% FREE on all prepaid and COD orders above ₹999. Standard delivery takes 2–4 business days across metropolitan areas and 3–6 days for other pincodes. Same-day / Next-day delivery is available in select metro cities.'
  },
  {
    category: 'Payments',
    question: 'What payment methods are supported on Velvora?',
    answer:
      'We accept all major UPI apps (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking across 50+ banks, EMI on credit cards, and Cash on Delivery (COD).'
  },
  {
    category: 'Sellers',
    question: 'How can I sell my products or brand on Velvora?',
    answer:
      'We warmly welcome authentic brands and registered manufacturers! Reach out to our Vendor Acquisition team at partners@velvora.in or select "Seller & Brand Partnership" in the contact form below with your catalog profile.'
  }
];

const OFFICE_LOCATIONS = [
  {
    city: 'Gurugram (Corporate HQ)',
    tag: 'Global Headquarters',
    address: '4th Floor, DLF Cyber Hub, DLF Phase 2, Sector 24, Gurugram, Haryana 122002',
    phone: '+91 (124) 489-0100',
    email: 'hq@velvora.in',
    hours: 'Mon – Fri: 9:00 AM – 7:00 PM IST',
    coordinates: '28.4950° N, 77.0895° E'
  },
  {
    city: 'Mumbai',
    tag: 'Flagship Experience Center',
    address: 'Unit 502, The Capital, G Block, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051',
    phone: '+91 (22) 6920-4400',
    email: 'mumbai.care@velvora.in',
    hours: 'Mon – Sat: 10:00 AM – 8:00 PM IST',
    coordinates: '19.0662° N, 72.8687° E'
  },
  {
    city: 'Bengaluru',
    tag: 'Technology & Fulfillment Hub',
    address: 'Block C, Embassy TechVillage, Outer Ring Road, Devarabisanahalli, Bengaluru, Karnataka 560103',
    phone: '+91 (80) 4120-7700',
    email: 'tech.support@velvora.in',
    hours: 'Mon – Fri: 9:30 AM – 6:30 PM IST',
    coordinates: '12.9279° N, 77.6844° E'
  }
];

const ContactPage = () => {
  const { addToast } = useApp();

  // Form State
  const [selectedCategory, setSelectedCategory] = useState(INQUIRY_CATEGORIES[0].id);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderId, setOrderId] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  // FAQ Filter & Search
  const [faqSearch, setFaqSearch] = useState('');
  const [activeFaqCategory, setActiveFaqCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Active Location Tab
  const [activeLocation, setActiveLocation] = useState(0);

  // Handle simulated file uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (attachedFiles.length + files.length > 3) {
      addToast('Limit Reached', 'You can upload maximum 3 files.');
      return;
    }

    const newFiles = files.map((file) => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type
    }));

    setAttachedFiles((prev) => [...prev, ...newFiles]);
    addToast('File Attached', `${files.length} file(s) added successfully.`);
  };

  const removeFile = (idx) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      addToast('Required Fields Missing', 'Please fill in your name, email, and message.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      addToast('Invalid Email', 'Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      const generatedTicketId = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;
      const newTicket = {
        ticketId: generatedTicketId,
        category: INQUIRY_CATEGORIES.find((c) => c.id === selectedCategory)?.label,
        name: fullName,
        email: email,
        phone: phone || 'Not provided',
        orderId: orderId || 'N/A',
        priority: priority,
        subject: subject || `${INQUIRY_CATEGORIES.find((c) => c.id === selectedCategory)?.label} Query`,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        eta: priority === 'Urgent' ? 'Within 45 minutes' : 'Within 2 hours'
      };

      setIsSubmitting(false);
      setSubmittedTicket(newTicket);
      addToast('Support Ticket Created!', `Ticket #${generatedTicketId} registered.`);

      // Reset form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setOrderId('');
      setSubject('');
      setMessage('');
      setAttachedFiles([]);
    }, 1200);
  };

  const copyTicketId = () => {
    if (!submittedTicket) return;
    navigator.clipboard?.writeText(submittedTicket.ticketId);
    setCopiedTicket(true);
    addToast('Copied to Clipboard', `Ticket ID: ${submittedTicket.ticketId}`);
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  // Filter FAQs
  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      activeFaqCategory === 'All' || faq.category.toLowerCase() === activeFaqCategory.toLowerCase();
    const matchesSearch =
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedCategoryObj = INQUIRY_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Header Bar */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* 2. Main Page Content */}
      <main className="flex-1 pb-16">
        {/* Breadcrumb & Hero Banner */}
        <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden py-14 md:py-20">
          {/* Subtle Background Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-6 font-medium">
              <Link to="/" className="hover:text-white transition flex items-center gap-1">
                Home
              </Link>
              <span>/</span>
              <span className="text-white font-semibold">Contact Us</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                24/7 Priority Support • All Systems Operational
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                We're Here to Help, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-pink-300">
                  Every Step of the Way.
                </span>
              </h1>

              <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed font-normal">
                Have a query regarding your order, doorstep returns, refunds, or looking to partner with Velvora?
                Connect with our dedicated support team or browse instant answers below.
              </p>

              {/* Quick Contact Stats */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                <div>
                  <div className="text-2xl font-black text-white">&lt; 90 sec</div>
                  <div className="text-xs text-slate-400 mt-0.5">Average Live Chat Wait</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">98.6%</div>
                  <div className="text-xs text-slate-400 mt-0.5">First-Contact Resolution</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">24 / 7</div>
                  <div className="text-xs text-slate-400 mt-0.5">Toll-Free Helpline</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">19,000+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Pincodes Supported</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Direct Support Channels (4 Quick Action Cards) */}
        <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Helpline Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-lift transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition duration-300">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                Toll Free
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">Call Our Helpline</h2>
              <p className="text-xs text-slate-500 mt-1">Available 24x7 in English, Hindi & 6 regional languages.</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-1">
                <a
                  href="tel:18004190000"
                  className="text-base font-extrabold text-slate-900 hover:text-brand-600 transition flex items-center gap-1.5"
                >
                  1800-419-0000
                </a>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live agents available
                </span>
              </div>
            </div>

            {/* Live Chat Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-lift transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition duration-300">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Fastest Response
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">Instant Live Chat</h2>
              <p className="text-xs text-slate-500 mt-1">Chat directly with Velvora AI & human specialists.</p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    const chatBtn = document.querySelector('button[aria-label="Open support chat"]');
                    if (chatBtn) chatBtn.click();
                    else addToast('Chat Opened', 'Click the chat bubble on the bottom right.');
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition"
                >
                  <MessageSquare className="w-4 h-4" /> Start Live Chat
                </button>
              </div>
            </div>

            {/* Email Support Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-lift transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Official Mail
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">Email Customer Care</h2>
              <p className="text-xs text-slate-500 mt-1">Detailed resolutions within 2 to 4 business hours.</p>
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-1">
                <a
                  href="mailto:care@velvora.in"
                  className="text-sm font-extrabold text-slate-900 hover:text-indigo-600 transition truncate"
                >
                  care@velvora.in
                </a>
                <span className="text-[11px] text-slate-500 font-medium">B2B: partners@velvora.in</span>
              </div>
            </div>

            {/* Corporate Office Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card hover:shadow-lift transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                Headquarters
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-2">Visit Our HQ</h2>
              <p className="text-xs text-slate-500 mt-1">4th Floor, DLF Cyber Hub, Gurugram, Haryana</p>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <a
                  href="#locations"
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group-hover:underline"
                >
                  View all 3 Experience Hubs <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Form & Ticket Creation Section */}
        <section className="max-w-7xl mx-auto px-4 mt-14 md:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Interactive Ticket / Inquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Submit an Inquiry</h2>
                  <p className="text-slate-500 text-xs md:text-sm mt-1">
                    Fill out the form below. We'll generate an official tracking ticket instantly.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Privacy Protected
                </div>
              </div>

              {/* Success Banner if Ticket Created */}
              {submittedTicket && (
                <div className="my-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-800 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-base text-emerald-950">Inquiry Submitted Successfully!</h3>
                          <span className="text-[11px] font-bold bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                          Your ticket ID is{' '}
                          <strong className="text-emerald-950 font-black tracking-wider">
                            {submittedTicket.ticketId}
                          </strong>
                          . A confirmation email has been sent to <strong>{submittedTicket.email}</strong>.
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                          <button
                            type="button"
                            onClick={copyTicketId}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-300 rounded-lg font-bold text-emerald-900 hover:bg-emerald-100 transition"
                          >
                            {copiedTicket ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-700" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" /> Copy Ticket ID
                              </>
                            )}
                          </button>
                          <span className="text-emerald-700">Estimated response: {submittedTicket.eta}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmittedTicket(null)}
                      className="text-emerald-600 hover:text-emerald-900 text-sm font-bold p-1"
                      title="Dismiss notification"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                {/* 1. Category Selection Pills */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    1. Select Inquiry Topic <span className="text-sale">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {INQUIRY_CATEGORIES.map((cat) => {
                      const IconComp = cat.icon;
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`p-3 rounded-xl border text-left transition flex flex-col gap-1.5 relative ${
                            isSelected
                              ? 'border-brand-600 bg-brand-50/70 text-brand-900 shadow-sm ring-1 ring-brand-600'
                              : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <IconComp
                              className={`w-4 h-4 ${isSelected ? 'text-brand-600' : 'text-slate-500'}`}
                            />
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
                            )}
                          </div>
                          <span className="text-xs font-bold leading-tight">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {selectedCategoryObj && (
                    <p className="text-[11px] text-slate-500 mt-2 italic flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-600" />
                      Topic Focus: {selectedCategoryObj.description}
                    </p>
                  )}
                </div>

                {/* 2. Personal Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-sale">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-sale">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2.5 text-xs font-bold bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl text-slate-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength="10"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-sm px-4 py-2.5 rounded-r-xl border border-slate-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Order ID {selectedCategoryObj?.orderRequired ? <span className="text-sale">*</span> : '(Optional)'}
                    </label>
                    <input
                      type="text"
                      required={selectedCategoryObj?.orderRequired}
                      placeholder="e.g. VEL-98214"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition bg-white uppercase"
                    />
                  </div>
                </div>

                {/* 3. Priority Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Priority / Urgency
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: 'Normal', note: 'Standard response within 2 hours', color: 'border-slate-300 bg-white' },
                      { label: 'High', note: 'Expedited review within 1 hour', color: 'border-amber-400 bg-amber-50/50' },
                      { label: 'Urgent', note: 'Delivery or payment blocked', color: 'border-rose-400 bg-rose-50/50' }
                    ].map((p) => (
                      <label
                        key={p.label}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs cursor-pointer transition ${
                          priority === p.label
                            ? 'border-brand-600 bg-brand-50 text-brand-900 font-bold ring-1 ring-brand-600'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                        }`}
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={p.label}
                          checked={priority === p.label}
                          onChange={() => setPriority(p.label)}
                          className="text-brand-600 focus:ring-brand-500"
                        />
                        <span>{p.label}</span>
                        <span className="text-[10px] text-slate-400 hidden sm:inline">({p.note})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject / Summary
                  </label>
                  <input
                    type="text"
                    placeholder="Brief summary of your query"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition bg-white"
                  />
                </div>

                {/* 5. Message Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Detailed Message <span className="text-sale">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">{message.length}/1000 characters</span>
                  </div>
                  <textarea
                    required
                    rows="4"
                    maxLength="1000"
                    placeholder="Please describe your query in detail. Include any relevant timeline, product variant, or delivery concerns..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-sm p-4 rounded-xl border border-slate-300 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition bg-white resize-y"
                  ></textarea>
                </div>

                {/* 6. File Attachments (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Attachments (Optional - Receipts, Photos, Screenshots)
                  </label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-brand-500 rounded-2xl p-4 text-center transition bg-slate-50/50">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
                    >
                      <Upload className="w-6 h-6 text-slate-400" />
                      <span className="text-xs font-bold text-brand-600 hover:underline">
                        Click to upload screenshots or invoices
                      </span>
                      <span className="text-[11px] text-slate-400">PNG, JPG, PDF up to 10MB (Max 3 files)</span>
                    </label>
                  </div>

                  {attachedFiles.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      {attachedFiles.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-700"
                        >
                          <span className="truncate flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-slate-500" /> {f.name} ({f.size})
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="text-rose-500 hover:text-rose-700 font-bold ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 7. WhatsApp Updates Checkbox */}
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="whatsapp-updates"
                    checked={whatsappConsent}
                    onChange={(e) => setWhatsappConsent(e.target.checked)}
                    className="mt-1 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <label htmlFor="whatsapp-updates" className="text-xs text-slate-600 cursor-pointer leading-normal">
                    Get ticket progress updates & instant courier tracking alerts on WhatsApp for faster communication.
                  </label>
                </div>

                {/* 8. Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-brand-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-sm hover:shadow-md transition duration-200 disabled:opacity-50 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Registering Ticket...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Inquiry & Generate Ticket
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2.5">
                    🔒 Protected under Velvora Consumer Grievance Protocol & Privacy Charter 2026
                  </p>
                </div>
              </form>
            </div>

            {/* Right 5 Columns: Operating Hours, Escalation Matrix & Direct Contacts */}
            <div className="lg:col-span-5 space-y-6">
              {/* Working Hours Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Support Working Hours</h3>
                    <p className="text-xs text-slate-500">Standard Indian Time (IST)</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">Toll-Free Phone Helpline</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      24 Hours / 7 Days
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">Live Web & App Chat</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      24 Hours / 7 Days
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">Email & Grievance Desk</span>
                    <span className="font-medium text-slate-600">8:00 AM – 10:00 PM IST</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="font-semibold text-slate-700">Experience Flagships</span>
                    <span className="font-medium text-slate-600">10:00 AM – 8:00 PM (Mon-Sat)</span>
                  </div>
                </div>
              </div>

              {/* Grievance Officer & Legal Escalation */}
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                  <ShieldCheck className="w-48 h-48 text-white" />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                    Statutory Grievance Redressal
                  </span>
                  <h3 className="text-lg font-black mt-2 text-white">Consumer Grievance Officer</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    In accordance with Information Technology Act 2000 and Consumer Protection (E-Commerce) Rules 2020:
                  </p>

                  <div className="mt-4 bg-white/10 rounded-2xl p-4 backdrop-blur-sm space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Officer In-Charge:</span>
                      <strong className="text-white">Mr. Anirudh Singhania</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Direct Grievance Email:</span>
                      <a href="mailto:grievance@velvora.in" className="text-indigo-300 underline font-bold">
                        grievance@velvora.in
                      </a>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Acknowledgement Timelines:</span>
                      <span className="text-emerald-300 font-semibold">Acknowledged within 48 hours</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Dispute Resolution Window:</span>
                      <span className="text-slate-200">Within 30 business days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Support Connect */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-black text-slate-900 text-sm">Need a quick reply on WhatsApp?</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Connect with our verified WhatsApp business assistant for order status.
                  </p>
                  <a
                    href="https://wa.me/9118004190000?text=Hi%20Velvora%2C%20I%20need%20help%20with%20my%20order"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Open WhatsApp Chat
                  </a>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Frequently Asked Questions (Interactive Accordion & Search) */}
        <section className="max-w-7xl mx-auto px-4 mt-16 md:mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-brand-600 uppercase bg-brand-50 px-3 py-1 rounded-full">
              Quick Self-Help Answers
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Find instant solutions for tracking, returns, cancellations, and payments without waiting in queue.
            </p>

            {/* FAQ Search Bar */}
            <div className="mt-6 relative max-w-md mx-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search queries (e.g. refund, return, pincode)..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-slate-200 text-sm focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none bg-white shadow-sm"
              />
              {faqSearch && (
                <button
                  type="button"
                  onClick={() => setFaqSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs font-semibold">
              {['All', 'Orders', 'Returns', 'Refunds', 'Shipping', 'Payments', 'Sellers'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFaqCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full transition ${
                    activeFaqCategory === cat
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800 text-base">No matching questions found</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Try searching for something else or submit an inquiry using our form above.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFaqSearch('');
                    setActiveFaqCategory('All');
                  }}
                  className="mt-3 text-xs font-bold text-brand-600 hover:underline"
                >
                  Reset FAQ filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition shadow-sm hover:border-slate-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-brand-600 transition"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0"></span>
                        {faq.question}
                      </span>
                      <span className="text-slate-400 shrink-0">
                        {isOpen ? <ChevronUp className="w-5 h-5 text-brand-600" /> : <ChevronDown className="w-5 h-5" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/30">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* 6. Physical Hubs & Experience Centers */}
        <section id="locations" className="max-w-7xl mx-auto px-4 mt-16 md:mt-24">
          <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 relative overflow-hidden">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-white/10 px-3 py-1 rounded-full">
                Visit Our Centers
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
                Experience Hubs & Corporate Offices
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Experience our newest product collections in person, meet with our corporate procurement team, or
                collect your orders at our flagship lounges.
              </p>
            </div>

            {/* City Selector Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
              {OFFICE_LOCATIONS.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLocation(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    activeLocation === idx
                      ? 'bg-brand-600 text-white shadow-md'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  {loc.city.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Active Hub Details */}
            {OFFICE_LOCATIONS[activeLocation] && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-block text-[11px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                    {OFFICE_LOCATIONS[activeLocation].tag}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {OFFICE_LOCATIONS[activeLocation].city}
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{OFFICE_LOCATIONS[activeLocation].address}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{OFFICE_LOCATIONS[activeLocation].hours}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                      <a
                        href={`tel:${OFFICE_LOCATIONS[activeLocation].phone.replace(/[^\d+]/g, '')}`}
                        className="hover:text-white underline font-semibold"
                      >
                        {OFFICE_LOCATIONS[activeLocation].phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                      <a
                        href={`mailto:${OFFICE_LOCATIONS[activeLocation].email}`}
                        className="hover:text-white underline font-semibold"
                      >
                        {OFFICE_LOCATIONS[activeLocation].email}
                      </a>
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        OFFICE_LOCATIONS[activeLocation].address
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition"
                    >
                      <MapPin className="w-3.5 h-3.5 text-brand-600" /> Open in Google Maps
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(OFFICE_LOCATIONS[activeLocation].address);
                        addToast('Address Copied', OFFICE_LOCATIONS[activeLocation].address);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/10"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy Full Address
                    </button>
                  </div>
                </div>

                {/* Simulated Visual Map Preview / Floor Plan Graphic */}
                <div className="lg:col-span-5 bg-slate-800 rounded-xl p-4 border border-white/10 text-center relative overflow-hidden group">
                  <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-indigo-900/60 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 border border-white/5 relative">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-brand-600/30 border-2 border-brand-400 flex items-center justify-center animate-bounce mb-2">
                        <MapPin className="w-6 h-6 text-brand-400" />
                      </div>
                      <span className="text-white font-extrabold text-sm">
                        {OFFICE_LOCATIONS[activeLocation].city.split(' ')[0]} Hub
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {OFFICE_LOCATIONS[activeLocation].coordinates}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Valet Parking Available</span>
                    <span className="text-emerald-400 font-semibold">● Wheelchair Accessible</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 7. Reassurance / Trust Strip */}
        <section className="max-w-7xl mx-auto px-4 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">100% Buyer Protection</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Every product shipped is verified by our quality specialists with tamper-proof security seals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Instant Doorstep Refunds</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  No questions asked returns within 7 days. Refund initiated instantly upon pickup verification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Dedicated Relationship Manager</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Velvora Prime members receive priority routing to dedicated senior account managers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* 5. Floating Action Buttons (Chat & Back To Top) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-3 items-end">
        <BackToTop />
        <ChatWidget />
      </div>

      {/* 6. Context Modals */}
      <LoginModal />
      <LocationModal />
      <MobileMenuDrawer />
      <CompareBar />
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
