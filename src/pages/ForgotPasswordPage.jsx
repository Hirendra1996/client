import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ToastContainer from '../components/widgets/ToastContainer';
import ChatWidget from '../components/widgets/ChatWidget';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [sentCode, setSentCode] = useState('');

  const handleForgot = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = forgotPassword(identifier);
      setIsLoading(false);
      if (res.success) {
        setSentCode(res.code);
      } else {
        setErrorMsg(res.error || 'Failed to send verification code');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-card relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

            {/* Header */}
            <div className="text-center mb-6">
              <span className="w-12 h-12 rounded-2xl bg-amber-500 text-white grid place-items-center text-2xl mx-auto shadow-md mb-3">
                🔑
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Forgot Password?
              </h1>
              <p className="text-slate-500 text-xs md:text-sm mt-1">
                Enter your registered email or phone to reset your password.
              </p>
            </div>

            {/* Error banner */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-sale text-xs font-semibold px-4 py-3 rounded-2xl mb-4 flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success state */}
            {sentCode ? (
              <div className="space-y-5 text-center">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-800">
                  <span className="text-2xl mb-1 block">📨</span>
                  <h4 className="font-extrabold text-sm text-emerald-900">
                    Verification Code Sent!
                  </h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    We've sent a 6-digit code to <b>{identifier}</b>.
                  </p>
                  <div className="mt-3 p-2.5 bg-white border border-emerald-200 rounded-xl font-mono text-base font-black tracking-widest text-slate-900">
                    {sentCode}
                  </div>
                  <p className="text-[11px] text-emerald-600 mt-1">
                    Valid for 15 minutes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/reset-password?identifier=${encodeURIComponent(identifier)}&code=${sentCode}`)}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-3.5 rounded-xl transition shadow-md text-sm"
                >
                  CONTINUE TO SET NEW PASSWORD →
                </button>

                <p className="text-xs text-slate-500">
                  Didn't receive code?{' '}
                  <button
                    type="button"
                    onClick={handleForgot}
                    className="text-brand-600 font-bold hover:underline"
                  >
                    Resend Code
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgot} className="space-y-4">
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-extrabold py-3.5 rounded-xl transition shadow-lg shadow-brand-600/25 text-sm"
                >
                  {isLoading ? 'SENDING CODE...' : 'SEND VERIFICATION CODE'}
                </button>
              </form>
            )}

            <p className="text-center text-xs text-slate-500 mt-6">
              Remember your password?{' '}
              <Link to="/login" className="text-brand-600 font-extrabold hover:underline">
                Back to Sign In
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

export default ForgotPasswordPage;
