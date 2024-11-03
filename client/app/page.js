import BlogSection from '@/components/BlogSection';
import CoreOfferings from '@/components/CoreOfferings';
import FeaturedProducts from '@/components/FeaturedProducts';
import HeroSection from '@/components/HeroSection';
import ParticleBackground from '@/components/ParticleBackground';
import ProductListing from '@/components/ProductListing';
import Spinner from '@/components/Spinner';
import Testimonials from '@/components/Testimonials';
import WhyChooseUs from '@/components/WhyChooseUs';
import React from 'react';

const page = () => {
  return (
    <div>
      <HeroSection />
      <CoreOfferings />
      <FeaturedProducts />
      <Testimonials />
      <BlogSection />
      <WhyChooseUs />
    </div>
  );
};

export default page;
