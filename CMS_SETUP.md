# KIRÈ Studio CMS Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Sanity Account
1. Go to [sanity.io](https://sanity.io)
2. Sign up with Google/GitHub
3. Create a new project called "KIRÈ Studio CMS"
4. Choose "Blog" template (we'll modify it)

### Step 2: Get Project Credentials
1. In Sanity dashboard, go to Settings → API
2. Copy your **Project ID**
3. Create `.env.local` file in your project root:

```bash
VITE_SANITY_PROJECT_ID=your-project-id-here
VITE_SANITY_DATASET=production
```

### Step 3: Deploy Sanity Studio
```bash
cd sanity
npx sanity init
npx sanity deploy
```

### Step 4: Add Sample Content
1. Open your Sanity Studio at `https://your-project.sanity.studio`
2. Add your services and products using the visual editor

## 📝 Content Management Features

### ✅ **Services Management**
- Add/edit/delete services
- Upload service images
- Set categories (Facial, Body, Lash, Massage)
- Drag-and-drop reordering
- Rich text descriptions

### ✅ **Products Management**
- Product catalog management
- Stock status toggle
- Category organization
- Image management with hotspots

### ✅ **Hero Section**
- Main headline editing
- Subtitle text
- Call-to-action button text
- Background image management

### ✅ **About Section**
- About text editing
- Feature highlights
- About image management

## 🎨 **Non-Technical User Features**

### **Visual Editor**
- Drag-and-drop interface
- Live preview of changes
- Image cropping and hotspots
- Rich text formatting

### **Media Library**
- Upload images by dragging files
- Automatic image optimization
- Alt text for accessibility
- Image search and filtering

### **Content Organization**
- Categories and tags
- Custom ordering
- Published/draft status
- Content scheduling

## 🔄 **Updating Your Website**

Once you've set up the CMS and added content, update your React components to use the CMS data:

### Example: Update Services Page
```typescript
// Instead of hardcoded services array
import { useServices } from '../hooks/useSanity'

const Services = () => {
  const { services, loading, error } = useServices()
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  // Use services from CMS
  return (
    <div>
      {services.map(service => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  )
}
```

## 🚀 **Deployment**

The CMS is automatically deployed to Vercel alongside your website. No additional hosting needed!

## 💡 **Benefits for KIRÈ Studio**

### **For Admin Users**
- ✅ Update content without developer
- ✅ Add new services instantly
- ✅ Upload and manage photos
- ✅ Change pricing and descriptions
- ✅ Reorder content with drag-and-drop

### **For Developers**
- ✅ Type-safe content with TypeScript
- ✅ Automatic image optimization
- ✅ Real-time content updates
- ✅ Version control for content
- ✅ Backup and restore features

## 📱 **Mobile-Friendly**

The Sanity Studio works perfectly on tablets and mobile devices, so content can be updated anywhere!

## 🔐 **Security & Access**

- Invite team members with different permission levels
- Admin, Editor, and Viewer roles
- Secure API with read/write permissions
- Audit logs for all content changes
