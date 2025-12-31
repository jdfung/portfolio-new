import React from 'react'
import { sanityFetch } from '../sanity/lib/client';
import { aboutQuery } from '@/lib/sanity/groq';
import { AboutContent } from '@/components/AboutContent';

interface AboutData {
  title: string;
  description: string;
  image: {
    url: string;
    metadata: {
      lqip: string;
    };
  };
  socials: {
    label: string;
    url: string;
    icon: {
      url: string;
    };
  }[];
}

export const About = async () => {
  const data = await sanityFetch<AboutData>(aboutQuery);

  console.log(data);

  if (!data) {
    return <section className="h-screen grid place-items-center"><h1>Setup incomplete. Please populate About data in Sanity Studio.</h1></section>;
  }


  return (
    <AboutContent data={data} />
  )
}
