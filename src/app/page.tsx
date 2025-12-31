
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Project } from '@/sections/Project';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollEffects from '@/components/ScrollEffects';

export default function Home() {

  gsap.registerPlugin(ScrollTrigger);
  

  return (
    <main className="min-h-screen">
      
      <Hero /> 
      <About />
      <Project />
      <ScrollEffects />

    </main>
  );
}