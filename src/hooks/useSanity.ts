import { useState, useEffect } from 'react'
import { fetchServices, fetchProducts, fetchHeroContent, fetchAboutContent } from '../lib/sanity'
import type { SanityService, SanityProduct, SanityHeroSection, SanityAboutSection } from '../types/sanity'

export const useServices = () => {
  const [services, setServices] = useState<SanityService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices()
        setServices(data)
      } catch (err) {
        setError('Failed to load services')
        console.error('Error fetching services:', err)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  return { services, loading, error }
}

export const useProducts = () => {
  const [products, setProducts] = useState<SanityProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch (err) {
        setError('Failed to load products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return { products, loading, error }
}

export const useHeroContent = () => {
  const [heroContent, setHeroContent] = useState<SanityHeroSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const data = await fetchHeroContent()
        setHeroContent(data)
      } catch (err) {
        setError('Failed to load hero content')
        console.error('Error fetching hero content:', err)
      } finally {
        setLoading(false)
      }
    }

    loadHeroContent()
  }, [])

  return { heroContent, loading, error }
}

export const useAboutContent = () => {
  const [aboutContent, setAboutContent] = useState<SanityAboutSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAboutContent = async () => {
      try {
        const data = await fetchAboutContent()
        setAboutContent(data)
      } catch (err) {
        setError('Failed to load about content')
        console.error('Error fetching about content:', err)
      } finally {
        setLoading(false)
      }
    }

    loadAboutContent()
  }, [])

  return { aboutContent, loading, error }
}
