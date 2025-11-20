import {defineField, defineType} from 'sanity'

export const skill = defineType({
    name: 'skill',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
    ],
})
