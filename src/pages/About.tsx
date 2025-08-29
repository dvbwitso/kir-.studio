import React from 'react';
import { AboutIllustration } from '../components/Illustrations';

const About = () => {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-light">
              About KIRÈ
            </h1>
            <div className="flex justify-center py-8">
              <AboutIllustration className="w-48 h-48" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Brand Story */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-black leading-relaxed">
                  KIRÈ is more than a studio. It is a sanctuary of refinement, 
                  wellness, and timeless beauty.
                </p>
                
                <p className="text-warm-gray leading-relaxed">
                  Founded on the principles of excellence and tranquility, KIRÈ Studio 
                  represents the pinnacle of luxury beauty care. Every treatment is 
                  meticulously crafted to provide not just aesthetic enhancement, 
                  but a transformative experience that nurtures both body and spirit.
                </p>

                <p className="text-warm-gray leading-relaxed">
                  Our philosophy centers on the belief that true beauty emerges 
                  when expertise meets artistry, when premium products blend with 
                  personalized care, and when every guest leaves feeling renewed 
                  and radiant.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-medium">Our Promise</h3>
                <ul className="space-y-3 text-warm-gray">
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-warm-gray rounded-full mt-3 flex-shrink-0"></span>
                    <span>Uncompromising quality in every treatment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-warm-gray rounded-full mt-3 flex-shrink-0"></span>
                    <span>Personalized care tailored to your unique needs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-warm-gray rounded-full mt-3 flex-shrink-0"></span>
                    <span>A serene environment that promotes total relaxation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1 h-1 bg-warm-gray rounded-full mt-3 flex-shrink-0"></span>
                    <span>Premium products that deliver visible results</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="space-y-8">
              <div className="aspect-[4/5] bg-nude/30 rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="KIRÈ Studio ambiance"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center space-y-4">
                <h4 className="text-xl font-serif font-medium">
                  Where Beauty Meets Tranquility
                </h4>
                <p className="text-sm text-warm-gray leading-relaxed">
                  Step into our carefully curated space designed to transport 
                  you into a world of luxury and serenity.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-24 text-center space-y-12">
            <h3 className="text-3xl md:text-4xl font-serif font-light">
              Our Values
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h4 className="text-xl font-serif font-medium">Excellence</h4>
                <p className="text-sm text-warm-gray leading-relaxed">
                  We pursue perfection in every detail, from the products we use 
                  to the techniques we employ, ensuring exceptional results.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-serif font-medium">Wellness</h4>
                <p className="text-sm text-warm-gray leading-relaxed">
                  Beyond beauty, we focus on holistic well-being, creating 
                  experiences that restore balance and inner harmony.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-serif font-medium">Elegance</h4>
                <p className="text-sm text-warm-gray leading-relaxed">
                  Timeless sophistication guides everything we do, from our 
                  treatments to our environment, reflecting refined taste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;