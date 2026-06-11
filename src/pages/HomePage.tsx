import Navigation from '../sections/Navigation';
import HeroSection from '../sections/HeroSection';
import RaceDetails from '../sections/RaceDetails';
import Registration from '../sections/Registration';
import FAQ from '../sections/FAQ';
import Newsletter from '../sections/Newsletter';
import Footer from '../sections/Footer';

export default function HomePage() {
  return (
    <div className="relative">
      <Navigation />
      <HeroSection />
      <div className="relative z-10">
        <RaceDetails />
        <Registration />
        <FAQ />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}
