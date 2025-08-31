import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '3klw8jzl',
  dataset: 'production',
  useCdn: true, // Enable CDN for better CORS handling
  apiVersion: '2024-01-01',
  perspective: 'published',
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// Type definitions
export interface Service {
  _id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  originalPrice?: string;
  discountPercentage?: number;
  category: string;
  isNew?: boolean;
  newUntil?: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  };
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  discountPercentage?: number;
  category: string;
  stock: number;
  inStock: boolean;
  isNew?: boolean;
  newUntil?: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  };
}

// Fetch functions for different content types
export const fetchServices = async (): Promise<Service[]> => {
  try {
    console.log('Attempting to fetch services from Sanity...');
    console.log('Client config:', {
      projectId: client.config().projectId,
      dataset: client.config().dataset,
      useCdn: client.config().useCdn,
      apiVersion: client.config().apiVersion
    });
    
    const services = await client.fetch(`
      *[_type == "service"] | order(category asc, name asc) {
        _id,
        name,
        category,
        description,
        duration,
        price,
        originalPrice,
        discountPercentage,
        isNew,
        newUntil,
        slug,
        image {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    `);
    
    console.log('Successfully fetched services:', services);
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: (error as any)?.statusCode,
      response: (error as any)?.response
    });
    return [];
  }
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    return await client.fetch(`
      *[_type == "product"] | order(category asc, name asc) {
        _id,
        name,
        category,
        description,
        price,
        originalPrice,
        discountPercentage,
        stock,
        inStock,
        isNew,
        newUntil,
        slug,
        image {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    `)
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Real-time subscription functions
export const subscribeToServices = (callback: (services: Service[]) => void) => {
  const query = `*[_type == "service"]`;
  
  return client.listen(query).subscribe((update) => {
    console.log('Service updated:', update);
    // Refetch all services when any service is updated
    fetchServices().then(callback);
  });
};

export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const query = `*[_type == "product"]`;
  
  return client.listen(query).subscribe((update) => {
    console.log('Product updated:', update);
    // Refetch all products when any product is updated
    fetchProducts().then(callback);
  });
};

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

// Utility functions for new features

// Check if an item is new based on isNew flag and newUntil date
export const isItemNew = (item: Service | Product): boolean => {
  if (!item.isNew) return false;
  
  if (item.newUntil) {
    const newUntilDate = new Date(item.newUntil);
    const now = new Date();
    return now <= newUntilDate;
  }
  
  return true; // If no end date is set, it's always new if isNew is true
};

// Calculate discount price
export const getDiscountedPrice = (item: Service | Product): { 
  currentPrice: string, 
  originalPrice?: string, 
  discountPercentage?: number,
  hasDiscount: boolean 
} => {
  if (item.discountPercentage && item.originalPrice) {
    return {
      currentPrice: item.price,
      originalPrice: item.originalPrice,
      discountPercentage: item.discountPercentage,
      hasDiscount: true
    };
  }
  
  return {
    currentPrice: item.price,
    hasDiscount: false
  };
};

// Format discount display
export const formatDiscount = (discountPercentage: number): string => {
  return `${Math.round(discountPercentage)}% OFF`;
};

// Delete functions (for admin use)
export const deleteService = async (serviceId: string): Promise<boolean> => {
  try {
    await client.delete(serviceId);
    console.log(`Service ${serviceId} deleted successfully`);
    return true;
  } catch (error) {
    console.error('Error deleting service:', error);
    return false;
  }
};

export const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    await client.delete(productId);
    console.log(`Product ${productId} deleted successfully`);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};

// Bulk operations
export const bulkUpdateDiscount = async (
  itemIds: string[], 
  discountPercentage: number,
  type: 'service' | 'product'
): Promise<boolean> => {
  try {
    const patches = itemIds.map(id => ({
      id,
      patch: {
        discountPercentage: discountPercentage > 0 ? discountPercentage : undefined,
        // You might want to also update originalPrice here
      }
    }));

    await Promise.all(patches.map(({id, patch}) => client.patch(id).set(patch).commit()));
    console.log(`Bulk discount applied to ${itemIds.length} ${type}s`);
    return true;
  } catch (error) {
    console.error('Error applying bulk discount:', error);
    return false;
  }
};
