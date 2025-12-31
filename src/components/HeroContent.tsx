// components/HeroContent.tsx
'use client';

import { useEffect, useRef } from 'react';
import {gsap} from "gsap";
import Image from 'next/image';

// Define the type for the fetched data
interface HeroData {
  symbol: string;
  name: string;
  roleTitle: string;
  tagline: string;
  resume?: { url: string };
}

export const HeroContent = ({ data }: { data: HeroData }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(".hero-section .hero-circle1", {
      scale: 0,
      x: 100,
      y: -100,
      duration: 0.8
    })
    .from(".hero-section .hero-circle2", {
      scale: 0,
      x: -100,
      y: 100,
      duration: 0.8
    })
    .from(".hero-section .hero-symbol", {
      opacity: 0,
      scale: 1.5,
      duration: 1.2
    }, "-=0.5")
    .from(".hero-section .hero-title, .hero-section .hero-image", {
      opacity: 0,
      y: 20,
      duration: 1
    }, "-=0.2")
    .from(".hero-section .hero-subtitle, .hero-section .hero-resume", {
      opacity: 0,
      // letterSpacing: "1em",
      duration: 0.8
    }, "-=0.4")
    .from(".hero-section .scrolldown", {
      opacity: 0,
      y: 20,
      duration: 1
    }, "-=0.2")

    gsap.to(".hero-section .hero-circle1", {
      y: -20,
      x: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(".hero-section .hero-circle2", {
      y: 20,
      x: -20,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
      
  }, []);

  return (
    <section id="hero"
        ref={containerRef} 
        className="hero-section relative h-screen flex flex-col items-center justify-center p-8"
    >
      <div className="hero-circle1 absolute w-32 h-32 rounded-full bg-primary opacity-40"></div>
      <div className="hero-circle2 absolute w-48 h-48 rounded-full border border-primary opacity-30"></div>

      <div className="flex flex-col items-center text-center gap-8 px-6">
        <div className="hero-symbol text-9xl text-primary">{data.symbol}</div>
        
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="hero-title text-5xl md:text-7xl font-light text-primary tracking-wide">{data.name}</h1>
          <p className="hero-subtitle text-primary text-sm font-light">{data.roleTitle}</p>
          <p className="hero-subtitle text-primary text-sm font-light">{data.tagline}</p>

          {data.resume && (
            <a href={data.resume.url} target="_blank" rel="noopener noreferrer" className="hero-resume py-3 px-5 border border-primary rounded-md text-primary hover:bg-primary hover:text-shiro hover:border-primary transition-colors duration-300 text-sm font-light">View Resume</a>
          )}
        </div>
      </div>

      <div className="scrolldown flex flex-col items-center justify-center gap-5 absolute bottom-4">

        <div className="flex flex-col relative items-center justify-center gap-5">

          <span className="block md:hidden mouse mx-auto rounded-full border-2 border-primary h-[50px] w-[25px] relative">
            <span className="move absolute bg-primary h-[5px] w-[5px] rounded-full left-1/2 animate-move"></span>
          </span>

          <div className="md:block hidden text-center h-[80%] mb-3">
            <span className="arrow animate-arrow"></span>
            <span className="arrow animate-arrow delay-[-0.2s]"></span>
            <span className="arrow animate-arrow delay-[-0.4s]"></span>
          </div>

          <h2 className="text-primary font-light text-[16px]">Scroll down</h2>
        </div>
      </div>
    </section>
  );
};