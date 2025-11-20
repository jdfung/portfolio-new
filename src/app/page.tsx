// app/page.tsx
import { Hero } from '@/sections/Hero';
// Import other sections here as you build them

// This is the main monopage file, rendered as a Server Component by default
export default function Home() {
  return (
    <main className="min-h-screen">
      
      {/* 1. Hero Section - Fetches data and handles GSAP intro */}
      <Hero /> 

      {/* 2. About Section (To be implemented)
        <About />
      */}
      
      {/* 3. Tech Stack Section (To be implemented)
        <TechStack /> 
      */}

      {/* ... and so on for all other sections */}
      
    </main>
  );
}