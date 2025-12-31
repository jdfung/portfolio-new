"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import {
    Home,
    User,
    FolderKanban,
    Menu,
    X,
} from 'lucide-react'

type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
  };

  const navItems: NavItem[] = [
    { label: "Home", href: "#hero", icon: <Home /> },
    { label: "About", href: "#about", icon: <User /> },
    { label: "Projects", href: "#projects", icon: <FolderKanban /> },
  ];  

const SideNav = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        gsap.registerPlugin(ScrollToPlugin);
        gsap.from(".side-nav", {
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        });
      
    }, []);

    const handleNavigate = (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string
    ) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href) as HTMLElement | null;
        if (target) {
            console.log(target.offsetTop);
          gsap.to(window, {
            duration: 0.8,
            ease: 'power2.out',
            scrollTo: { y: target.offsetTop, autoKill: true, offsetY: 0 },
          });
        }
        setIsOpen(false);
      }
    };
    
      
  return (
    <>
      {/* ============================
          MOBILE NAV
      ============================= */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-neutral-900 p-2 rounded-xl text-white shadow-md"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div className="mt-2 bg-neutral-900/95 backdrop-blur-lg rounded-2xl p-4 w-56 shadow-xl border border-neutral-800">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavigate(e, item.href)}
                className="flex items-center gap-3 py-2 text-gray-300 hover:text-white hover:bg-neutral-800/60 rounded-xl px-3 transition"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ============================
          DESKTOP SIDEBAR
      ============================= */}
      <div
        className={`side-nav
          hidden lg:flex flex-col fixed top-1/2 -translate-y-1/2 left-7 z-40
          bg-neutral-900 text-gray-300 border border-neutral-800 shadow-xl overflow-hidden
          ${isExpanded ? "w-max p-4 transition-normal duration-700" : "w-20 p-3"}
           rounded-xl
        `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex flex-col gap-6 w-full">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavigate(e, item.href)}
              className={`flex items-center ${isExpanded ? "justify-start" : "justify-center"} gap-3 p-3 rounded-xl hover:bg-neutral-800/60 transition`}
            >
              {item.icon}
              {isExpanded && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideNav