// lib/sanity/groq.ts

// Fetches the single hero document and projects necessary fields
export const heroQuery = `*[_type == "hero"][0]{
    name,
    symbol,
    roleTitle,
    tagline,
    "resume": resume.asset->{
      url
    }
  }`;

  export const aboutQuery = `*[_type == "about"][0]{
    title,
    description,
    image{
      asset->{
        url,
        metadata{
          lqip
        }
      }
    },
    socials[]{
      label,
      url,
      icon{
        asset->{
          url,
          metadata{
            lqip
          }
        }
      }
    }
  }`;

  export const projectsQuery = `
  *[_type == "project"][0]{
    sectionTitle,
    sectionDescription,
    projects[]{
      title,
      shortDescription,
      thumbnail{
        asset->{
          url,
          metadata { lqip }
        }
      },
      detailedDescription[],
      links[],
      gallery[]{
        ...,
        asset->{
          url,
          metadata { lqip }
        }
      }
    },
    clients[]{
      clientName,
      thumbnail{
        asset->{
          url,
          metadata { lqip }
        }
      },
    }
  }
  `;


  