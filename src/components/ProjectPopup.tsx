"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/sanity-image';
import {Navigation, X} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

type Project = {
  title?: string;
  shortDescription?: string;
  detailedDescription?: any[];
  thumbnail?: any;
  links?: { label: string; url: string }[];
  gallery?: any[];
};

interface ProjectPopupProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const imageUrl = project.thumbnail ? urlFor(project.thumbnail).width(1200).height(800).url() : undefined;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        ref={dialogRef}
        className="relative mx-auto flex flex-col mt-10 mb-10 w-[92vw] max-w-5xl h-[65lvh] max-h-[85vh] rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="sticky h-[10%] rounded-t-2xl top-0 z-10 flex items-center justify-between border-b bg-white/80 px-6 py-4 backdrop-blur">
          <h3 id="project-modal-title" className="text-xl font-semibold">
            {project.title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="h-[90%] w-full p-6 flex flex-col md:flex-row gap-6 overflow-y-auto md:overflow-y-hidden">

            {/* image gallery */}

            <Swiper className='w-full flex justify-center items-center md:w-[40%]' modules={[Pagination]} pagination={true} slidesPerView={1} spaceBetween={30} >
                {Array.isArray(project.gallery) && project.gallery.length > 0 && (
                <div className="relative w-full overflow-hidden rounded-xl border">
                    {project.gallery.map((item: any, idx: number) => {
                        const gUrl = item ? urlFor(item).width(1200).height(800).url() : undefined;
                        if (!gUrl) return null;
                        return (
                            <SwiperSlide key={idx}>
                                <Image
                                    src={gUrl}
                                    alt={`${project.title || 'Project'} image ${idx + 1}`}
                                    width={1200}
                        height={800}
                        className="h-auto w-full object-cover"
                        placeholder={project.thumbnail?.asset?.metadata?.lqip ? 'blur' : 'empty'}
                        blurDataURL={project.thumbnail?.asset?.metadata?.lqip}
                    />
                    </SwiperSlide>
                )})}
                </div>
            )}
                
            </Swiper>

        
          <div className='w-full md:w-[60%] md:overflow-y-auto'>
            
          

          {/* Descriptions */}
          {project.shortDescription && (
            <p className="text-gray-700">{project.shortDescription}</p>
          )}

          {/* Simple rendering for detailedDescription if it's array of blocks with children */}
          {Array.isArray(project.detailedDescription) && project.detailedDescription.length > 0 && (
            <div className="space-y-3">
              {project.detailedDescription.map((block: any, idx: number) => {
                const text = Array.isArray(block.children)
                  ? block.children.map((c: any) => c.text).join('')
                  : '';
                return (
                  <p key={idx} className="text-gray-800 leading-relaxed">
                    {text}
                  </p>
                );
              })}
            </div>
          )}

          {/* Links */}
          {Array.isArray(project.links) && project.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.links.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border px-3 py-2 text-sm text-blue-600 hover:bg-blue-50"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}

        </div>

          {/* Gallery (images only) */}
          {/* {Array.isArray(project.gallery) && project.gallery.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.gallery.map((item: any, idx: number) => {
                const gUrl = item ? urlFor(item).width(1000).height(700).url() : undefined;
                if (!gUrl) return null;
                return (
                  <div key={idx} className="relative overflow-hidden rounded-lg border">
                    <Image
                      src={gUrl}
                      alt={`${project.title || 'Project'} image ${idx + 1}`}
                      width={1000}
                      height={700}
                      className="h-auto w-full object-cover"
                      placeholder={item?.asset?.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={item?.asset?.metadata?.lqip}
                    />
                  </div>
                );
              })}
            </div>
          )}
           */}
        </div>
      </div>
    </div>
  );
};

export default ProjectPopup;