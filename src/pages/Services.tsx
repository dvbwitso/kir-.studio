import React from 'react';
import { Link } from 'react-router-dom';
import { TreatmentChairIllustration } from '../components/Illustrations';

const Services = () => {
  const serviceCategories = [
    {
      title: 'Facial Treatments',
      services: [
        {
          name: 'Classic Facial',
          description: 'A refreshing deep pore cleanse with exfoliation and extractions, designed to leave your skin clean, soft, and glowing. A perfect go-to for anyone in need of a reset and relaxation.',
          duration: '60 min',
          price: 'K400',
          image: '/src/images/services/classic-facial.jpg',
        },
        {
          name: 'Vitamin C Facial',
          description: 'Brighten, hydrate, and even out your skin tone. This glow-boosting treatment is rich in antioxidants, targets hyperpigmentation, and leaves your skin with a fresh, radiant finish.',
          duration: '75 min',
          price: 'K550',
          image: '/src/images/services/vitamin-c-facial.png',
        },
        {
          name: "Men's Facial",
          description: "Tailored specifically for men's skincare needs. This facial deeply cleanses the skin, helps prevent ingrown hairs, balances oil, and soothes irritation from shaving — leaving skin refreshed and sharp.",
          duration: '60 min',
          price: 'K500',
          image: '/src/images/services/mens-facial.avif',
        },
        {
          name: 'Derma-planing',
          description: "Smooth and refine your skin's texture by removing fine facial hair and dead skin cells. Ideal for achieving a flawless finish and enhancing product absorption.",
          duration: '45 min',
          price: 'K600',
          image: '/src/images/services/derma-planing.png',
        },
        {
          name: 'Custom Facial',
          description: "A premium, personalized experience. Includes a double cleanse, derma-planing, a tailored treatment using UV light therapy, and a mask chosen specifically for your skin's unique needs.",
          duration: '90 min',
          price: 'K800',
          image: '/src/images/services/custom-facial.jpg',
        },
      ],
    },
    {
      title: 'Body Treatments',
      services: [
        {
          name: 'Full Body Wax',
          description: 'Professional hair removal with premium wax and aftercare',
          duration: '90 min',
          price: 'ZMW 500',
          image: '/src/images/services/full-body-wax.jpg',
        },
        {
          name: 'Brazilian Wax',
          description: 'Intimate waxing service with utmost care and hygiene',
          duration: '45 min',
          price: 'ZMW 200',
          image: '/src/images/services/brazilian-wax.jpg',
        },
        {
          name: 'Relaxation Massage',
          description: 'Full body therapeutic massage for stress relief',
          duration: '75 min',
          price: 'ZMW 400',
          image: '/src/images/services/relaxation-massage.jpg',
        },
      ],
    },
    {
      title: 'Lash Services',
      services: [
        {
          name: 'Classic Lash Extensions',
          description: 'Natural-looking individual lash extensions',
          duration: '120 min',
          price: 'ZMW 300',
          image: '/src/images/services/classic-lash-extensions.jpg',
        },
        {
          name: 'Volume Lashes',
          description: 'Dramatic, full-volume lash extensions',
          duration: '150 min',
          price: 'ZMW 450',
          image: '/src/images/services/volume-lashes.jpg',
        },
        {
          name: 'Lash Lift & Tint',
          description: 'Natural curl and color enhancement',
          duration: '60 min',
          price: 'ZMW 180',
          image: '/src/images/services/lash-lift-tint.avif',
        },
      ],
    },
  ];

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-light">
            Our Services
          </h1>
          <div className="flex justify-center py-8">
            <TreatmentChairIllustration className="w-40 h-40" />
          </div>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Discover our carefully curated selection of premium beauty treatments, 
            each designed to elevate your natural radiance.
          </p>
        </div>

        <div className="space-y-16">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              <h2 className="text-3xl font-serif font-medium text-center">
                {category.title}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {category.services.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className="bg-white border border-nude rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Service Image */}
                    <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                      <img
                        src={service.image}
                        alt={`Professional ${service.name} service`}
                        className="w-full h-48 object-cover object-center"
                        onError={(e) => {
                          // Fallback to a placeholder if image doesn't exist
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzllYTNhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                    </div>
                    
                    <div className="p-8 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-serif font-medium">
                          {service.name}
                        </h3>
                        <span className="text-lg font-medium text-black">
                          {service.price}
                        </span>
                      </div>
                      
                      <p className="text-warm-gray text-sm leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-nude/50">
                        <span className="text-xs text-warm-gray uppercase tracking-wide">
                          {service.duration}
                        </span>
                        <Link 
                          to={`/booking?service=${encodeURIComponent(service.name)}`} 
                          className="btn-primary text-xs px-6 py-2"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;