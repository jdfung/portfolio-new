// sections/Hero.tsx
import { sanityFetch } from '../sanity/lib/client';
import { heroQuery } from '@/lib/sanity/groq';
import { HeroContent } from '@/components/HeroContent';

type HeroSectionData = {
  name: string;
  roleTitle: string;
  tagline: string;
  heroImage?: { url: string; metadata: { lqip: string } };
};

export const Hero = async () => {
  const data = await sanityFetch<HeroSectionData>(heroQuery);

  if (!data) {
    return <section className="h-screen grid place-items-center"><h1>Setup incomplete. Please populate Hero data in Sanity Studio.</h1></section>;
  }

  return (
    <HeroContent data={data} />
  );
};