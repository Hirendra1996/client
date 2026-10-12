import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, getProductById } from '../dummy data';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Cart state: { [productId]: quantity }
  const [cart, setCart] = useState({});

  // Wishlist state: array/set of product IDs
  const [wishlist, setWishlist] = useState([6]);

  // Compare state: array of product IDs (up to 3)
  const [compare, setCompare] = useState([]);

  // Auth state with persistence
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('velvora_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('velvora_registered_users');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              name: 'Demo Shopper',
              email: 'user@velvora.com',
              phone: '9876543210',
              password: 'password123'
            }
          ];
    } catch {
      return [
        {
          id: 1,
          name: 'Demo Shopper',
          email: 'user@velvora.com',
          phone: '9876543210',
          password: 'password123'
        }
      ];
    }
  });

  const [resetTokenInfo, setResetTokenInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('velvora_reset_token');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register' | 'forgot' | 'reset'

  // Delivery location
  const [location, setLocation] = useState('Mumbai 400001');

  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = (title, subtitle = '') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, subtitle }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Cart actions
  const addToCart = (productId, qty = 1, e) => {
    const p = getProductById(productId);
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + qty
    }));

    // Trigger visual dot animation towards cart button if event element provided
    if (e && e.currentTarget) {
      try {
        const rect = e.currentTarget.getBoundingClientRect();
        const dot = document.createElement('div');
        dot.className = 'fly-dot';
        dot.style.left = `${rect.left}px`;
        dot.style.top = `${rect.top}px`;
        document.body.appendChild(dot);
        requestAnimationFrame(() => {
          dot.style.left = `${window.innerWidth - 60}px`;
          dot.style.top = '20px';
          dot.style.transform = 'scale(0.3)';
          dot.style.opacity = '0';
        });
        setTimeout(() => dot.remove(), 750);
      } catch (err) {
        // ignore animation fallback
      }
    }

    if (p) {
      addToast('Added to cart', `${p.name.slice(0, 40)}...`);
    } else {
      addToast('Added to cart');
    }
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
    addToast('Removed from cart');
  };

  const changeQty = (productId, delta) => {
    setCart((prev) => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      return { ...prev, [productId]: next };
    });
  };

  const cartCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  // Cart total calculations
  const cartSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const prod = getProductById(id);
    return sum + (prod ? prod.price * qty : 0);
  }, 0);

  const cartSavings = Object.entries(cart).reduce((sum, [id, qty]) => {
    const prod = getProductById(id);
    return sum + (prod ? (prod.mrp - prod.price) * qty : 0);
  }, 0);

  // Wishlist actions
  const toggleWishlist = (productId) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      addToast('Removed from wishlist');
    } else {
      setWishlist((prev) => [...prev, productId]);
      addToast('Saved to wishlist', "We'll alert you on price drops");
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // Compare actions
  const toggleCompare = (productId) => {
    const prod = getProductById(productId);
    if (compare.includes(productId)) {
      setCompare((prev) => prev.filter((id) => id !== productId));
    } else {
      if (compare.length >= 3) {
        addToast('Compare up to 3 products', 'Remove one to add another');
        return;
      }
      setCompare((prev) => [...prev, productId]);
      if (prod) {
        addToast('Added to compare', `${prod.name.slice(0, 35)}...`);
      }
    }
  };

  const clearCompare = () => setCompare([]);

  // Auth actions
  const login = (credentials) => {
    let identifier = '';
    let password = '';
    if (typeof credentials === 'object' && credentials !== null) {
      identifier = credentials.identifier || credentials.email || credentials.phone || '';
      password = credentials.password || '';
    } else {
      identifier = String(credentials || '');
    }

    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanId) {
      return { success: false, error: 'Please enter your email or mobile number.' };
    }

    // Check against registered users
    const foundUser = registeredUsers.find(
      (u) =>
        (u.email && u.email.toLowerCase() === cleanId) ||
        (u.phone && u.phone === cleanId)
    );

    if (foundUser) {
      if (cleanPass && foundUser.password && foundUser.password !== cleanPass) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }
      const activeUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone
      };
      setUser(activeUser);
      localStorage.setItem('velvora_user', JSON.stringify(activeUser));
      setIsLoginOpen(false);
      addToast('Welcome back! 🎉', `Signed in as ${foundUser.name}`);
      return { success: true, user: activeUser };
    }

    // Fallback: If not found in default list but credentials provided
    const isEmail = cleanId.includes('@');
    const fallbackUser = {
      id: Date.now(),
      name: isEmail ? cleanId.split('@')[0] : 'Shopper',
      email: isEmail ? cleanId : `${cleanId}@velvora.com`,
      phone: !isEmail ? cleanId : '9876543210'
    };
    setUser(fallbackUser);
    localStorage.setItem('velvora_user', JSON.stringify(fallbackUser));
    setIsLoginOpen(false);
    addToast('Welcome back! 🎉', `Signed in as ${fallbackUser.name}`);
    return { success: true, user: fallbackUser };
  };

  const register = ({ name, email, phone, password }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPhone = (phone || '').trim();

    if (!cleanEmail || !cleanPhone || !password) {
      return { success: false, error: 'Please fill in all required fields.' };
    }

    const existing = registeredUsers.find(
      (u) => (u.email && u.email.toLowerCase() === cleanEmail) || (u.phone && u.phone === cleanPhone)
    );

    if (existing) {
      return { success: false, error: 'An account with this email or mobile already exists.' };
    }

    const newUser = {
      id: Date.now(),
      name: (name || '').trim() || 'Velvora Member',
      email: cleanEmail,
      phone: cleanPhone,
      password: (password || '').trim()
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('velvora_registered_users', JSON.stringify(updatedUsers));

    const activeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone
    };
    setUser(activeUser);
    localStorage.setItem('velvora_user', JSON.stringify(activeUser));
    setIsLoginOpen(false);
    addToast('Account created! 🎉', `Welcome to Velvora, ${newUser.name}`);
    return { success: true, user: activeUser };
  };

  const forgotPassword = (identifier) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    if (!cleanId) {
      return { success: false, error: 'Please enter your email or phone number.' };
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const tokenData = {
      identifier: cleanId,
      code,
      expiresAt: Date.now() + 15 * 60 * 1000
    };

    setResetTokenInfo(tokenData);
    localStorage.setItem('velvora_reset_token', JSON.stringify(tokenData));
    addToast('Verification code generated!', `Demo OTP: ${code}`);
    return { success: true, code, tokenData };
  };

  const resetPassword = ({ identifier, code, newPassword }) => {
    const cleanCode = (code || '').trim();
    const cleanPass = (newPassword || '').trim();

    if (!cleanCode || !cleanPass) {
      return { success: false, error: 'Please enter verification code and new password.' };
    }

    if (resetTokenInfo && resetTokenInfo.code !== cleanCode) {
      return { success: false, error: 'Invalid verification code. Please check and try again.' };
    }

    const targetId = (identifier || resetTokenInfo?.identifier || '').toLowerCase();

    const updated = registeredUsers.map((u) => {
      if (
        (u.email && u.email.toLowerCase() === targetId) ||
        (u.phone && u.phone === targetId)
      ) {
        return { ...u, password: cleanPass };
      }
      return u;
    });

    setRegisteredUsers(updated);
    localStorage.setItem('velvora_registered_users', JSON.stringify(updated));
    setResetTokenInfo(null);
    localStorage.removeItem('velvora_reset_token');

    addToast('Password Reset Successfully! 🔒', 'You can now sign in with your new password');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('velvora_user');
    addToast('Signed out successfully', 'See you again soon!');
  };

  const clearCart = () => {
    setCart({});
  };

  // Addresses state
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('velvora_addresses');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              type: 'Home',
              name: 'Rahul Sharma',
              phone: '9876543210',
              street: 'Flat 402, Green Glen Heights, Outer Ring Road, Bellandur',
              city: 'Bengaluru',
              state: 'Karnataka',
              pincode: '560103',
              isDefault: true
            },
            {
              id: 2,
              type: 'Work',
              name: 'Rahul Sharma',
              phone: '9876543210',
              street: '4th Floor, DLF Cyber Hub, Phase 2, Sector 24',
              city: 'Gurugram',
              state: 'Haryana',
              pincode: '122002',
              isDefault: false
            }
          ];
    } catch {
      return [];
    }
  });

  const addAddress = (addr) => {
    const newAddr = {
      ...addr,
      id: Date.now(),
      isDefault: addresses.length === 0 ? true : addr.isDefault || false
    };
    let updated = [...addresses];
    if (newAddr.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }
    updated.push(newAddr);
    setAddresses(updated);
    localStorage.setItem('velvora_addresses', JSON.stringify(updated));
    addToast('Address added successfully!');
    return newAddr;
  };

  const updateAddress = (id, updatedData) => {
    let updated = addresses.map((a) => {
      if (a.id === id) {
        return { ...a, ...updatedData };
      }
      if (updatedData.isDefault) {
        return { ...a, isDefault: false };
      }
      return a;
    });
    setAddresses(updated);
    localStorage.setItem('velvora_addresses', JSON.stringify(updated));
    addToast('Address updated!');
  };

  const deleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
      updated[0].isDefault = true;
    }
    setAddresses(updated);
    localStorage.setItem('velvora_addresses', JSON.stringify(updated));
    addToast('Address removed');
  };

  const setDefaultAddress = (id) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    setAddresses(updated);
    localStorage.setItem('velvora_addresses', JSON.stringify(updated));
    addToast('Default delivery address updated');
  };

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('velvora_orders');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'VEL-89214',
              date: '2026-10-04',
              status: 'In Transit',
              estDelivery: 'Tomorrow by 8:00 PM',
              courier: 'Delhivery Express',
              trackingNumber: 'AWB-DEL-992140',
              paymentMethod: 'UPI (Google Pay)',
              total: 2999,
              shippingFee: 0,
              shippingAddress: {
                name: 'Rahul Sharma',
                phone: '9876543210',
                street: 'Flat 402, Green Glen Heights, Outer Ring Road, Bellandur',
                city: 'Bengaluru',
                state: 'Karnataka',
                pincode: '560103'
              },
              items: [
                {
                  productId: 2,
                  name: 'Amaze Fit Pro Smartwatch — AMOLED, SpO2, 14-Day Battery',
                  quantity: 1,
                  price: 2999,
                  img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
                  brand: 'FitPulse'
                }
              ],
              timeline: [
                { title: 'Order Placed & Confirmed', time: '04 Oct, 10:30 AM', done: true },
                { title: 'Packed at Bengaluru Fulfillment Center', time: '04 Oct, 04:15 PM', done: true },
                { title: 'Dispatched via Delhivery Express', time: '05 Oct, 08:45 AM', done: true },
                { title: 'Arrived at City Hub (Bellandur Hub)', time: '06 Oct, 02:20 PM', done: true },
                { title: 'Out for Delivery', time: 'Expected Tomorrow', done: false },
                { title: 'Delivered', time: 'Expected Tomorrow by 8:00 PM', done: false }
              ]
            },
            {
              id: 'VEL-76503',
              date: '2026-09-28',
              status: 'Delivered',
              deliveredOn: '30 Sep 2026, 04:15 PM',
              courier: 'Blue Dart Surface',
              trackingNumber: 'AWB-BLR-765030',
              paymentMethod: 'Credit Card (HDFC Bank **** 4192)',
              total: 3498,
              shippingFee: 0,
              shippingAddress: {
                name: 'Rahul Sharma',
                phone: '9876543210',
                street: 'Flat 402, Green Glen Heights, Outer Ring Road, Bellandur',
                city: 'Bengaluru',
                state: 'Karnataka',
                pincode: '560103'
              },
              items: [
                {
                  productId: 1,
                  name: 'Wireless Noise-Cancelling Headphones with 60H Battery',
                  quantity: 1,
                  price: 1499,
                  img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
                  brand: 'Audionic'
                },
                {
                  productId: 3,
                  name: 'AirFlex Running Shoes — Ultra Light, Breathable Knit',
                  quantity: 1,
                  price: 1999,
                  img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
                  brand: 'StreetRunner'
                }
              ],
              timeline: [
                { title: 'Order Placed & Confirmed', time: '28 Sep, 02:10 PM', done: true },
                { title: 'Packed at Hub', time: '28 Sep, 06:40 PM', done: true },
                { title: 'Dispatched', time: '29 Sep, 09:15 AM', done: true },
                { title: 'Out for Delivery', time: '30 Sep, 10:00 AM', done: true },
                { title: 'Delivered to Recipient', time: '30 Sep, 04:15 PM', done: true }
              ]
            }
          ];
    } catch {
      return [];
    }
  });

  const placeOrder = ({ items, shippingAddress, paymentMethod, total, shippingFee = 0 }) => {
    const newOrderId = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      estDelivery: 'Within 2–4 business days',
      courier: 'Velvora Priority Logistics',
      trackingNumber: `AWB-VEL-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentMethod: paymentMethod || 'UPI',
      total: total,
      shippingFee: shippingFee,
      shippingAddress: shippingAddress,
      items: items.map((item) => {
        const prod = getProductById(item.productId);
        return {
          productId: item.productId,
          name: prod ? prod.name : item.name || 'Velvora Product',
          quantity: item.quantity || 1,
          price: prod ? prod.price : item.price || 999,
          img: prod ? prod.img1 : item.img || '',
          brand: prod ? prod.brand : item.brand || 'Velvora'
        };
      }),
      timeline: [
        { title: 'Order Placed & Payment Verified', time: 'Just now', done: true },
        { title: 'Sent to Fulfillment Warehouse', time: 'In Progress', done: false },
        { title: 'Dispatched via Courier', time: 'Pending', done: false },
        { title: 'Out for Delivery', time: 'Pending', done: false },
        { title: 'Delivered', time: 'Estimated within 2–4 days', done: false }
      ]
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('velvora_orders', JSON.stringify(updated));
    clearCart();
    addToast('Order Placed Successfully! 🎉', `Order ID: ${newOrderId}`);
    return newOrder;
  };

  const cancelOrder = (orderId, reason = 'Customer request') => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'Cancelled',
          cancelReason: reason,
          cancelledAt: new Date().toLocaleDateString()
        };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem('velvora_orders', JSON.stringify(updated));
    addToast('Order Cancelled', `Refund for #${orderId} will be processed.`);
  };

  const getOrderById = (orderId) => {
    return orders.find((o) => o.id === orderId) || null;
  };

  const updateProfile = ({ name, email, phone }) => {
    const updatedUser = {
      ...user,
      name: name || user?.name,
      email: email || user?.email,
      phone: phone || user?.phone
    };
    setUser(updatedUser);
    localStorage.setItem('velvora_user', JSON.stringify(updatedUser));
    addToast('Profile Updated Successfully! ✅');
  };

  // Location actions
  const updateLocation = (pincode) => {
    setLocation(`Pincode ${pincode}`);
    setIsLocationOpen(false);
    addToast('Location updated', `Delivering to ${pincode}`);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        cartSavings,
        addToCart,
        removeFromCart,
        changeQty,
        clearCart,
        wishlist,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        compare,
        toggleCompare,
        clearCompare,
        user,
        registeredUsers,
        resetTokenInfo,
        authModalMode,
        setAuthModalMode,
        login,
        register,
        forgotPassword,
        resetPassword,
        logout,
        updateProfile,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        placeOrder,
        cancelOrder,
        getOrderById,
        location,
        updateLocation,
        quickViewProduct,
        setQuickViewProduct,
        isLoginOpen,
        setIsLoginOpen,
        isLocationOpen,
        setIsLocationOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toasts,
        addToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
