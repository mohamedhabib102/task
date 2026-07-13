import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Partners } from '@/components/sections/Partners';
import { StarsBackground } from '@/components/StarsBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col">
      <StarsBackground />
      <Navbar />
      <Hero />
      <About />
      <Partners />
    </main>
  );
}
