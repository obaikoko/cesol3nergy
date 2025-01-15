import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';

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
      <Services />
      <Footer />
    </div>
  );
};

export default page;
