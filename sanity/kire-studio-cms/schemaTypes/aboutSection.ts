import {defineType} from 'sanity'

export default defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  icon: () => '📖',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Main Content',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'About Image',
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
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key features or services highlights'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
})
