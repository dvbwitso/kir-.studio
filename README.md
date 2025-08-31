# KIRÈ Studio

A modern beauty and wellness studio website built with React, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for all device sizes
- **Service Booking**: Interactive booking calendar
- **Product Shop**: E-commerce functionality
- **Admin Panel**: Content management capabilities
- **Modern UI**: Clean, professional design with smooth animations

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

## Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your actual values

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

This project uses environment variables for configuration. Copy `.env.example` to `.env.local` and update the values:

### Required Variables
- `VITE_SANITY_PROJECT_ID` - Your Sanity project ID
- `VITE_SANITY_DATASET` - Sanity dataset (usually 'production')

### Optional Variables
- `VITE_CONTACT_PHONE` - Business phone number
- `VITE_CONTACT_EMAIL` - Business email address
- `VITE_CONTACT_ADDRESS` - Business address
- `VITE_DEPOSIT_AMOUNT` - Booking deposit amount
- `SANITY_TOKEN` - Sanity write token (for content migration)

### For Sanity CMS Integration
1. Get your project ID from [Sanity.io dashboard](https://sanity.io/manage)
2. For content management, create an editor token in your Sanity project settings
3. Add the token to your `.env.local` file as `SANITY_TOKEN`

## Deployment on Vercel

This project is configured for seamless deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard (Settings > Environment Variables)
3. Use the values from `.env.production` as a reference
4. The `vercel.json` file ensures proper routing for the SPA

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── contexts/      # React context providers
├── data/          # Static data files
├── images/        # Image assets
└── utils/         # Utility functions
```

## License

Private project for KIRÈ Studio.
