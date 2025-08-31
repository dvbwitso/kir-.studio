import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '3klw8jzl',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01'
});

const services = [
  // Facial Treatments
  {
    _type: 'service',
    name: 'Classic Facial',
    description: 'Deep cleansing and moisturizing facial treatment',
    duration: '60 min',
    price: 'ZMW 250',
    category: 'Facial Treatments',
    slug: { _type: 'slug', current: 'classic-facial' }
  },
  {
    _type: 'service',
    name: 'Custom Facial',
    description: 'Personalized facial based on your skin type',
    duration: '75 min', 
    price: 'ZMW 350',
    category: 'Facial Treatments',
    slug: { _type: 'slug', current: 'custom-facial' }
  },
  {
    _type: 'service',
    name: 'Vitamin C Facial',
    description: 'Brightening treatment with vitamin C infusion',
    duration: '70 min',
    price: 'ZMW 300',
    category: 'Facial Treatments',
    slug: { _type: 'slug', current: 'vitamin-c-facial' }
  },
  {
    _type: 'service',
    name: 'Men\'s Facial',
    description: 'Specialized facial treatment designed for men\'s skin',
    duration: '60 min',
    price: 'ZMW 280',
    category: 'Facial Treatments',
    slug: { _type: 'slug', current: 'mens-facial' }
  },
  {
    _type: 'service',
    name: 'Derma Planing',
    description: 'Exfoliation treatment for smooth, glowing skin',
    duration: '45 min',
    price: 'ZMW 200',
    category: 'Facial Treatments',
    slug: { _type: 'slug', current: 'derma-planing' }
  },
  // Body Treatments
  {
    _type: 'service',
    name: 'Full Body Wax',
    description: 'Professional hair removal with premium wax and aftercare',
    duration: '90 min',
    price: 'ZMW 500',
    category: 'Body Treatments',
    slug: { _type: 'slug', current: 'full-body-wax' }
  },
  {
    _type: 'service',
    name: 'Brazilian Wax',
    description: 'Intimate waxing service with utmost care and hygiene',
    duration: '45 min',
    price: 'ZMW 200',
    category: 'Body Treatments',
    slug: { _type: 'slug', current: 'brazilian-wax' }
  },
  {
    _type: 'service',
    name: 'Relaxation Massage',
    description: 'Full body therapeutic massage for stress relief',
    duration: '75 min',
    price: 'ZMW 400',
    category: 'Body Treatments',
    slug: { _type: 'slug', current: 'relaxation-massage' }
  },
  // Lash Services
  {
    _type: 'service',
    name: 'Classic Lash Extensions',
    description: 'Natural-looking individual lash extensions',
    duration: '120 min',
    price: 'ZMW 300',
    category: 'Lash Services',
    slug: { _type: 'slug', current: 'classic-lash-extensions' }
  },
  {
    _type: 'service',
    name: 'Volume Lashes',
    description: 'Dramatic, full-volume lash extensions',
    duration: '150 min',
    price: 'ZMW 450',
    category: 'Lash Services',
    slug: { _type: 'slug', current: 'volume-lashes' }
  },
  {
    _type: 'service',
    name: 'Lash Lift & Tint',
    description: 'Natural curl and color enhancement',
    duration: '60 min',
    price: 'ZMW 180',
    category: 'Lash Services',
    slug: { _type: 'slug', current: 'lash-lift-tint' }
  }
];

const products = [
  {
    _type: 'product',
    name: 'Nourishing Body Oil',
    category: 'Body Oils',
    description: 'Luxurious blend of natural oils for silky smooth skin',
    price: 'ZMW 180',
    stock: 15,
    inStock: true,
    slug: { _type: 'slug', current: 'nourishing-body-oil' }
  },
  {
    _type: 'product',
    name: 'Relaxing Lavender Oil',
    category: 'Body Oils',
    description: 'Calming lavender-infused oil for evening relaxation',
    price: 'ZMW 200',
    stock: 8,
    inStock: true,
    slug: { _type: 'slug', current: 'relaxing-lavender-oil' }
  },
  {
    _type: 'product',
    name: 'Vitamin C Brightening Serum',
    category: 'Face Serums',
    description: 'Antioxidant-rich serum for radiant, even skin tone',
    price: 'ZMW 250',
    stock: 12,
    inStock: true,
    slug: { _type: 'slug', current: 'vitamin-c-brightening-serum' }
  },
  {
    _type: 'product',
    name: 'Hyaluronic Acid Serum',
    category: 'Face Serums',
    description: 'Deep hydration serum for plump, youthful skin',
    price: 'ZMW 280',
    stock: 0,
    inStock: false,
    slug: { _type: 'slug', current: 'hyaluronic-acid-serum' }
  },
  {
    _type: 'product',
    name: 'Retinol Night Serum',
    category: 'Face Serums',
    description: 'Gentle retinol formula for overnight skin renewal',
    price: 'ZMW 320',
    stock: 3,
    inStock: true,
    slug: { _type: 'slug', current: 'retinol-night-serum' }
  },
  {
    _type: 'product',
    name: 'Rejuvenating Argan Oil',
    category: 'Body Oils',
    description: 'Pure argan oil for deep nourishment and repair',
    price: 'ZMW 220',
    stock: 20,
    inStock: true,
    slug: { _type: 'slug', current: 'rejuvenating-argan-oil' }
  }
];

async function migrateContent() {
  try {
    console.log('🚀 Starting content migration...');
    
    // Create all services
    console.log('\n📋 Migrating services...');
    for (const service of services) {
      const result = await client.create(service);
      console.log(`✅ Created service: ${service.name} (${result._id})`);
    }
    
    // Create all products
    console.log('\n🛍️ Migrating products...');
    for (const product of products) {
      const result = await client.create(product);
      console.log(`✅ Created product: ${product.name} (${result._id})`);
    }
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('📱 View your content at: https://kire-studio.sanity.studio/');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

migrateContent();
