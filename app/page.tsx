import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MissionVisionGoals from '@/components/MissionVisionGoals';
import Services from '@/components/Services';
import Values from '@/components/Values';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <MissionVisionGoals />
      <Services />
      <Values />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}
