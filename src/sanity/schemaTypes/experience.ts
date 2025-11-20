import {defineField, defineType} from 'sanity'

export const experience = defineType({
    name: 'experience',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
    ],
})
