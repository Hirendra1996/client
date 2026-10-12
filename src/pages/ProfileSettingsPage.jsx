import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Lock,
  Bell,
  ShieldCheck,
  CheckCircle2,
  Save,
  Trash2,
  KeyRound
} from 'lucide-react';

import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import CategoryNav from '../components/layout/CategoryNav';
import Footer from '../components/layout/Footer';
import MobileBottomNav from '../components/layout/MobileBottomNav';
import AccountSidebar from '../components/layout/AccountSidebar';

import LoginModal from '../components/modals/LoginModal';
import LocationModal from '../components/modals/LocationModal';
import MobileMenuDrawer from '../components/modals/MobileMenuDrawer';

import ChatWidget from '../components/widgets/ChatWidget';
import BackToTop from '../components/widgets/BackToTop';
import ToastContainer from '../components/widgets/ToastContainer';
import CompareBar from '../components/widgets/CompareBar';

import { useApp } from '../context/AppContext';

const ProfileSettingsPage = () => {
  const { user, updateProfile, resetPassword, logout, addToast } = useApp();

  // Profile Info state
  const [name, setName] = useState(user?.name || 'Rahul Sharma');
  const [email, setEmail] = useState(user?.email || 'user@velvora.com');
  const [phone, setPhone] = useState(user?.phone || '9876543210');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1996-08-15');

  // Password change state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // Notification toggles
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailNews, setEmailNews] = useState(true);
  const [smsDelivery, setSmsDelivery] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!newPass || !confirmPass) {
      addToast('Missing Password', 'Please enter new password.');
      return;
    }
    if (newPass !== confirmPass) {
      addToast('Mismatch', 'New passwords do not match.');
      return;
    }
    resetPassword({ identifier: email, code: '', newPassword: newPass });
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your Velvora account? This action cannot be undone.')) {
      logout();
      addToast('Account Deleted', 'Your account has been deactivated.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Header */}
      <AnnouncementBar />
      <Navbar />
      <CategoryNav />

      {/* 2. Main Content */}
      <main className="flex-1 pb-20">
        {/* Breadcrumb banner */}
        <section className="bg-white border-b border-slate-200/80 py-5">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link to="/" className="hover:text-brand-600 transition">Home</Link>
              <span>/</span>
              <Link to="/account" className="hover:text-brand-600 transition">My Account</Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">Profile Settings</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Profile &amp; Account Settings
            </h1>
          </div>
        </section>

        {/* Content Layout */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar (4 cols) */}
            <aside className="lg:col-span-4">
              <AccountSidebar />
            </aside>

            {/* Profile Forms (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Personal Information Form */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <User className="w-5 h-5 text-brand-600" />
                  <h2 className="font-extrabold text-base text-slate-900">Personal Information</h2>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:border-brand-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:border-brand-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Mobile Number (+91)</label>
                      <input
                        type="tel"
                        required
                        maxLength="10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:border-brand-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Gender</label>
                      <div className="flex gap-2">
                        {['Male', 'Female', 'Other'].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGender(g)}
                            className={`flex-1 py-3 rounded-xl font-bold border transition ${
                              gender === g
                                ? 'bg-slate-900 text-white border-slate-900'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
                    >
                      <Save className="w-4 h-4" /> Save Profile Details
                    </button>
                  </div>
                </form>
              </div>

              {/* Password & Security Card */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <KeyRound className="w-5 h-5 text-indigo-600" />
                  <h2 className="font-extrabold text-base text-slate-900">Change Password &amp; Security</h2>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">New Password</label>
                      <input
                        type="password"
                        required
                        placeholder="At least 6 characters"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:border-brand-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Re-type new password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:border-brand-600 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition shadow-sm"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              {/* Notifications Preferences */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4 text-xs">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                  <Bell className="w-5 h-5 text-amber-500" />
                  <h2 className="font-extrabold text-base text-slate-900">Communication &amp; Alerts</h2>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <strong className="text-slate-900 block text-xs">WhatsApp Order &amp; Delivery Tracking</strong>
                      <span className="text-slate-500 text-[11px]">Receive live parcel milestone tracking notifications on WhatsApp</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={whatsappAlerts}
                      onChange={(e) => setWhatsappAlerts(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <strong className="text-slate-900 block text-xs">Email Promotional Newsletters &amp; Offers</strong>
                      <span className="text-slate-500 text-[11px]">Exclusive VIP discounts and festive season promotions</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailNews}
                      onChange={(e) => setEmailNews(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-600"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <strong className="text-slate-900 block text-xs">SMS OTP &amp; Delivery Alerts</strong>
                      <span className="text-slate-500 text-[11px]">Transaction verifications and doorstep courier OTPs</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsDelivery}
                      onChange={(e) => setSmsDelivery(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-600"
                    />
                  </div>
                </div>
              </div>

              {/* Account Deletion Danger Zone */}
              <div className="bg-rose-50/50 rounded-3xl p-6 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <strong className="text-rose-950 font-black block text-sm">Danger Zone: Delete Account</strong>
                  <p className="text-rose-700 mt-0.5">
                    Permanently delete your Velvora account, orders history, and saved addresses.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="px-4 py-2.5 bg-white border border-rose-300 text-rose-600 hover:bg-rose-600 hover:text-white font-bold rounded-xl transition shrink-0"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 3. Footer */}
      <Footer />
      <MobileBottomNav />

      {/* 4. Widgets */}
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

export default ProfileSettingsPage;
