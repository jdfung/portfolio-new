import React from 'react'
import { sanityFetch } from '@/sanity/lib/client';
import { projectsQuery } from '@/lib/sanity/groq';
import ProjectContent from '@/components/ProjectContent';

interface ProjectData {
    sectionTitle: string;
    sectionDescription: string;
    projects: {
        title: string;
        slug: string;
        shortDescription: string;
        thumbnail: {
            url: string;
            metadata: {
                lqip: string;
            };
        };
        detailedDescription: string;
        links: {
            label: string;
            url: string;
        }[];
        gallery: {
            asset: {
                url: string;
                metadata: {
                    lqip: string;
                };
            };
        }[];
    }
}       

export const Project = async () => {

    const data = await sanityFetch<ProjectData>(projectsQuery);

    if (!data) {
        return <section className="h-screen grid place-items-center"><h1>Setup incomplete. Please populate Project data in Sanity Studio.</h1></section>;
    }


  return (
    <div>
        <ProjectContent data={data} />
    </div>
  )
}
