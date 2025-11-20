import { type SchemaTypeDefinition } from 'sanity'
import { hero } from './hero'
import { about } from './about'
import { skill } from './skill'
import { project } from './project'
import { experience } from './experience'
import { types } from 'util'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    about,
    skill,
    project,
    experience,
    ],
}
