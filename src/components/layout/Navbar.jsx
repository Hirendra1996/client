import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../dummy data';

const Navbar = () => {
  const navigate = useNavigate();
  const {
    location,
    user,
    wishlistCount,
    cartCount,
    setIsLoginOpen,
    setIsLocationOpen,
    setIsMobileMenuOpen,
    addToast,
    logout
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchDropOpen, setIsSearchDropOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [mobileQuery, setMobileQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['headphones', 'smartwatch', 'vitamin c serum']);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  const searchContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchDropOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const popularTags = ['Air Fryer', 'iPhone 16', 'Sneakers', 'Serum', 'Smartwatch', 'Kurti'];

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        (p.name + p.brand + p.cat).toLowerCase().includes(searchQuery.toLowerCase().trim())
      ).slice(0, 5)
    : [];

  const mobileFiltered = mobileQuery.trim()
    ? PRODUCTS.filter((p) =>
        (p.name + p.brand).toLowerCase().includes(mobileQuery.toLowerCase().trim())
      ).slice(0, 3)
    : [];

  const handleSearchSubmit = (q = searchQuery) => {
    const term = q.trim();
    if (!term) return;
    if (!recentSearches.includes(term.toLowerCase())) {
      setRecentSearches((prev) => [term.toLowerCase(), ...prev.slice(0, 4)]);
    }
    setIsSearchDropOpen(false);
    navigate(`/products?search=${encodeURIComponent(term)}`);
  };

  const handleVoiceSearch = (isMobile = false) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      addToast(
        'Voice Search Not Supported',
        'Your browser does not support Web Speech Recognition. Please try Chrome, Edge, or Safari.'
      );
      return;
    }

    // Toggle off if currently listening
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setVoiceTranscript('');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = navigator.language || 'en-US';

      setIsListening(true);
      setVoiceTranscript('');
      addToast('🎙️ Listening...', 'Speak product, brand, or category now');

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let interimText = '';
        let finalText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += transcriptPiece;
          } else {
            interimText += transcriptPiece;
          }
        }

        const activeText = (finalText || interimText).trim();
        setVoiceTranscript(activeText);

        if (isMobile) {
          setMobileQuery(activeText);
        } else {
          setSearchQuery(activeText);
          setIsSearchDropOpen(true);
        }

        // When speech is recognized and final
        if (finalText) {
          setIsListening(false);
          addToast(`Heard: "${finalText.trim()}"`, 'Searching catalog...');
          setTimeout(() => {
            if (isMobile) {
              navigate(`/products?search=${encodeURIComponent(finalText.trim())}`);
              setIsMobileSearchOpen(false);
            } else {
              handleSearchSubmit(finalText.trim());
            }
          }, 600);
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          addToast('Microphone Blocked', 'Please allow microphone access in browser settings to speak.');
        } else if (event.error === 'no-speech') {
          addToast('No speech detected', 'Please try speaking again.');
        } else if (event.error !== 'aborted') {
          addToast('Voice recognition error', event.error);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setIsListening(false);
      addToast('Could not start voice search', 'Please check microphone permissions.');
    }
  };

  return (
    <header
      id="mainHeader"
      className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 transition-shadow"
      style={{
        boxShadow: isScrolled ? 'rgba(0, 0, 0, 0.08) 0px 4px 20px' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 md:gap-6 h-16 md:h-[72px]">
          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 transition"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Velvora home"
          >
            <span className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-brand-600 text-white grid place-items-center font-black text-xl shadow-lift">
              V
            </span>
            <span className="leading-none">
              <span className="block font-extrabold text-lg md:text-xl tracking-tight">VELVORA</span>
              <span className="hidden md:block text-[10px] font-semibold tracking-[.2em] text-slate-500">
                SHOP BETTER
              </span>
            </span>
          </Link>

          {/* Location selector desktop */}
          <button
            onClick={() => setIsLocationOpen(true)}
            className="hidden lg:flex items-center gap-2 text-left px-3 py-2 rounded-xl hover:bg-slate-100 shrink-0 transition"
          >
            <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span className="leading-tight">
              <span className="block text-[11px] text-slate-500">Deliver to</span>
              <span id="locLabel" className="block text-sm font-bold">
                {location}
              </span>
            </span>
          </button>

          {/* Search bar desktop */}
          <div ref={searchContainerRef} className="hidden md:block flex-1 relative">
            <div className="flex items-center bg-slate-100 border border-transparent focus-within:border-brand-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-100 rounded-full transition overflow-hidden">
              <svg className="w-5 h-5 ml-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropOpen(true);
                }}
                onFocus={() => setIsSearchDropOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearchSubmit();
                }}
                placeholder={isListening ? "Listening... Speak now" : "Search products, brands and categories..."}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => handleVoiceSearch(false)}
                className={`p-2 mr-1 rounded-full transition-all relative ${
                  isListening
                    ? 'bg-red-500 text-white ring-4 ring-red-200 shadow-md scale-105'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
                title={isListening ? 'Listening... Click to stop' : 'Search with voice'}
                aria-label={isListening ? 'Stop listening' : 'Voice search'}
              >
                {isListening ? (
                  <span className="flex items-center justify-center w-5 h-5">
                    <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
                  </span>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="9" y="3" width="6" height="11" rx="3" />
                    <path d="M5 11a7 7 0 0014 0M12 18v3" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={() => handleSearchSubmit()}
                className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold px-6 py-3 m-1 rounded-full transition"
              >
                Search
              </button>
            </div>

            {/* Real-time Voice Listening Popup */}
            {isListening && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 text-white border border-slate-700 rounded-2xl p-4 shadow-2xl z-50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-red-500/20 text-red-500 shrink-0">
                    <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-red-400 opacity-75" />
                    <svg className="w-4 h-4 fill-current relative z-10" viewBox="0 0 24 24">
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white uppercase tracking-wider">
                        Listening...
                      </span>
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <p className="text-sm font-bold text-brand-300 mt-0.5">
                      {voiceTranscript ? `"${voiceTranscript}"` : 'Speak now (e.g., "Smartwatch", "Headphones")...'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (recognitionRef.current) recognitionRef.current.stop();
                    setIsListening(false);
                  }}
                  className="text-xs bg-white/10 hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded-full transition shrink-0"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Autocomplete Dropdown */}
            {isSearchDropOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-pop overflow-hidden z-50">
                {!searchQuery.trim() ? (
                  <div className="p-4 grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-extrabold text-slate-400 tracking-wider mb-2 uppercase">
                        Recent Searches
                      </p>
                      {recentSearches.map((r, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setSearchQuery(r);
                            handleSearchSubmit(r);
                          }}
                          className="flex items-center gap-2 w-full text-left text-sm py-2 hover:text-brand-600 transition"
                        >
                          <span>🕘</span>
                          {r}
                        </button>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-400 tracking-wider mb-2 uppercase">
                        Popular Right Now
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((t, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSearchQuery(t);
                              handleSearchSubmit(t);
                            }}
                            className="bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-xs font-bold px-3.5 py-2 rounded-full transition"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="p-2">
                    {filteredProducts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        onClick={() => setIsSearchDropOpen(false)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-left transition"
                      >
                        <img src={p.img1} alt={p.name} className="w-11 h-11 rounded-lg object-cover" />
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold line1 text-slate-900">{p.name}</span>
                          <span className="block text-xs text-slate-500">
                            in {p.cat} • ₹{p.price.toLocaleString('en-IN')}
                          </span>
                        </span>
                        <span className="text-slate-300">→</span>
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="w-full mt-1 bg-slate-900 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-brand-600 transition"
                    >
                      See all results for "{searchQuery}"
                    </button>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-3xl">🔍</p>
                    <p className="font-bold mt-2">No results for "{searchQuery}"</p>
                    <p className="text-sm text-slate-500">Try checking spelling or use different keywords.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 md:gap-2 ml-auto">
            {/* Mobile search toggle */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-slate-100 transition"
              onClick={() => setIsMobileSearchOpen((prev) => !prev)}
              aria-label="Search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>

            {/* Account Desktop */}
            <div className="hidden md:block relative">
              <button
                onClick={() => {
                  if (user) {
                    setIsAccountMenuOpen((prev) => !prev);
                  } else {
                    setIsLoginOpen(true);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full hover:bg-slate-100 font-semibold text-sm transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
                </svg>
                <span id="accountLabel" className="leading-none text-left">
                  {user ? (
                    <>
                      Hello, {user.name ? user.name.split(' ')[0] : 'Member'}
                      <br />
                      <span className="font-bold">My Account</span>
                    </>
                  ) : (
                    <>
                      Hello, Sign In
                      <br />
                      <span className="font-bold">Account</span>
                    </>
                  )}
                </span>
              </button>

              {/* Account Dropdown when logged in */}
              {user && isAccountMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="pb-3 border-b border-slate-100 px-2 pt-1">
                    <p className="font-extrabold text-sm text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email || user.phone}</p>
                  </div>
                  <div className="py-2 space-y-1">
                    <Link
                      to="/account"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                    >
                      📊 Dashboard
                    </Link>
                    <Link
                      to="/orders"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                    >
                      📦 My Orders
                    </Link>
                    <Link
                      to="/track-order"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                    >
                      🚚 Track Shipment
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                    >
                      ❤️ My Wishlist
                    </Link>
                    <Link
                      to="/addresses"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                    >
                      📍 Addresses
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsAccountMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                    >
                      ⚙️ Profile Settings
                    </Link>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsAccountMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-sale hover:bg-red-50 rounded-xl transition"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist button */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-full hover:bg-slate-100 transition"
              aria-label="Wishlist"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 21C7 17 3 13.5 3 9.5A4.5 4.5 0 017.5 5c1.8 0 3.4 1 4.5 2.6A4.5 4.5 0 0116.5 5 4.5 4.5 0 0121 9.5c0 4-4 7.5-9 11.5z" />
              </svg>
              <span
                id="wishCount"
                className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 rounded-full bg-sale text-white text-[11px] font-bold grid place-items-center"
              >
                {wishlistCount}
              </span>
            </Link>

            {/* Cart button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-slate-900 hover:bg-brand-600 text-white pl-3 pr-4 py-2.5 rounded-full font-bold text-sm transition"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 4h2l2.4 12.2A1 1 0 008.4 17H18a1 1 0 001-.8L21 8H6" />
                <circle cx="10" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              <span
                id="cartCount"
                className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1 rounded-full bg-brand-600 border-2 border-white text-white text-[11px] font-bold grid place-items-center badge-bounce"
              >
                {cartCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile search bar */}
        {isMobileSearchOpen && (
          <div id="mobileSearch" className="md:hidden pb-3">
            <div className="flex items-center bg-slate-100 rounded-full px-4 py-2.5">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                type="text"
                value={mobileQuery}
                onChange={(e) => setMobileQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/products?search=${encodeURIComponent(mobileQuery)}`);
                    setIsMobileSearchOpen(false);
                  }
                }}
                placeholder={isListening ? "Listening... Speak now" : "Search products, brands..."}
                className="w-full bg-transparent px-3 text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => handleVoiceSearch(true)}
                className={`p-1.5 rounded-full transition-all ${
                  isListening
                    ? 'bg-red-500 text-white ring-4 ring-red-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title={isListening ? 'Listening... Click to stop' : 'Search with voice'}
                aria-label={isListening ? 'Stop listening' : 'Voice search'}
              >
                {isListening ? (
                  <span className="flex items-center justify-center w-5 h-5">
                    <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
                  </span>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="9" y="3" width="6" height="11" rx="3" />
                    <path d="M5 11a7 7 0 0014 0M12 18v3" />
                  </svg>
                )}
              </button>
            </div>
            {isListening && (
              <div className="mt-2 bg-slate-900 text-white rounded-2xl p-3 shadow-xl flex items-center justify-between gap-3 text-xs border border-slate-700">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0" />
                  <div>
                    <span className="font-extrabold block text-[11px] text-slate-300">Listening...</span>
                    <span className="font-bold text-brand-300 text-xs">
                      {voiceTranscript ? `"${voiceTranscript}"` : 'Speak now...'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (recognitionRef.current) recognitionRef.current.stop();
                    setIsListening(false);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-2.5 py-1 rounded-full text-[11px]"
                >
                  Cancel
                </button>
              </div>
            )}
            {mobileQuery && (
              <div id="mSearchResults" className="mt-2 space-y-2">
                {mobileFiltered.length > 0 ? (
                  mobileFiltered.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={() => setIsMobileSearchOpen(false)}
                      className="w-full bg-white border rounded-xl p-2.5 flex gap-3 items-center text-left block"
                    >
                      <img src={p.img1} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="text-sm font-semibold line1 text-slate-900">
                        {p.name}
                        <span className="block text-xs font-normal text-slate-500">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 bg-white border rounded-xl p-3">No matches found.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
