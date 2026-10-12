import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ToastContainer from '../components/widgets/ToastContainer';
import ChatWidget from '../components/widgets/ChatWidget';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already logged in
  if (user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1 max-w-lg mx-auto w-full px-4 py-16 text-center">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <span className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 text-3xl grid place-items-center mx-auto mb-4">
              ✓
            </span>
            <h2 className="text-2xl font-black text-slate-900">You are already signed in</h2>
            <p className="text-slate-500 text-sm mt-1">
              Logged in as <b className="text-slate-800">{user.name}</b> ({user.email || user.phone})
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <Link
                to="/products"
                className="bg-brand-600 text-white font-bold text-xs px-6 py-3 rounded-full hover:bg-brand-700 transition"
              >
                Browse Products
              </Link>
              <Link
                to="/"
                className="bg-slate-100 text-slate-800 font-bold text-xs px-6 py-3 rounded-full hover:bg-slate-200 transition"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login({ identifier, password });
      setIsLoading(false);
      if (res.success) {
        navigate('/products');
      } else {
        setErrorMsg(res.error || 'Invalid credentials');
      }
    }, 500);
  };

  const handleDemoLogin = () => {
    setIdentifier('user@velvora.com');
    setPassword('password123');
    const res = login({ identifier: 'user@velvora.com', password: 'password123' });
    if (res.success) {
      navigate('/products');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-card relative overflow-hidden">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600" />

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white grid place-items-center font-black text-2xl mx-auto shadow-md mb-3">
                V
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-slate-500 text-xs md:text-sm mt-1">
                Sign in to access your orders, wishlist, and recommendations.
              </p>
            </div>

            {/* Error banner */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-sale text-xs font-semibold px-4 py-3 rounded-2xl mb-5 flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@email.com or 10-digit mobile"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold outline-none transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold outline-none transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-brand-600 rounded"
                  />
                  <span>Remember me on this device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-extrabold py-3.5 rounded-xl transition shadow-lg shadow-brand-600/25 text-sm"
              >
                {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </form>

            {/* Quick Demo Credentials */}
            <div className="mt-5 p-3 bg-brand-50/70 border border-brand-100 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-brand-900">Need a quick demo?</p>
                <p className="text-[11px] text-brand-600">user@velvora.com / password123</p>
              </div>
              <button
                type="button"
                onClick={handleDemoLogin}
                className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition"
              >
                Auto Fill
              </button>
            </div>

            {/* Switch to Register */}
            <p className="text-center text-xs text-slate-500 mt-6">
              Don't have an account yet?{' '}
              <Link to="/register" className="text-brand-600 font-extrabold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer />
      <ChatWidget />
    </div>
  );
};

export default LoginPage;
