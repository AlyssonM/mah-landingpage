import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ArchitectureSection from './components/ArchitectureSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1]">
      <Header />
      <main className="relative w-full overflow-hidden flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <ArchitectureSection />
        <CTASection />
        {/* FooterArtSection merged into CTA */}
      </main>
      <Footer />
    </div>
  );
}
