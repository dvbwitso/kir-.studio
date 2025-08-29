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
        },
        {
          name: 'Vitamin C Facial',
          description: 'Brighten, hydrate, and even out your skin tone. This glow-boosting treatment is rich in antioxidants, targets hyperpigmentation, and leaves your skin with a fresh, radiant finish.',
          duration: '75 min',
          price: 'K550',
        },
        {
          name: "Men's Facial",
          description: "Tailored specifically for men's skincare needs. This facial deeply cleanses the skin, helps prevent ingrown hairs, balances oil, and soothes irritation from shaving — leaving skin refreshed and sharp.",
          duration: '60 min',
          price: 'K500',
        },
        {
          name: 'Derma-planing',
          description: "Smooth and refine your skin's texture by removing fine facial hair and dead skin cells. Ideal for achieving a flawless finish and enhancing product absorption.",
          duration: '45 min',
          price: 'K600',
        },
        {
          name: 'Custom Facial',
          description: "A premium, personalized experience. Includes a double cleanse, derma-planing, a tailored treatment using UV light therapy, and a mask chosen specifically for your skin's unique needs.",
          duration: '90 min',
          price: 'K800',
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
        },
        {
          name: 'Brazilian Wax',
          description: 'Intimate waxing service with utmost care and hygiene',
          duration: '45 min',
          price: 'ZMW 200',
        },
        {
          name: 'Relaxation Massage',
          description: 'Full body therapeutic massage for stress relief',
          duration: '75 min',
          price: 'ZMW 400',
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
        },
        {
          name: 'Volume Lashes',
          description: 'Dramatic, full-volume lash extensions',
          duration: '150 min',
          price: 'ZMW 450',
        },
        {
          name: 'Lash Lift & Tint',
          description: 'Natural curl and color enhancement',
          duration: '60 min',
          price: 'ZMW 180',
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
                    className="bg-white border border-nude p-8 rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <div className="space-y-4">
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
                        <Link to="/booking" className="btn-primary text-xs px-6 py-2">
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