import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key Points',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points displayed in the hero section',
    }),
    defineField({
      name: 'stat1Value',
      title: 'Stat 1 Value',
      type: 'string',
      description: 'e.g., "10+"',
    }),
    defineField({
      name: 'stat1Label',
      title: 'Stat 1 Label',
      type: 'string',
      description: 'e.g., "Years Experience"',
    }),
    defineField({
      name: 'stat2Value',
      title: 'Stat 2 Value',
      type: 'string',
      description: 'e.g., "100+"',
    }),
    defineField({
      name: 'stat2Label',
      title: 'Stat 2 Label',
      type: 'string',
      description: 'e.g., "Projects Completed"',
    }),
    defineField({
      name: 'stat3Value',
      title: 'Stat 3 Value',
      type: 'string',
      description: 'e.g., "100%"',
    }),
    defineField({
      name: 'stat3Label',
      title: 'Stat 3 Label',
      type: 'string',
      description: 'e.g., "Client Satisfaction"',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare() {
      return {
        title: 'Hero Section',
      };
    },
  },
});
