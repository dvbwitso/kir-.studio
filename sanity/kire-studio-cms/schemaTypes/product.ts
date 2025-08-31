import {defineType} from 'sanity'

export default defineType({
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
      name: 'originalPrice',
      title: 'Original Price (if on discount)',
      type: 'string',
      placeholder: 'e.g., ZMW 300',
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
      title: 'New Product',
      type: 'boolean',
      initialValue: false,
      description: 'Mark as new product to show "NEW" tag'
    },
    {
      name: 'newUntil',
      title: 'Show as New Until',
      type: 'datetime',
      description: 'Product will show "NEW" tag until this date. Leave empty to manually control.',
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
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.required().min(0)
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
})
