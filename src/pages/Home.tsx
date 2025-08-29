import React from 'react';
import { Link } from 'react-router-dom';
import { FacialIllustration, WaxingIllustration, MassageIllustration, LashIllustration } from '../components/Illustrations';

const Home = () => {
  const services = [
    {
      name: 'Facials',
      description: 'Rejuvenating treatments for radiant skin',
      icon: <FacialIllustration className="w-12 h-12" />,
    },
    {
      name: 'Waxing',
      description: 'Professional hair removal with care',
      icon: <WaxingIllustration className="w-12 h-12" />,
    },
    {
      name: 'Massage',
      description: 'Therapeutic wellness for body and mind',
      icon: <MassageIllustration className="w-12 h-12" />,
    },
    {
      name: 'Lashes',
      description: 'Beautiful lash extensions and treatments',
      icon: <LashIllustration className="w-12 h-12" />,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-white to-nude/20">
        <div className="container-custom">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-wide">
              KIRÈ Studio
            </h1>
            <p className="text-xl md:text-2xl font-light text-warm-gray tracking-wide">
              Refined Beauty. Elevated Care.
            </p>
            <div className="pt-8">
              <Link to="/booking" className="btn-primary">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-light">
                Our Services
              </h2>
              <p className="text-lg text-warm-gray max-w-2xl mx-auto">
                Experience luxury treatments crafted with precision and care
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 border border-nude/30"
                >
                  <div className="text-center space-y-6">
                    <div className="flex justify-center text-warm-gray group-hover:text-black transition-colors duration-300">
                      {service.icon}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-serif font-medium">
                        {service.name}
                      </h3>
                      <p className="text-sm text-warm-gray leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-nude">
        <div className="container-custom">
          <div className="text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-light">
              Begin Your Journey
            </h2>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Step into a world where beauty meets tranquility, and every moment is crafted for your well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services" className="btn-secondary">
                Explore Services
              </Link>
              <Link to="/shop" className="btn-primary">
                Shop Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;