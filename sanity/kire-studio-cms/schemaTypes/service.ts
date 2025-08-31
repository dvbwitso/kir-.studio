import {defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: () => '💆‍♀️',
  fields: [
    {
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Facial Treatments', value: 'Facial Treatments' },
          { title: 'Body Treatments', value: 'Body Treatments' },
          { title: 'Lash Services', value: 'Lash Services' },
          { title: 'Massage Therapy', value: 'Massage Therapy' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      placeholder: 'e.g., 60 min',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      placeholder: 'e.g., ZMW 400',
      validation: Rule => Rule.required()
    },
    {
      name: 'originalPrice',
      title: 'Original Price (if on discount)',
      type: 'string',
      placeholder: 'e.g., ZMW 500',
      description: 'Leave empty if not on discount'
    },
    {
      name: 'discountPercentage',
      title: 'Discount Percentage',
      type: 'number',
      validation: Rule => Rule.min(0).max(100),
      description: 'Enter discount percentage (0-100). Leave empty if no discount.'
    },
    {
      name: 'isNew',
      title: 'New Service',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as new service to show "NEW" tag'
    },
    {
      name: 'newUntil',
      title: 'Show as New Until',
      type: 'datetime',
      description: 'Service will show "NEW" tag until this date. Leave empty to manually control.',
      hidden: ({document}) => !document?.isNew
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which services appear (lower numbers first)'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image'
    }
  },
  orderings: [
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
})
