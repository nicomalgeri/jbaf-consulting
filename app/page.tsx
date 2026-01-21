import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import MissionVisionGoals from '@/components/MissionVisionGoals';
import Services from '@/components/Services';
import Values from '@/components/Values';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';

// Revalidate page every 60 seconds to fetch new Sanity content
export const revalidate = 60;

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <MissionVisionGoals />
      <Services />
      <Values />
      <OurStory />
      <Testimonials />
      <CallToAction />
      <Partners />
      <Footer />
    </main>
  );
}
