import BlogSection from '@/components/BlogSection';
import CoreOfferings from '@/components/CoreOfferings';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';

import Testimonials from '@/components/Testimonials';
import WhyChooseUs from '@/components/WhyChooseUs';
import React from 'react';

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CoreOfferings />
      <FeaturedProducts />
      <Testimonials />
      <BlogSection />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default page;
