import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Bell,
  RefreshCw,
  Mail,
  Phone,
  ChevronRight,
  Database,
  KeyRound,
  Trash2,
  AlertCircle
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

const SECTIONS = [
  { id: 'introduction', title: '1. Introduction & Overview' },
  { id: 'collection', title: '2. Information We Collect' },
  { id: 'usage', title: '3. How We Use Your Information' },
  { id: 'security', title: '4. Payment & Data Security' },
  { id: 'sharing', title: '5. Third-Party Disclosures & Logistics' },
  { id: 'cookies', title: '6. Cookies & Tracking Technologies' },
  { id: 'retention', title: '7. Data Retention & Account Deletion' },
  { id: 'rights', title: '8. Your Rights Under DPDP Act 2023' },
  { id: 'children', title: '9. Children’s Privacy' },
  { id: 'grievance', title: '10. Grievance Officer & Contact Details' }
];

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const scrollTo = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Navigation */}
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
              <span className="text-white font-semibold">Privacy Policy</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                DPDP ACT 2023 &amp; IT ACT 2000 COMPLIANT • UPDATED OCTOBER 2026
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Velvora Privacy Policy
              </h1>

              <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                At Velvora (Velvora Retail Pvt. Ltd.), safeguarding your personal data and maintaining strict
                transparency about how your information is gathered, secured, and utilized is central to our values.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Quick Highlights Strip */}
        <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Zero Data Selling</h3>
              <p className="text-xs text-slate-500 mt-1">
                We never monetize, rent, or sell your personal details to third-party brokers or advertisers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">256-Bit SSL Encryption</h3>
              <p className="text-xs text-slate-500 mt-1">
                All card and UPI transactions use RBI-mandated PCI-DSS tokenization protocols.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Full Data Sovereignty</h3>
              <p className="text-xs text-slate-500 mt-1">
                Request a complete export of your user data or initiate account erasure at any time.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Opt-In Communications</h3>
              <p className="text-xs text-slate-500 mt-1">
                You control WhatsApp, email, and SMS marketing alerts with one-click toggles.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Policy Content & Table of Contents */}
        <section className="max-w-7xl mx-auto px-4 mt-12 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Sticky TOC */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
                  Table of Contents
                </h2>
                <nav className="space-y-1 text-xs font-semibold">
                  {SECTIONS.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollTo(sec.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between ${
                        activeSection === sec.id
                          ? 'bg-brand-50 text-brand-600 font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate">{sec.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <p className="text-[11px] text-slate-400 mb-2">Need legal clarification?</p>
                  <a
                    href="mailto:privacy@velvora.in"
                    className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" /> privacy@velvora.in
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Policy Text */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm">
              {/* Section 1 */}
              <div id="introduction" className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  1. Introduction &amp; Overview
                </h2>
                <p className="mt-3">
                  This Privacy Policy applies to the website <strong>velvora.in</strong>, associated mobile applications,
                  and all services operated by <strong>Velvora Retail Pvt. Ltd.</strong> ("Velvora", "we", "us", or "our"),
                  having its registered corporate office at 4th Floor, DLF Cyber Hub, Gurugram, Haryana 122002, India.
                </p>
                <p className="mt-3">
                  By accessing, browsing, registering on our platform, or purchasing products through Velvora, you
                  expressly consent to the collection, storage, processing, and disclosure of your information in accordance
                  with this Privacy Policy and Indian data protection statutes, including the Digital Personal Data
                  Protection Act (DPDP Act) 2023.
                </p>
              </div>

              {/* Section 2 */}
              <div id="collection" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  2. Information We Collect
                </h2>
                <p className="mt-3">
                  We gather the following categories of information to provide you with seamless shopping and doorstep
                  fulfillment services:
                </p>
                <ul className="mt-4 space-y-3 pl-4 border-l-2 border-brand-500">
                  <li>
                    <strong className="text-slate-900">Personal Identification Data:</strong> Full name, verified email
                    address, mobile number, delivery addresses, billing addresses, and pincodes.
                  </li>
                  <li>
                    <strong className="text-slate-900">Transaction &amp; Order Details:</strong> Products purchased,
                    order quantities, timestamps, invoice numbers, warranty registrations, and return requests.
                  </li>
                  <li>
                    <strong className="text-slate-900">Technical &amp; Device Information:</strong> IP address, device
                    browser type, operating system, network identifiers, and localized session logs.
                  </li>
                  <li>
                    <strong className="text-slate-900">Customer Support Records:</strong> Ticket logs, email
                    correspondence, audio recordings of helpline calls (for quality assurance), and chat transcripts.
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div id="usage" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  3. How We Use Your Information
                </h2>
                <p className="mt-3">Your information is utilized solely for legitimate operational purposes:</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">📦 Order Fulfillment</span>
                    Dispatching parcels, coordinating courier deliveries, and sending live tracking updates.
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">💳 Payments &amp; Refunds</span>
                    Facilitating tokenized payments, fraud screening, and doorstep refund processing.
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">💬 Customer Service</span>
                    Resolving inquiries, managing warranty claims, and servicing replacement requests.
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">⚖️ Statutory Compliance</span>
                    Fulfilling mandatory tax filings (GST), anti-fraud audits, and court subpoenas.
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div id="security" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  4. Payment &amp; Data Security
                </h2>
                <p className="mt-3">
                  Velvora implements stringent technical, physical, and organizational safeguards to protect your personal
                  data against unauthorized access, loss, or misuse:
                </p>
                <div className="mt-4 p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs text-indigo-950 space-y-2">
                  <p className="font-bold">🔒 Payment Card Security Note:</p>
                  <p>
                    Velvora <strong>never stores your raw credit/debit card numbers or CVV codes</strong> on our servers.
                    All payment processing is handled through RBI-licensed payment aggregators (e.g. Razorpay, Cashfree,
                    PayU) adhering strictly to PCI-DSS Level 1 compliance and card tokenization guidelines.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div id="sharing" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  5. Third-Party Disclosures &amp; Logistics
                </h2>
                <p className="mt-3">
                  We do not sell your personal data. We disclose limited details only to trusted partners strictly bound by
                  confidentiality agreements for the execution of your orders:
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                  <li>
                    <strong>Courier &amp; Logistics Partners:</strong> (e.g., Delhivery, Blue Dart, Xpressbees) to enable
                    physical parcel delivery and return pickup.
                  </li>
                  <li>
                    <strong>Payment Gateways &amp; Banks:</strong> For real-time authentication and settlement of financial transactions.
                  </li>
                  <li>
                    <strong>Authorized Brand Manufacturers:</strong> For warranty registration and direct manufacturer warranty claims.
                  </li>
                </ul>
              </div>

              {/* Section 6 */}
              <div id="cookies" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  6. Cookies &amp; Tracking Technologies
                </h2>
                <p className="mt-3">
                  We use cookies, web beacons, and local storage tokens to preserve session items in your shopping bag,
                  maintain your login state, and evaluate platform performance. You can disable non-essential cookies via
                  your browser settings at any time without impacting order checkout functionality.
                </p>
              </div>

              {/* Section 7 */}
              <div id="retention" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  7. Data Retention &amp; Account Deletion
                </h2>
                <p className="mt-3">
                  We retain personal information only for as long as required to fulfill the purposes set out in this
                  policy or to satisfy legal, taxation (GST rules require 6-year invoice retention), or regulatory
                  obligations.
                </p>
                <p className="mt-2">
                  To request account deletion or data anonymization, you can submit a ticket on our{' '}
                  <Link to="/contact" className="text-brand-600 font-bold hover:underline">
                    Contact Us page
                  </Link>{' '}
                  or email <strong>privacy@velvora.in</strong>. Requests are processed within 15 business days.
                </p>
              </div>

              {/* Section 8 */}
              <div id="rights" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  8. Your Rights Under DPDP Act 2023
                </h2>
                <p className="mt-3">
                  Under the Digital Personal Data Protection Act 2023, you hold the following statutory rights:
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-0.5">Right to Access:</strong>
                    Obtain a summary of personal data held by us and third-party recipients.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-0.5">Right to Correction:</strong>
                    Request immediate rectification of inaccurate or outdated information.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-0.5">Right to Erasure:</strong>
                    Request deletion of your data where retention is no longer legally required.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-0.5">Right of Grievance Redressal:</strong>
                    File a formal complaint with our Grievance Officer and Data Protection Board.
                  </div>
                </div>
              </div>

              {/* Section 9 */}
              <div id="children" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  9. Children’s Privacy
                </h2>
                <p className="mt-3">
                  Our platform is intended for individuals aged 18 and older. If you are under 18, you may use Velvora only
                  under the supervision of a parent or legal guardian. We do not knowingly collect personal data from
                  minors without verifiable parental consent.
                </p>
              </div>

              {/* Section 10 */}
              <div id="grievance" className="scroll-mt-24 pt-6 border-t border-slate-100">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  10. Grievance Officer &amp; Contact Details
                </h2>
                <p className="mt-3">
                  In compliance with Rule 5(9) of the Information Technology (Intermediary Guidelines) Rules 2011 and DPDP
                  Act 2023, the details of our Grievance Officer are provided below:
                </p>

                <div className="mt-4 bg-slate-900 text-white p-6 rounded-2xl space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Name of Grievance Officer:</span>
                    <strong className="text-white text-sm">Mr. Anirudh Singhania</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Designation:</span>
                    <span>Chief Compliance &amp; Grievance Officer</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Postal Address:</span>
                    <span>Velvora Retail Pvt. Ltd., 4th Floor, DLF Cyber Hub, Gurugram, Haryana 122002</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Official Grievance Email:</span>
                    <a href="mailto:grievance@velvora.in" className="text-indigo-300 font-bold underline">
                      grievance@velvora.in
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Support Helpline:</span>
                    <a href="tel:18004190000" className="text-white font-bold">
                      1800-419-0000 (Toll Free, 24x7)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Layout Footer & Modals */}
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

export default PrivacyPolicyPage;
