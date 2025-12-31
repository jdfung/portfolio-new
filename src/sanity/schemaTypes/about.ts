import {defineField, defineType} from 'sanity'

export const about = defineType({
    name: 'about',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true, // Allows cropping based on a focal point
            },
            description: 'A high-res image of yourself or an avatar.',
          }),
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'socials',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'label', type: 'string' },
                  { name: 'url', type: 'url' },
                  { name: 'icon', type: 'image', options: {
                    hotspot: true,
                  } },
                ],
              },
            ],
          }),
    ],
})
