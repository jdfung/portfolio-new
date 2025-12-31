"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/sanity-image';
import ProjectPopup from '@/components/ProjectPopup';

const ProjectContent = ({ data }: { data: any }) => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const clientCount = Array.isArray(data?.clients) ? data.clients.length : 0;

  const projects = Array.isArray(data?.projects) ? data.projects : [];
  const visibleProjects = projects.slice(0, visibleCount);


  return (
    <section id="projects" className="project-section h-max min-h-screen flex flex-col gap-10 items-center justify-center px-10 py-16 relative z-10 bg-kuro">
        
        {data.clients && (
          <div className='clients-section flex flex-col w-full items-center justify-center gap-10 min-h-[100lvh]'>
            <h1 className='text-4xl text-center text-shiro font-bold'>It’s cool that these people trust me in what I do</h1>

            <div className="marquee w-full lg:block hidden overflow-hidden">
              <div className="track flex w-max items-center gap-6 text-shiro text-6xl">
                {[...data.clients, ...data.clients].map((client: any, index: number) => (
                  <div
                    key={index}
                    className="client-tile flex-shrink-0 w-max flex flex-col items-center gap-2 bg-shiro rounded-lg"
                  >
                    <Image
                      src={urlFor(client.thumbnail).width(400).height(250).url()}
                      alt={client.clientName}
                      width={400}
                      height={250}
                      className="object-contain w-full h-[250px] rounded-lg"
                      placeholder="blur"
                      blurDataURL={client.thumbnail.asset.metadata.lqip}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className='lg:hidden block'>
              <div className='grid grid-cols-2 gap-4 w-full'>
                {data.clients.map((client: any, index: number) => (
                  <div
                    key={index}
                    className="client-tile w-full flex flex-col items-center gap-2 bg-shiro rounded-lg"
                  >
                    <Image
                      src={urlFor(client.thumbnail).width(400).height(250).url()}
                      alt={client.clientName}
                      width={400}
                      height={250}
                      className="object-contain w-full rounded-lg"
                      placeholder="blur"
                      blurDataURL={client.thumbnail.asset.metadata.lqip}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
        
        <div className='project-container flex flex-col items-center justify-center gap-10 w-full'>
        {data.sectionTitle || data.sectionDescription ? (
            <div className=" w-full">
                <div className="flex flex-col items-center text-center gap-2">
                    {data.sectionTitle && <h1 className="text-4xl font-bold">{data.sectionTitle}</h1>}
                    {data.sectionDescription && <p className="text-xl">{data.sectionDescription}</p>}
                </div>
            </div>
        ) : null}

        <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mobile:grid-cols-1 gap-4 w-full">
            {visibleProjects.map((project: any, index: number) => (
                <div
                  className="project-tile flex flex-col items-center gap-2 border border-nezumi rounded-lg group overflow-hidden cursor-pointer"
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(project); } }}
                >
                    <Image
                        src={urlFor(project.thumbnail).width(400).height(250).url()}
                        alt={project.title}
                        width={400}
                        height={250}
                        className="object-cover object-top w-full h-[60%] min-h-[250px] rounded-tl-lg rounded-tr-lg group-hover:scale-105 transition-all duration-300"
                        placeholder="blur"
                        blurDataURL={project.thumbnail.asset.metadata.lqip}
                                />
                    <div className="w-full p-5 h-[40%]">
                        <h2>{project.title}</h2>
                        <p>{project.shortDescription}</p>
                    </div>
                </div>
            ))}
        </div>

        {visibleCount < projects.length && (
          <div>
            <button
              type="button"
              onClick={() => {
                if (isLoadingMore) return;
                setIsLoadingMore(true);
                setTimeout(() => {
                  setVisibleCount((prev) => Math.min(prev + 6, projects.length));
                  setIsLoadingMore(false);
                }, 400);
              }}
              className={`px-5 py-2 rounded-md border text-sm transition-colors duration-200 ${
                isLoadingMore ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? 'Loading…' : 'Load more'}
            </button>
          </div>
        )}
        {selectedProject && (
          <ProjectPopup project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}

        </div>
        
    </section>
  )
}

export default ProjectContent