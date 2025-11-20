// components/HeroContent.tsx
'use client';

import { useEffect, useRef } from 'react';
import {gsap} from "gsap";
import Image from 'next/image';

// Define the type for the fetched data
interface HeroData {
  name: string;
  roleTitle: string;
  tagline: string;
  heroImage?: { url: string; metadata: { lqip: string } };
}

export const HeroContent = ({ data }: { data: HeroData }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(containerRef.current, { visibility: 'visible', duration: 0 })
      .fromTo('.hero-text-line', 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out", 
          stagger: 0.2 
        }
      )
      .fromTo('.hero-image-block',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }, 
        "<0.3"
      );
  }, []);

  return (
    <section 
        ref={containerRef} 
        className="h-screen flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 invisible"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between max-w-6xl">
        
        <div className="md:w-3/5 text-center md:text-left z-10">
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 overflow-hidden">
            <span className="hero-text-line block">{data.name}</span>
          </h1>

          <h2 className="text-3xl md:text-5xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6 overflow-hidden">
            <span className="hero-text-line block">{data.roleTitle}</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto md:mx-0 overflow-hidden">
            <span className="hero-text-line block">{data.tagline}</span>
          </p>

        </div>
        
        {data.heroImage && (
          <div className="hero-image-block w-full md:w-2/5 mt-10 md:mt-0 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl">
              <Image
                src={data.heroImage.url}
                alt={data.name}
                placeholder="blur"
                blurDataURL={data.heroImage.metadata.lqip}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};