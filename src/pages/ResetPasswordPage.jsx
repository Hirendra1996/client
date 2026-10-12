import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ToastContainer from '../components/widgets/ToastContainer';
import ChatWidget from '../components/widgets/ChatWidget';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const { resetPassword, resetTokenInfo } = useApp();

  const queryIdentifier = searchParams.get('identifier') || '';
  const queryCode = searchParams.get('code') || token || '';

  const [identifier, setIdentifier] = useState(queryIdentifier || resetTokenInfo?.identifier || '');
  const [code, setCode] = useState(queryCode || resetTokenInfo?.code || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (queryCode) setCode(queryCode);
    if (queryIdentifier) setIdentifier(queryIdentifier);
  }, [queryCode, queryIdentifier]);

  const handleReset = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = resetPassword({
        identifier,
        code,
        newPassword
      });
      setIsLoading(false);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(res.error || 'Failed to reset password');
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
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-emerald-500" />

            {/* Header */}
            <div className="text-center mb-6">
              <span className="w-12 h-12 rounded-2xl bg-brand-600 text-white grid place-items-center text-2xl mx-auto shadow-md mb-3">
                🔒
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Reset Password
              </h1>
              <p className="text-slate-500 text-xs md:text-sm mt-1">
                Enter your verification code and choose a new secure password.
              </p>
            </div>

            {/* Error banner */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-sale text-xs font-semibold px-4 py-3 rounded-2xl mb-4 flex items-center gap-2">
                <span>⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success View */}
            {isSuccess ? (
              <div className="space-y-5 text-center">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-emerald-800">
                  <span className="text-3xl mb-2 block">🎉</span>
                  <h4 className="font-extrabold text-base text-emerald-900">
                    Password Reset Successfully!
                  </h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    Your password has been securely updated. You can now sign in with your new credentials.
                  </p>
                </div>

                <Link
                  to="/login"
                  className="w-full inline-block bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-3.5 rounded-xl transition shadow-md text-sm"
                >
                  SIGN IN TO YOUR ACCOUNT →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleReset} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email or Mobile
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="name@email.com or 10-digit mobile"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    6-Digit Verification Code (OTP)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit code"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-2.5 text-xs md:text-sm font-mono font-bold tracking-widest outline-none transition"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">New Password</label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold outline-none transition pr-12"
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-extrabold py-3.5 rounded-xl transition shadow-lg shadow-brand-600/25 text-sm mt-1"
                >
                  {isLoading ? 'UPDATING PASSWORD...' : 'RESET PASSWORD'}
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

export default ResetPasswordPage;
