// Sanity Schema Types for TypeScript

export interface SanityService {
  _id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  price: string;
  image: SanityImageAsset;
  order: number;
}

export interface SanityProduct {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: SanityImageAsset;
  inStock: boolean;
  order: number;
}

export interface SanityImageAsset {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SanityHeroSection {
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage: SanityImageAsset;
}

export interface SanityAboutSection {
  title: string;
  content: string;
  image: SanityImageAsset;
  features: string[];
}
