#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Environment validation script
console.log(' Checking environment variables...\n');

// Change to project root directory
process.chdir(path.join(__dirname, '..'));

const requiredFiles = ['.env.example', '.env.local'];
const optionalFiles = ['.env.production'];

console.log(' Checking environment files:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ${file} - Found`);
  } else {
    console.log(`   ${file} - Missing (required)`);
  }
});

optionalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ${file} - Found`);
  } else {
    console.log(`    ${file} - Missing (optional)`);
  }
});

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('\n Checking environment variables:');

const requiredVars = [
  'VITE_SANITY_PROJECT_ID',
  'VITE_SANITY_DATASET'
];

const businessVars = [
  'VITE_CONTACT_PHONE',
  'VITE_CONTACT_EMAIL',
  'VITE_CONTACT_ADDRESS',
  'VITE_DEPOSIT_AMOUNT',
  'VITE_CURRENCY'
];

console.log('\n  Required Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`     ${varName} = ${value}`);
  } else {
    console.log(`     ${varName} - Not set`);
  }
});

console.log('\n  Business Configuration:');
businessVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    const isPlaceholder = value.includes('XXX') || value.includes('your') || value.includes('example');
    if (isPlaceholder) {
      console.log(`      ${varName} = ${value} (placeholder - update needed)`);
    } else {
      console.log(`     ${varName} = ${value}`);
    }
  } else {
    console.log(`     ${varName} - Not set`);
  }
});

console.log('\n Next Steps:');
console.log('1. Update placeholder values in .env.local');
console.log('2. Run: npm run dev');
console.log('3. Check the environment checker widget in browser');
console.log('4. For production: Set variables in Vercel dashboard');

console.log('\n Environment check complete!');
