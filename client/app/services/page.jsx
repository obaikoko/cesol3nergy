import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import SolarCalculator from '@/components/SolarCalculator';

const page = () => {
  return (
    <div>
      <Navbar />
      <Services />
      <SolarCalculator />
      <Footer />
    </div>
  );
};

export default page;
