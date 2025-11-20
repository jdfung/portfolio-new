import {defineField, defineType} from 'sanity'

export const project = defineType({
    name: 'project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
    ],
})
