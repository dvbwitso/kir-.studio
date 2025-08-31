import { client } from '../src/lib/sanity'

// Migration script to upload existing services and products to Sanity CMS
// Run this once after setting up your Sanity project

const existingServices = [
  {
    name: 'Classic Facial',
    category: 'Facial Treatments',
    description: 'A refreshing deep pore cleanse with exfoliation and extractions, designed to leave your skin clean, soft, and glowing. A perfect go-to for anyone in need of a reset and relaxation.',
    duration: '60 min',
    price: 'K400',
    order: 1
  },
  {
    name: 'Vitamin C Facial',
    category: 'Facial Treatments', 
    description: 'Brighten, hydrate, and even out your skin tone. This glow-boosting treatment is rich in antioxidants, targets hyperpigmentation, and leaves your skin with a fresh, radiant finish.',
    duration: '75 min',
    price: 'K550',
    order: 2
  },
  {
    name: "Men's Facial",
    category: 'Facial Treatments',
    description: "Tailored specifically for men's skincare needs. This facial deeply cleanses the skin, helps prevent ingrown hairs, balances oil, and soothes irritation from shaving — leaving skin refreshed and sharp.",
    duration: '60 min',
    price: 'K500',
    order: 3
  },
  // Add more services...
]

const existingProducts = [
  {
    name: 'Nourishing Body Oil',
    category: 'Body Oils',
    description: 'Luxurious blend of natural oils for silky smooth skin',
    price: 'ZMW 180',
    inStock: true,
    order: 1
  },
  {
    name: 'Relaxing Lavender Oil',
    category: 'Body Oils',
    description: 'Calming lavender-infused oil for evening relaxation',
    price: 'ZMW 200',
    inStock: true,
    order: 2
  },
  // Add more products...
]

const migrateData = async () => {
  try {
    console.log('Starting data migration...')
    
    // Migrate services
    for (const service of existingServices) {
      const doc = {
        _type: 'service',
        ...service
      }
      
      const result = await client.create(doc)
      console.log(`Created service: ${result.name}`)
    }
    
    // Migrate products
    for (const product of existingProducts) {
      const doc = {
        _type: 'product',
        ...product
      }
      
      const result = await client.create(doc)
      console.log(`Created product: ${result.name}`)
    }
    
    console.log('Migration completed successfully!')
    
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Uncomment to run migration
// migrateData()

export { migrateData }
