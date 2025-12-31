'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollEffects() {

  const [windowWidth, setWindowWidth] = useState(0);
  let resizeTimer: any;

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);


  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector<HTMLElement>('.hero-section');
    if (!hero) return;

    const st = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: '+=300%',
      pin: true,
      pinSpacing: false,
    });

    const about = document.querySelector<HTMLElement>('.about-section');
    if (about) {
      gsap.set(about, {
        borderTopLeftRadius: '8rem',
        borderTopRightRadius: '8rem',
        overflow: 'hidden',
      });

      gsap.to(about, {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: about,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });

      const st2 = ScrollTrigger.create({
        trigger: about,
        start: 'top top',
        end: '+=300%',
        pin: true,
        pinSpacing: false,
      });
    }

    const project = document.querySelector<HTMLElement>('.project-section');
    if (project) {
      gsap.set(project, {
        borderTopLeftRadius: '8rem',
        borderTopRightRadius: '8rem',
        overflow: 'hidden',
      });

      gsap.to(project, {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: project,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });
    }

    const projectContainer = document.querySelector<HTMLElement>('.project-container');
    if (projectContainer) {
      gsap.to(project, {
        backgroundColor: '#ffffff',
        ease: 'none',
        scrollTrigger: {
          trigger: projectContainer,
          start: windowWidth > 1024 ? 'top bottom' : 'top bottom',
          end: windowWidth > 1024 ? 'bottom bottom' : 'top center',
          // markers: true,
          scrub: true,
        },
      });
    }

    // console.log(windowWidth);
    if(windowWidth > 1024){
      gsap.utils.toArray<HTMLElement>('.marquee').forEach((el, index) => {
        const track = el.querySelector('.track') as HTMLElement;
        const direction = 1;
        const baseSpeed = 150;

        const animation = gsap.to(track, {
          x: direction * -track.scrollWidth / 2,
          duration: track.scrollWidth / (2 * baseSpeed),
          ease: 'none',
          repeat: -1,
        });

        let currentTimeScale = 1;

        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const scrollDirection = self.direction; // 1 = down, -1 = up
            
            // Calculate target time scale
            const speedFactor = 1 + Math.abs(velocity) * 0.001;
            const targetTimeScale = scrollDirection * speedFactor;
            
            // Smooth transition to target
            currentTimeScale = gsap.utils.interpolate(
              currentTimeScale,
              targetTimeScale,
              0.1
            );
            
            animation.timeScale(currentTimeScale);
          },
          onLeave: () => {
            gsap.to(animation, { timeScale: 1, duration: 0.5 });
          },
          onEnterBack: () => {
            gsap.to(animation, { timeScale: 1, duration: 0.5 });
          },
        });
      });
    }

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [windowWidth]);

  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh(true);
        console.log("ScrollTriggers and ScrollSmoother instances refreshed.");
    }, 100);
  }

  if (resizeTimer) clearTimeout(resizeTimer);


  return null;
}
