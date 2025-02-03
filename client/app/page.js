import BlogSection from '@/components/BlogSection';
import CoreOfferings from '@/components/CoreOfferings';
// import FAQPage from '@/components/FAQ';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';

import Testimonials from '@/components/Testimonials';
import WhyChooseUs from '@/components/WhyChooseUs';
import React from 'react';

export const metadata = {
  title: 'Cesol3nergy - Solar Products & Renewable Energy Solutions',
  description:
    'Cesol3nergy offers premium solar panels, inverters, batteries, and renewable energy solutions. Empower your home or business with clean energy today!',
  keywords:
    'solar products, renewable energy, solar panels, solar inverters, solar batteries, clean energy, Cesol3nergy',
  image: '/images/logo.jpg',
};
const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      {/* <CoreOfferings /> */}
      {/* <FAQPage /> */}
      <Testimonials />
      <BlogSection />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default page;
