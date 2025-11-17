// Simple data service to replace Sanity CMS
import servicesData from '../data/services.json'
import productsData from '../data/products.json'

export interface Service {
  id: string
  name: string
  description: string
  duration: string
  price: string
  category: string
  image: string
  order: number
}

export interface Product {
  id: string
  name: string
  category: string
  description: string
  price: string
  stock: number
  inStock: boolean
  image: string
  order: number
}

// Fetch all services
export const fetchServices = async (): Promise<Service[]> => {
  // Simulate API delay for consistency
  await new Promise(resolve => setTimeout(resolve, 100))
  return servicesData as Service[]
}

// Fetch services by category
export const fetchServicesByCategory = async (category: string): Promise<Service[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return (servicesData as Service[]).filter(service => service.category === category)
}

// Fetch single service by ID
export const fetchServiceById = async (id: string): Promise<Service | null> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return (servicesData as Service[]).find(service => service.id === id) || null
}

// Get all service categories
export const getServiceCategories = (): string[] => {
  const categories = new Set((servicesData as Service[]).map(s => s.category))
  return Array.from(categories)
}

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return productsData as Product[]
}

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return (productsData as Product[]).filter(product => product.category === category)
}

// Fetch single product by ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 100))
  return (productsData as Product[]).find(product => product.id === id) || null
}

// Get all product categories
export const getProductCategories = (): string[] => {
  const categories = new Set((productsData as Product[]).map(p => p.category))
  return Array.from(categories)
}

// Helper function for image URLs (replaces Sanity's urlFor)
export const getImageUrl = (imagePath: string): string => {
  return imagePath
}

// Helper to check if an item is new
export const isItemNew = (_item: Service | Product): boolean => {
  // Items don't have newUntil in JSON, so return false
  return false
}

// Helper to get discounted price
export const getDiscountedPrice = (_item: Service | Product): string | null => {
  // No discount support in static JSON
  return null
}

// Helper to format discount
export const formatDiscount = (_item: Service | Product): string => {
  // No discount support in static JSON
  return ''
}
