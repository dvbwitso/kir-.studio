// Environment variables utility
// Centralized access to all environment variables

export const env = {
  // Sanity Configuration
  sanity: {
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '3klw8jzl',
    dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
    useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true' || true,
    token: import.meta.env.SANITY_TOKEN, // Server-side only
  },

  // Application Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'KIRÈ Studio',
    url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  },

  // Contact Information
  contact: {
    phone: import.meta.env.VITE_CONTACT_PHONE || '+260XXX XXX XXX',
    email: import.meta.env.VITE_CONTACT_EMAIL || 'info@kirestudio.com',
    address: import.meta.env.VITE_CONTACT_ADDRESS || 'Lusaka, Zambia',
  },

  // Business Information
  business: {
    hours: import.meta.env.VITE_BUSINESS_HOURS || 'Mon-Sat: 9:00 AM - 6:00 PM',
    depositAmount: Number(import.meta.env.VITE_DEPOSIT_AMOUNT) || 100,
    currency: import.meta.env.VITE_CURRENCY || 'ZMW',
  },

  // Payment Configuration
  payment: {
    mtnMomo: {
      apiKey: import.meta.env.VITE_MTN_MOMO_API_KEY,
    },
    airtelMoney: {
      apiKey: import.meta.env.VITE_AIRTEL_MONEY_API_KEY,
    },
  },

  // Analytics
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
    facebookPixelId: import.meta.env.VITE_FACEBOOK_PIXEL_ID,
  },

  // Email Service
  email: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  },

  // Development flags
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;

// Validation function to check required environment variables
export const validateEnv = () => {
  const requiredVars = [
    'VITE_SANITY_PROJECT_ID',
    'VITE_SANITY_DATASET',
  ];

  const missing = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
    console.warn('Please check your .env.local file');
  }

  return missing.length === 0;
};

// Helper function to get safe contact info
export const getContactInfo = () => ({
  phone: env.contact.phone.includes('XXX') ? null : env.contact.phone,
  email: env.contact.email,
  address: env.contact.address,
  displayPhone: env.contact.phone,
});

export default env;
