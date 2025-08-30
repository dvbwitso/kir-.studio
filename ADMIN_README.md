# Kire Studio Admin Panel

## Overview
The admin panel provides comprehensive management capabilities for the beauty studio's products, services, and inventory.

## Features

### 🛍️ Product Management
- **Add Products**: Create new products with name, category, description, price, and images
- **Edit Products**: Update existing product information inline
- **Delete Products**: Remove products from the catalog
- **Image Upload**: Upload product images (supports drag & drop)
- **Auto Inventory**: New products automatically added to inventory with default stock

### 🧴 Service Management
- **Add Services**: Create new services with duration, pricing, and descriptions
- **Edit Services**: Modify existing service details
- **Delete Services**: Remove services from offerings
- **Category Organization**: Services organized by categories (Facial Treatments, Massage Therapy, etc.)
- **Image Management**: Upload and manage service images

### 📦 Inventory Management
- **Real-time Stock Tracking**: Live inventory updates as customers purchase
- **Stock Status Indicators**:
  - 🟢 **In Stock**: More than 5 items available
  - 🟠 **Low Stock**: 5 or fewer items remaining
  - 🔴 **Out of Stock**: No items available
- **Quick Stock Adjustments**: +/- buttons for individual items
- **Bulk Restocking**: Quick restock options (+10, +50, Restock All)
- **Stock Validation**: Prevents overselling during checkout

## How to Access Admin Panel

### From Shop Page
1. Navigate to the Shop page
2. Click the **"Admin"** button in the top-right corner
3. The admin panel opens as a modal overlay

### Admin Panel Tabs

#### 1. Products Tab
- View all products in a grid layout
- Add new products with the "Add Product" button
- Edit products by clicking the edit (pencil) icon
- Delete products with the trash icon
- Upload images for products

#### 2. Services Tab
- Manage all beauty services
- Add new services with pricing and duration
- Edit existing service details
- Delete services no longer offered
- Upload service images

#### 3. Inventory Tab
- Monitor stock levels for all products
- Adjust inventory with +/- controls
- Quick restock options
- Color-coded stock status indicators
- Bulk inventory management

## Stock Management Features

### Customer Experience
- Stock levels displayed on product cards
- "Add to Cart" disabled when out of stock
- Real-time stock updates as items added to cart
- Stock warnings during checkout if exceeding available inventory

### Admin Experience
- Live inventory dashboard
- Stock status alerts
- Quick adjustment controls
- Automatic inventory deduction after completed orders

## Data Persistence

### Current Implementation
- In-memory state management
- Data resets on page refresh
- Suitable for demonstration and testing

### Production Ready Features
- Inventory data structure in `src/data/inventory.json`
- Utility functions in `src/utils/inventory.ts` for:
  - Loading inventory from localStorage/API
  - Saving inventory changes
  - Stock status calculations
  - Inventory validation

## File Structure

```
src/
├── components/
│   └── AdminPanel.tsx          # Main admin interface
├── pages/
│   ├── Shop.tsx               # Shop with admin integration
│   └── Services.tsx           # Services page
├── data/
│   ├── inventory.json         # Inventory data structure
│   └── sample-data.json       # Sample products and services
└── utils/
    └── inventory.ts           # Inventory management utilities
```

## Technical Features

- **TypeScript**: Full type safety for products, services, and inventory
- **React Hooks**: Modern state management with useState
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Immediate UI updates for all changes
- **Modal Interface**: Non-intrusive admin panel overlay
- **Image Support**: File upload with preview capabilities

## Future Enhancements

- **Database Integration**: Connect to backend API for data persistence
- **User Authentication**: Admin login and role-based access
- **Analytics Dashboard**: Sales metrics and inventory reports
- **Automated Reordering**: Low stock alerts and automatic reordering
- **Service Booking Management**: Appointment scheduling integration
- **Multi-location Support**: Inventory management across multiple locations

## Usage Tips

1. **Testing Inventory**: Try adding products to cart and completing orders to see inventory deduction
2. **Stock Management**: Use the inventory tab to simulate different stock levels
3. **Product Management**: Add new products to see them immediately appear in the shop
4. **Image Uploads**: Upload images to test the visual product management
5. **Service Management**: Add services to expand the business offerings

The admin panel provides a complete business management solution for Kire Studio, allowing the owner to efficiently manage all aspects of the beauty business from a single interface.
