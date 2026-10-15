import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ColoursPage } from './pages/ColoursPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { prewarmSnapshotCache } from './services/snapshotCache';

export const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash || '#/home');

  useEffect(() => {
    prewarmSnapshotCache();

    const handleHashChange = () => {
      const hash = window.location.hash || '#/home';
      setCurrentHash(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    if (!window.location.hash) {
      window.location.hash = '#/home';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    window.location.hash = route;
  };

  // Route parsing
  const renderCurrentPage = () => {
    const rawHash = currentHash.replace(/^#\/?/, '');
    const [pathPart, queryPart] = rawHash.split('?');
    const searchParams = new URLSearchParams(queryPart || '');

    if (pathPart === '' || pathPart === 'home') {
      return <HomePage navigate={navigate} />;
    }

    if (pathPart === 'colours') {
      return <ColoursPage navigate={navigate} />;
    }

    if (pathPart === 'shop') {
      return <ShopPage navigate={navigate} />;
    }

    if (pathPart.startsWith('product/')) {
      const productId = pathPart.replace('product/', '');
      const colourParam = searchParams.get('colour') || undefined;
      return (
        <ProductDetailPage
          productId={productId}
          initialColourId={colourParam}
          navigate={navigate}
        />
      );
    }

    if (pathPart === 'cart' || pathPart === 'checkout') {
      return <CartPage navigate={navigate} />;
    }

    if (pathPart === 'track') {
      const orderId = searchParams.get('id') || undefined;
      return <TrackOrderPage initialOrderId={orderId} navigate={navigate} />;
    }

    if (pathPart === 'about') {
      return <AboutPage navigate={navigate} />;
    }

    if (pathPart === 'contact' || pathPart === 'help') {
      return <ContactPage navigate={navigate} />;
    }

    // Default fallback
    return <HomePage navigate={navigate} />;
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#080c16] text-slate-100 selection:bg-pink-500 selection:text-white">
        <Header currentRoute={currentHash} navigate={navigate} />
        <main className="flex-1">{renderCurrentPage()}</main>
        <Footer navigate={navigate} />
      </div>
    </CartProvider>
  );
};
