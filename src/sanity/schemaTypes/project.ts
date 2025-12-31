import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
    }),
    defineField({
      name: "sectionDescription",
      title: "Section Description",
      type: "string",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        {
          type: "object",
          name: "projectItem",
          title: "Project Item",
          fields: [
            defineField({
              name: "title",
              title: "Project Title",
              type: "string",
              validation: Rule => Rule.required(),
            }),

            defineField({
              name: "thumbnail",
              title: "Thumbnail",
              type: "image",
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            }),

            defineField({
              name: "shortDescription",
              title: "Short Description",
              type: "text",
              rows: 3,
            }),

            defineField({
              name: "detailedDescription",
              title: "Detailed Description",
              type: "array",
              of: [{ type: "block" }],
              description: "Rich text content shown inside modal",
            }),

            defineField({
              name: "gallery",
              title: "Gallery Images / Videos / GIFs",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                },
                {
                  type: "file",
                  title: "Video",
                  fields: [
                    {
                      name: "title",
                      type: "string",
                      title: "Title (Optional)",
                    },
                  ],
                },
              ],
            }),

            defineField({
              name: "links",
              title: "Project Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Label" },
                    { name: "url", type: "url", title: "URL" },
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "clients",
      title: "Clients",
      type: "array",
      of: [
        {
          type: "object",
          name: "clientItem",
          title: "Client Item",
          fields: [
            defineField({
              name: "clientName",
              title: "Client Name",
              type: "string",
              validation: Rule => Rule.required(),
            }),

            defineField({
              name: "thumbnail",
              title: "Thumbnail",
              type: "image",
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});
