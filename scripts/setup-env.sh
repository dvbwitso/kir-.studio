#!/bin/bash

# Environment Setup Script for Kire Studio
echo "🎯 Setting up environment variables for Kire Studio..."

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local already exists"
else
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ .env.local created successfully"
fi

echo ""
echo "📋 Environment Setup Checklist:"
echo "1. ✅ Environment files created"
echo "2. 🔧 Update contact information in .env.local:"
echo "   - VITE_CONTACT_PHONE (replace +260971234567)"
echo "   - VITE_CONTACT_EMAIL (replace info@kirestudio.com)"
echo "   - VITE_CONTACT_ADDRESS (replace Lusaka, Zambia)"
echo ""
echo "3. 🔑 Optional: Add Sanity editor token for content management:"
echo "   - Get token from: https://sanity.io/manage"
echo "   - Add as SANITY_TOKEN in .env.local"
echo ""
echo "4. 🚀 Start development server:"
echo "   npm run dev"
echo ""
echo "📖 For more details, see README.md"
