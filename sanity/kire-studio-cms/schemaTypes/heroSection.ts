import {defineType} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  icon: () => '🎯',
  fields: [
    {
      name: 'title',
      title: 'Main Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required()
    },
    {
      name: 'ctaText',
      title: 'Call-to-Action Text',
      type: 'string',
      placeholder: 'e.g., Book Now',
      validation: Rule => Rule.required()
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage'
    }
  }
})
