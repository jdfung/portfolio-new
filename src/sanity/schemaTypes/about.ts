import {defineField, defineType} from 'sanity'

export const about = defineType({
    name: 'about',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
    ],
})
