'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/sanity-image';

interface AboutData {
  title: string;
  description: string;
  image: any;
  socials: {
    label: string;
    url: string;
    icon: {
      url: string;
    };
  }[];
}

export const AboutContent = ({ data }: { data: AboutData }) => {


  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    console.log(imageLoaded);
  }, [imageLoaded]);

  return (
    <section id="about" className="about-section h-screen flex items-center justify-center p-8 relative z-10 bg-sumi">
        <div className="max-w-3xl w-full">
        <div className="flex flex-col items-center text-center space-y-10">
          
          <div className="relative w-40 h-40 rounded-full overflow-hidden">
            <Image
              src={urlFor(data.image).width(400).height(400).url()}
              alt={data.title}
              width={400}
              height={400}
              className="object-cover"
              placeholder="blur"
              blurDataURL={data.image.asset.metadata.lqip}
            />
          </div>


          {/* Content */}
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-shiro">
              {data.title}
            </h2>
            
            <p className="text-lg md:text-xl text-shiro leading-relaxed font-light">
              {data.description}
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-6 pt-2">
            {data.socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label={social.label}
              >
                {social.icon ? (
                  <img
                    src={social.icon.url}
                    alt={social.label}
                    className="w-5 h-5 text-shiro transition-all duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span className="w-5 h-5 text-shiro transition-all duration-300 group-hover:scale-110">
                    {social.label}
                  </span>
                )}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-shiro text-xs px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
