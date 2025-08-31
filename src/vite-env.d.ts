/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Sanity Configuration
  readonly VITE_SANITY_PROJECT_ID: string
  readonly VITE_SANITY_DATASET: string
  readonly VITE_SANITY_API_VERSION: string
  readonly VITE_SANITY_USE_CDN: string
  readonly SANITY_TOKEN: string

  // Application Configuration
  readonly VITE_APP_NAME: string
  readonly VITE_APP_URL: string

  // Contact Information
  readonly VITE_CONTACT_PHONE: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_CONTACT_ADDRESS: string

  // Business Information
  readonly VITE_BUSINESS_HOURS: string
  readonly VITE_DEPOSIT_AMOUNT: string
  readonly VITE_CURRENCY: string

  // Payment Configuration
  readonly VITE_MTN_MOMO_API_KEY: string
  readonly VITE_AIRTEL_MONEY_API_KEY: string

  // Analytics
  readonly VITE_GOOGLE_ANALYTICS_ID: string
  readonly VITE_FACEBOOK_PIXEL_ID: string

  // Email Service
  readonly VITE_EMAILJS_SERVICE_ID: string
  readonly VITE_EMAILJS_TEMPLATE_ID: string
  readonly VITE_EMAILJS_PUBLIC_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
