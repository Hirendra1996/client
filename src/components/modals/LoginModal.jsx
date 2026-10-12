import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const LoginModal = () => {
  const {
    isLoginOpen,
    setIsLoginOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    forgotPassword,
    resetPassword,
    addToast
  } = useApp();

  const [mode, setMode] = useState(authModalMode || 'login'); // 'login' | 'register' | 'forgot' | 'reset'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form Fields
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // Sync mode with context
  useEffect(() => {
    if (authModalMode) {
      setMode(authModalMode);
    }
  }, [authModalMode]);

  // Reset errors on mode change
  useEffect(() => {
    setErrorMsg('');
  }, [mode]);

  if (!isLoginOpen) return null;

  // Handle Demo Login
  const handleQuickDemo = () => {
    setIdentifier('user@velvora.com');
    setPassword('password123');
    login({ identifier: 'user@velvora.com', password: 'password123' });
  };

  // Submit Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login({ identifier, password });
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || 'Invalid credentials');
      }
    }, 500);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = register({ name, email, phone, password });
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || 'Registration failed');
      }
    }, 500);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const res = forgotPassword(identifier || email);
      setIsLoading(false);
      if (res.success) {
        setGeneratedCode(res.code);
        setResetCode(res.code); // auto-fill for convenience
        setMode('reset');
      } else {
        setErrorMsg(res.error || 'User not found');
      }
    }, 500);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('New passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = resetPassword({
        identifier: identifier || email,
        code: resetCode,
        newPassword: password
      });
      setIsLoading(false);
      if (res.success) {
        setMode('login');
        setPassword('');
        setConfirmPassword('');
      } else {
        setErrorMsg(res.error || 'Invalid verification code');
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsLoginOpen(false)}
      />

      {/* Modal panel */}
      <div className="relative bg-white rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl z-10 border border-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsLoginOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center transition text-slate-500 font-bold"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-11 h-11 rounded-2xl bg-brand-600 text-white grid place-items-center font-black text-xl shadow-md">
            V
          </span>
          <div>
            <h2 className="font-extrabold text-lg text-slate-900 tracking-tight">VELVORA</h2>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Premium E-Commerce
            </p>
          </div>
        </div>

        {/* Mode Switch Tabs (Login / Register) */}
        {(mode === 'login' || mode === 'register') && (
          <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition ${
                mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition ${
                mode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-sale text-xs font-semibold px-4 py-2.5 rounded-xl mb-4 flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ================= MODE: LOGIN ================= */}
        {mode === 'login' && (
          <div>
            <div className="mb-5">
              <h3 className="font-black text-xl text-slate-900">Welcome Back</h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Sign in to manage orders, wishlist &amp; express checkout.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
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
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs font-bold text-brand-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-3 text-xs md:text-sm font-semibold outline-none transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-extrabold py-3.5 rounded-xl transition shadow-md shadow-brand-600/20 text-xs md:text-sm"
              >
                {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </form>

            {/* Quick Demo Credentials */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Testing out?</span>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-brand-600 font-bold hover:underline bg-brand-50 border border-brand-100 px-3 py-1 rounded-full"
              >
                ⚡ Use Demo Account
              </button>
            </div>
          </div>
        )}

        {/* ================= MODE: REGISTER ================= */}
        {mode === 'register' && (
          <div>
            <div className="mb-5">
              <h3 className="font-black text-xl text-slate-900">Create Account</h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Join Velvora for exclusive rewards, fast shipping &amp; offers.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit phone number"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-3.5 rounded-xl transition shadow-md shadow-brand-600/20 text-xs md:text-sm mt-2"
              >
                {isLoading ? 'CREATING ACCOUNT...' : 'REGISTER & SIGN IN'}
              </button>
            </form>
          </div>
        )}

        {/* ================= MODE: FORGOT PASSWORD ================= */}
        {mode === 'forgot' && (
          <div>
            <div className="mb-5">
              <span className="inline-block bg-amber-50 text-amber-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full mb-2 border border-amber-200">
                Account Recovery
              </span>
              <h3 className="font-black text-xl text-slate-900">Forgot Password?</h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Enter your registered email or phone to receive a password reset verification code.
              </p>
            </div>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email or Mobile Number
                </label>
                <input
                  type="text"
                  required
                  value={identifier || email}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setEmail(e.target.value);
                  }}
                  placeholder="name@email.com or 10-digit mobile"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white rounded-xl px-4 py-3 text-xs md:text-sm font-semibold outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-3.5 rounded-xl transition shadow-md text-xs md:text-sm"
              >
                {isLoading ? 'SENDING CODE...' : 'SEND VERIFICATION CODE'}
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-900 transition mt-2"
              >
                ← Back to Sign In
              </button>
            </form>
          </div>
        )}

        {/* ================= MODE: RESET PASSWORD ================= */}
        {mode === 'reset' && (
          <div>
            <div className="mb-5">
              <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-full mb-2 border border-emerald-200">
                Step 2 of 2
              </span>
              <h3 className="font-black text-xl text-slate-900">Set New Password</h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Enter the verification code sent to you, then choose a new password.
              </p>
              {generatedCode && (
                <div className="mt-2 p-2.5 bg-brand-50 border border-brand-200 rounded-xl text-xs text-brand-800 font-bold flex items-center justify-between">
                  <span>Demo OTP: <b>{generatedCode}</b></span>
                  <span className="text-[10px] font-normal text-brand-600">(Pre-filled)</span>
                </div>
              )}
            </div>

            <form onSubmit={handleResetSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  6-Digit Verification Code (OTP)
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit code"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs md:text-sm font-mono font-bold tracking-widest outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition"
                />
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
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-600 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-3.5 rounded-xl transition shadow-md text-xs md:text-sm"
              >
                {isLoading ? 'UPDATING PASSWORD...' : 'RESET PASSWORD & SIGN IN'}
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-900 transition mt-2"
              >
                ← Back to Sign In
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
