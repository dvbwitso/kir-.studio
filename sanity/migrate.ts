import { createClient } from '@sanity/client';
import { services, products } from './migration-data';

const client = createClient({
  projectId: '3klw8jzl',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01'
});

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
