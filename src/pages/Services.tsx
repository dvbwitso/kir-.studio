import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TreatmentChairIllustration } from '../components/Illustrations';
import { fetchServices, subscribeToServices, Service, isItemNew, getDiscountedPrice, formatDiscount } from '../lib/sanity';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial services
    const loadServices = async () => {
      const servicesData = await fetchServices();
      setServices(servicesData);
      setLoading(false);
    };

    loadServices();

    // Subscribe to real-time updates
    const subscription = subscribeToServices((updatedServices) => {
      setServices(updatedServices);
      console.log('Services updated in real-time!');
    });

    // Cleanup subscription on unmount
    return () => subscription?.unsubscribe();
  }, []);

  // Group services by category
  const serviceCategories = services.reduce((acc, service) => {
    const category = service.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-warm-gray">Loading services...</p>
        </div>
      </div>
    );
  }

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

        {Object.keys(serviceCategories).length === 0 ? (
          <div className="text-center py-16">
            <p className="text-warm-gray text-lg">No services available at the moment.</p>
            <p className="text-warm-gray mt-2">Please check back later or contact us directly.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(serviceCategories).map(([categoryName, categoryServices]) => (
              <div key={categoryName} className="space-y-8">
                <h2 className="text-3xl font-serif font-medium text-center">
                  {categoryName}
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {categoryServices.map((service) => {
                    const isNew = isItemNew(service);
                    const priceInfo = getDiscountedPrice(service);
                    
                    return (
                      <div
                        key={service._id}
                        className="bg-white border border-nude rounded-lg hover:shadow-lg transition-all duration-300 overflow-hidden relative"
                      >
                        {/* Tags */}
                        <div className="absolute top-4 left-4 z-10 space-y-2">
                          {isNew && (
                            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                              NEW
                            </span>
                          )}
                          {priceInfo.hasDiscount && priceInfo.discountPercentage && (
                            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium block">
                              {formatDiscount(priceInfo.discountPercentage)}
                            </span>
                          )}
                        </div>

                        {/* Service Image */}
                        <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                          {service.image?.asset?.url ? (
                            <img
                              src={service.image.asset.url}
                              alt={service.image.alt || `${service.name} service`}
                              className="w-full h-48 object-cover object-center"
                              onError={(e) => {
                                // Fallback to a placeholder if image doesn't exist
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzllYTNhOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbWluZyBTb29uPC90ZXh0Pjwvc3ZnPg==';
                              }}
                            />
                          ) : (
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                              <span className="text-warm-gray text-6xl">💆‍♀️</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-8 space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-xl font-serif font-medium">
                              {service.name}
                            </h3>
                            <div className="text-right">
                              {priceInfo.hasDiscount && priceInfo.originalPrice ? (
                                <div className="space-y-1">
                                  <span className="text-lg font-medium text-black">
                                    {priceInfo.currentPrice}
                                  </span>
                                  <div className="text-sm text-gray-500 line-through">
                                    {priceInfo.originalPrice}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-lg font-medium text-black">
                                  {priceInfo.currentPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-warm-gray text-sm leading-relaxed">
                            {service.description}
                          </p>
                          
                          <div className="flex justify-between items-center pt-4">
                            <span className="text-xs text-warm-gray uppercase tracking-wide">
                              Duration: {service.duration}
                            </span>
                            <Link
                              to="/booking"
                              className="btn-primary text-xs px-6 py-2"
                            >
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-serif font-medium mb-4">
            Ready to Book Your Service?
          </h2>
          <p className="text-warm-gray mb-8 max-w-2xl mx-auto">
            Experience the ultimate in luxury beauty treatments. Book your appointment today 
            and let us help you look and feel your absolute best.
          </p>
          <Link
            to="/booking"
            className="btn-primary"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
