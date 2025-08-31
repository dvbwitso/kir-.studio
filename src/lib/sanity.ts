import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Enable CDN for faster response times
  apiVersion: '2024-01-01', // Use current date
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// Fetch functions for different content types
export const fetchServices = async () => {
  return await client.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      name,
      category,
      description,
      duration,
      price,
      image,
      order
    }
  `)
}

export const fetchProducts = async () => {
  return await client.fetch(`
    *[_type == "product"] | order(order asc) {
      _id,
      name,
      category,
      description,
      price,
      image,
      inStock,
      order
    }
  `)
}

export const fetchHeroContent = async () => {
  return await client.fetch(`
    *[_type == "heroSection"][0] {
      title,
      subtitle,
      ctaText,
      backgroundImage
    }
  `)
}

export const fetchAboutContent = async () => {
  return await client.fetch(`
    *[_type == "aboutSection"][0] {
      title,
      content,
      image,
      features[]
    }
  `)
}
