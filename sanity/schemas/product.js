export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: () => '🧴',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Face Serums', value: 'Face Serums' },
          { title: 'Body Oils', value: 'Body Oils' },
          { title: 'Cleansers', value: 'Cleansers' },
          { title: 'Moisturizers', value: 'Moisturizers' }
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
      name: 'price',
      title: 'Price',
      type: 'string',
      placeholder: 'e.g., ZMW 250',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Product Image',
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
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide product availability'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which products appear (lower numbers first)'
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
}
