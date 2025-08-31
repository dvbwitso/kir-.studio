import { useServices } from '../hooks/useSanity'
import { urlFor } from '../lib/sanity'
import { Link } from 'react-router-dom'

const CMSServicesExample = () => {
  const { services, loading, error } = useServices()

  if (loading) {
    return (
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-video rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading services: {error}</p>
          <p className="text-gray-600">Please check your CMS configuration.</p>
        </div>
      </div>
    )
  }

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = []
    }
    acc[service.category].push(service)
    return acc
  }, {} as Record<string, typeof services>)

  return (
    <div className="container-custom section-padding">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">
          Our Services
        </h1>
        <p className="text-lg text-warm-gray max-w-2xl mx-auto">
          Content managed through Sanity CMS - easily updated by non-technical users
        </p>
      </div>

      {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
        <div key={category} className="mb-16">
          <h2 className="text-3xl font-serif font-semibold mb-8 text-center">
            {category}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryServices.map((service) => (
              <div
                key={service._id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Service Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={urlFor(service.image).width(400).height(240).url()}
                    alt={service.image.alt || service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium">{service.name}</h3>
                    <span className="text-lg font-semibold text-black">
                      {service.price}
                    </span>
                  </div>
                  
                  <p className="text-warm-gray text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-warm-gray">
                      {service.duration}
                    </span>
                    <Link
                      to="/booking"
                      className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-warm-gray transition-colors"
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

      {services.length === 0 && (
        <div className="text-center py-16">
          <p className="text-warm-gray text-lg">
            No services found. Add some content in your Sanity CMS!
          </p>
        </div>
      )}
    </div>
  )
}

export default CMSServicesExample
