import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Projects from '@/components/Projects';
import SkillsAndTech from '@/components/SkillsAndTech';
import BackgroundPattern from '@/components/BackgroundPattern';

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <BackgroundPattern />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <SkillsAndTech />
      {/* Autres sections à venir */}
    </main>
  );
}
