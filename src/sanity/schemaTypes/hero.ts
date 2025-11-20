import {defineField, defineType} from 'sanity'

export const hero = defineType({
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Your Name',
        type: 'string',
        description: 'The main name displayed in the hero.',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'roleTitle',
        title: 'Role Title',
        type: 'string',
        description: 'e.g., Full Stack Developer, UI/UX Engineer',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'tagline',
        title: 'Short Tagline',
        type: 'text',
        rows: 2,
        description: 'A brief, engaging statement.',
      }),
      defineField({
        name: 'heroImage',
        title: 'Hero Image (Optional)',
        type: 'image',
        options: {
          hotspot: true, // Allows cropping based on a focal point
        },
        description: 'A high-res image of yourself or an avatar.',
      }),
    ],
    // Ensures only one Hero document can exist in the studio
    initialValue: {
      name: 'Jane Doe',
    },
  });