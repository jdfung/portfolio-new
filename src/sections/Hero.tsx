// sections/Hero.tsx
import { sanityFetch } from '../sanity/lib/client';
import { heroQuery } from '@/lib/sanity/groq';
import { HeroContent } from '@/components/HeroContent';

type HeroSectionData = {
  symbol: string;
  name: string;
  roleTitle: string;
  tagline: string;
  resume?: { url: string };
};

export const Hero = async () => {
  const data = await sanityFetch<HeroSectionData>(heroQuery);

  if (!data) {
    return <section className="h-screen grid place-items-center"><h1>Setup incomplete. Please populate Hero data in Sanity Studio.</h1></section>;
  }

  return (
    // Pass the fetched data down to the Client Component
    <HeroContent data={data} />
  );
};