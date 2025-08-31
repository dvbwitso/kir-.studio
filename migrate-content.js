const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
  projectId: '3klw8jzl',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN, // You'll need to set this
  apiVersion: '2024-01-01'
});

// Services data from Services.tsx
const servicesData = [
  // Facial Treatments
  {
    name: 'Classic Facial',
    description: 'Deep cleansing and moisturizing facial treatment',
    duration: '60 min',
    price: 'ZMW 250',
    image: '/images/services/classic-facial.jpg',
    category: 'Facial Treatments'
  },
  {
    name: 'Custom Facial',
    description: 'Personalized facial based on your skin type',
    duration: '75 min', 
    price: 'ZMW 350',
    image: '/images/services/custom-facial.jpg',
    category: 'Facial Treatments'
  },
  {
    name: 'Vitamin C Facial',
    description: 'Brightening treatment with vitamin C infusion',
    duration: '70 min',
    price: 'ZMW 300',
    image: '/images/services/vitamin-c-facial.png',
    category: 'Facial Treatments'
  },
  {
    name: 'Men\'s Facial',
    description: 'Specialized facial treatment designed for men\'s skin',
    duration: '60 min',
    price: 'ZMW 280',
    image: '/images/services/mens-facial.avif',
    category: 'Facial Treatments'
  },
  {
    name: 'Derma Planing',
    description: 'Exfoliation treatment for smooth, glowing skin',
    duration: '45 min',
    price: 'ZMW 200',
    image: '/images/services/derma-planing.png',
    category: 'Facial Treatments'
  },
  // Body Treatments
  {
    name: 'Full Body Wax',
    description: 'Professional hair removal with premium wax and aftercare',
    duration: '90 min',
    price: 'ZMW 500',
    image: '/images/services/full-body-wax.jpg',
    category: 'Body Treatments'
  },
  {
    name: 'Brazilian Wax',
    description: 'Intimate waxing service with utmost care and hygiene',
    duration: '45 min',
    price: 'ZMW 200',
    image: '/images/services/brazilian-wax.jpg',
    category: 'Body Treatments'
  },
  {
    name: 'Relaxation Massage',
    description: 'Full body therapeutic massage for stress relief',
    duration: '75 min',
    price: 'ZMW 400',
    image: '/images/services/relaxation-massage.jpg',
    category: 'Body Treatments'
  },
  // Lash Services
  {
    name: 'Classic Lash Extensions',
    description: 'Natural-looking individual lash extensions',
    duration: '120 min',
    price: 'ZMW 300',
    image: '/images/services/classic-lash-extensions.jpg',
    category: 'Lash Services'
  },
  {
    name: 'Volume Lashes',
    description: 'Dramatic, full-volume lash extensions',
    duration: '150 min',
    price: 'ZMW 450',
    image: '/images/services/volume-lashes.jpg',
    category: 'Lash Services'
  },
  {
    name: 'Lash Lift & Tint',
    description: 'Natural curl and color enhancement',
    duration: '60 min',
    price: 'ZMW 180',
    image: '/images/services/lash-lift-tint.avif',
    category: 'Lash Services'
  }
];

// Products data from Shop.tsx
const productsData = [
  {
    id: 'body-oil-1',
    name: 'Nourishing Body Oil',
    category: 'Body Oils',
    description: 'Luxurious blend of natural oils for silky smooth skin',
    price: 'ZMW 180',
    image: '/images/products/naurishing-body-oil.jpg',
    stock: 15
  },
  {
    id: 'body-oil-2',
    name: 'Relaxing Lavender Oil',
    category: 'Body Oils',
    description: 'Calming lavender-infused oil for evening relaxation',
    price: 'ZMW 200',
    image: '/images/products/relaxing-lavendar.jpg',
    stock: 8
  },
  {
    id: 'serum-1',
    name: 'Vitamin C Brightening Serum',
    category: 'Face Serums',
    description: 'Antioxidant-rich serum for radiant, even skin tone',
    price: 'ZMW 250',
    image: '/images/products/vitamin-c-serum.jpg',
    stock: 12
  },
  {
    id: 'serum-2',
    name: 'Hyaluronic Acid Serum',
    category: 'Face Serums',
    description: 'Deep hydration serum for plump, youthful skin',
    price: 'ZMW 280',
    image: '/images/products/Hyaluronic-Acid-Serum.jpg',
    stock: 0
  },
  {
    id: 'serum-3',
    name: 'Retinol Night Serum',
    category: 'Face Serums',
    description: 'Gentle retinol formula for overnight skin renewal',
    price: 'ZMW 320',
    image: '/images/products/Retinol-Night-Serum.jpg',
    stock: 3
  },
  {
    id: 'body-oil-3',
    name: 'Rejuvenating Argan Oil',
    category: 'Body Oils',
    description: 'Pure argan oil for deep nourishment and repair',
    price: 'ZMW 220',
    image: '/images/products/naurishing-body-oil.jpg',
    stock: 20
  }
];

async function uploadImage(imagePath) {
  try {
    // For now, we'll just return the image path as a reference
    // In a full implementation, you'd upload the actual image file to Sanity
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: `image-${imagePath.split('/').pop().split('.')[0]}`
      },
      alt: imagePath.split('/').pop().split('.')[0].replace(/-/g, ' ')
    };
  } catch (error) {
    console.error('Error handling image:', imagePath, error);
    return null;
  }
}

async function migrateServices() {
  console.log('🚀 Starting services migration...');
  
  for (const service of servicesData) {
    try {
      const serviceDoc = {
        _type: 'service',
        name: service.name,
        description: service.description,
        duration: service.duration,
        price: service.price,
        category: service.category,
        image: await uploadImage(service.image),
        slug: {
          _type: 'slug',
          current: service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        }
      };

      const result = await client.create(serviceDoc);
      console.log(`✅ Created service: ${service.name} (ID: ${result._id})`);
    } catch (error) {
      console.error(`❌ Failed to create service: ${service.name}`, error);
    }
  }
}

async function migrateProducts() {
  console.log('🚀 Starting products migration...');
  
  for (const product of productsData) {
    try {
      const productDoc = {
        _type: 'product',
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        image: await uploadImage(product.image),
        slug: {
          _type: 'slug',
          current: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        },
        inStock: product.stock > 0
      };

      const result = await client.create(productDoc);
      console.log(`✅ Created product: ${product.name} (ID: ${result._id})`);
    } catch (error) {
      console.error(`❌ Failed to create product: ${product.name}`, error);
    }
  }
}

async function main() {
  try {
    console.log('🎯 Starting content migration to Sanity CMS...\n');
    
    // Check if we have a token
    if (!process.env.SANITY_TOKEN) {
      console.error('❌ SANITY_TOKEN environment variable is required');
      console.log('📋 To get a token:');
      console.log('   1. Go to https://sanity.io/manage');
      console.log('   2. Select your project (3klw8jzl)');
      console.log('   3. Go to API > Tokens');
      console.log('   4. Create a new token with Editor permissions');
      console.log('   5. Run: export SANITY_TOKEN="your_token_here"');
      process.exit(1);
    }

    await migrateServices();
    console.log('\n');
    await migrateProducts();
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('📱 You can now view your content at: https://kire-studio.sanity.studio/');
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

main();
