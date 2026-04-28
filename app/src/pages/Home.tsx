import { lazy, Suspense } from 'react';

const Hero = lazy(() => import('@/sections/home/Hero'));
const FeaturedProducts = lazy(() => import('@/sections/home/FeaturedProducts'));
const BrandTicker = lazy(() => import('@/sections/home/BrandTicker'));
const ShopByCategory = lazy(() => import('@/sections/home/ShopByCategory'));
const LookbookPreview = lazy(() => import('@/sections/home/LookbookPreview'));
const BrandManifesto = lazy(() => import('@/sections/home/BrandManifesto'));
const NewsletterCTA = lazy(() => import('@/sections/home/NewsletterCTA'));

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void" />}>
      <Hero />
      <FeaturedProducts />
      <BrandTicker />
      <ShopByCategory />
      <LookbookPreview />
      <BrandManifesto />
      <NewsletterCTA />
    </Suspense>
  );
}
