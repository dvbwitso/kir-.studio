import React, { useState } from 'react';
import { Instagram, Facebook, Clock, AlertCircle } from 'lucide-react';
import { BookingCalendarIllustration } from '../components/Illustrations';

const Booking = () => {
  const [selectedService, setSelectedService] = useState('');

  const services = [
    'Classic Facial',
    'Anti-Aging Facial',
    'Full Body Wax',
    'Brazilian Wax',
    'Relaxation Massage',
    'Classic Lash Extensions',
    'Volume Lashes',
    'Lash Lift & Tint',
  ];

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-light">
              Book Your Appointment
            </h1>
            <p className="text-lg text-warm-gray max-w-2xl mx-auto">
              Reserve your time for luxury and relaxation. Choose your preferred method to book.
            </p>
          </div>

          {/* Booking Notice */}
          <div className="bg-nude/30 border border-nude rounded-lg p-6 mb-12">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-warm-gray mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-medium text-black">Booking Policy</h4>
                <p className="text-sm text-warm-gray leading-relaxed">
                  All bookings require a non-refundable deposit of ZMW 100 via MTN Money or Airtel Money 
                  to confirm your appointment. This amount will be deducted from your total service cost.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <div className="space-y-8">
              <div className="bg-white border border-nude rounded-lg p-8">
                <h3 className="text-2xl font-serif font-medium mb-6">
                  Select Your Service
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-black mb-2">
                      Service Type
                    </label>
                    <select
                      id="service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full p-3 border border-nude rounded focus:ring-2 focus:ring-warm-gray focus:border-warm-gray"
                    >
                      <option value="">Choose a service...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Calendar Placeholder */}
                  <div className="border-2 border-dashed border-nude rounded-lg p-12 text-center">
                    <div className="flex justify-center mb-6">
                      <BookingCalendarIllustration className="w-16 h-16" />
                    </div>
                    <h4 className="text-lg font-medium text-black mb-2">
                      Calendar Integration
                    </h4>
                    <p className="text-sm text-warm-gray">
                      Interactive booking calendar will be integrated here
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Booking Options */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-medium">
                  Quick Booking Options
                </h3>
                <p className="text-warm-gray">
                  Prefer to book through social media? Contact us directly for immediate assistance.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center justify-center space-x-3 w-full bg-white border border-nude p-6 rounded-lg hover:bg-nude/20 transition-all duration-300 group"
                >
                  <Instagram className="w-6 h-6 text-warm-gray group-hover:text-black" />
                  <span className="font-medium text-black">Book via Instagram</span>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-center space-x-3 w-full bg-white border border-nude p-6 rounded-lg hover:bg-nude/20 transition-all duration-300 group"
                >
                  <Facebook className="w-6 h-6 text-warm-gray group-hover:text-black" />
                  <span className="font-medium text-black">Book via Facebook</span>
                </a>
              </div>

              {/* Operating Hours */}
              <div className="bg-nude/30 rounded-lg p-6 mt-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-5 h-5 text-warm-gray" />
                  <h4 className="font-medium text-black">Operating Hours</h4>
                </div>
                <div className="space-y-2 text-sm text-warm-gray">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;