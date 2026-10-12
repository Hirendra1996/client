import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AccountDashboardPage from './pages/AccountDashboardPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import TrackOrderPage from './pages/TrackOrderPage';
import AddressesPage from './pages/AddressesPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import OffersPage from './pages/OffersPage';
import ComparePage from './pages/ComparePage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* 1. Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* 2. Shop / Catalog */}
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/shop" element={<ProductListingPage />} />

          {/* 3. Category Product Listing */}
          <Route path="/category/:categoryName" element={<ProductListingPage />} />
          <Route path="/products/category/:categoryName" element={<ProductListingPage />} />

          {/* 4. Product Details */}
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />

          {/* 5. Search Results */}
          <Route path="/search" element={<ProductListingPage />} />

          {/* 6. Wishlist */}
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* 7. Cart */}
          <Route path="/cart" element={<CartPage />} />

          {/* 8. Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* 9. Order Success */}
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />

          {/* 10. Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* 11. Register */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signup" element={<RegisterPage />} />

          {/* 12. Forgot / Reset Password */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

          {/* 13. Account Dashboard */}
          <Route path="/account" element={<AccountDashboardPage />} />
          <Route path="/account/dashboard" element={<AccountDashboardPage />} />

          {/* 14. My Orders */}
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/account/orders" element={<MyOrdersPage />} />

          {/* 15. Order Details */}
          <Route path="/orders/:orderId" element={<OrderDetailPage />} />
          <Route path="/order/:orderId" element={<OrderDetailPage />} />

          {/* 16. Track Order */}
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/track" element={<TrackOrderPage />} />
          <Route path="/track/:orderId" element={<TrackOrderPage />} />

          {/* 17. Addresses */}
          <Route path="/addresses" element={<AddressesPage />} />
          <Route path="/account/addresses" element={<AddressesPage />} />

          {/* 18. Profile Settings */}
          <Route path="/profile" element={<ProfileSettingsPage />} />
          <Route path="/account/profile" element={<ProfileSettingsPage />} />

          {/* 19. Offers & Deals */}
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/deals" element={<OffersPage />} />

          {/* 20. Product Comparison */}
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/comparison" element={<ComparePage />} />

          {/* 21. About Us */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutPage />} />

          {/* 22. Contact Us */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />

          {/* 23. FAQ */}
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/faqs" element={<FAQPage />} />

          {/* 24. Privacy / Terms / Refund */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/refund" element={<RefundPolicyPage />} />
          <Route path="/returns" element={<RefundPolicyPage />} />

          {/* 25. 404 Not Found Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
