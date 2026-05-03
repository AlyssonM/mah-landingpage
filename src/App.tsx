import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import WebUICommandCenterSection from './components/WebUICommandCenterSection';
import PlanningSurfaceSection from './components/PlanningSurfaceSection';
import ArchitectureSection from './components/ArchitectureSection';
import RuntimeMatrixSection from './components/RuntimeMatrixSection';
import GovernanceSection from './components/GovernanceSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1]">
      <Header />
      <main className="relative flex w-full flex-col overflow-hidden">
        <HeroSection />
        <FeaturesSection />
        <WebUICommandCenterSection />
        <PlanningSurfaceSection />
        <ArchitectureSection />
        <RuntimeMatrixSection />
        <GovernanceSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
