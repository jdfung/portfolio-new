// lib/sanity/groq.ts

// Fetches the single hero document and projects necessary fields
export const heroQuery = `*[_type == "hero"][0]{
    name,
    roleTitle,
    tagline,
    "heroImage": heroImage.asset->{
      url,
      metadata{
        lqip // Low Quality Image Placeholder
      }
    }
  }`;