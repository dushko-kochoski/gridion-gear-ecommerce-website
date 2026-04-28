import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import CartPanel from '@/components/CartPanel';
import ToastContainer from '@/components/ToastContainer';
import ScrollToTop from '@/components/ScrollToTop';

const Home = lazy(() => import('@/pages/Home'));
const Shop = lazy(() => import('@/pages/Shop'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Lookbook = lazy(() => import('@/pages/Lookbook'));

function App() {
  return (
    <div className="min-h-screen bg-void text-white font-inter">
      <ScrollToTop />
      <NavigationBar />
      <CartPanel />
      <ToastContainer />
      <Suspense fallback={<div className="min-h-screen bg-void" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/lookbook" element={<Lookbook />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
