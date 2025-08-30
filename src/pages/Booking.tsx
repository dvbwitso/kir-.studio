import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Instagram, Facebook, Clock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import BookingCalendar from '../components/BookingCalendar';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    service: string;
    date: string;
    time: string;
  } | null>(null);

  // Extract service from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const serviceFromUrl = urlParams.get('service');
    if (serviceFromUrl) {
      setSelectedService(serviceFromUrl);
    }
  }, [location.search]);

  const handleServiceChange = (newService: string) => {
    setSelectedService(newService);
    // Update URL to reflect the selected service
    const urlParams = new URLSearchParams(location.search);
    if (newService) {
      urlParams.set('service', newService);
    } else {
      urlParams.delete('service');
    }
    const newSearch = urlParams.toString();
    navigate(`/booking${newSearch ? `?${newSearch}` : ''}`, { replace: true });
  };

  const handleBookingConfirm = (date: string, time: string) => {
    setConfirmedBooking({
      service: selectedService,
      date: date,
      time: time
    });
    setBookingConfirmed(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setBookingConfirmed(false);
      setConfirmedBooking(null);
    }, 5000);
  };

  const services = [
    'Classic Facial',
    'Vitamin C Facial',
    'Men\'s Facial',
    'Derma-planing',
    'Custom Facial',
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
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Link 
                to="/services" 
                className="inline-flex items-center space-x-2 text-warm-gray hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Services</span>
              </Link>
            </div>
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

          {/* Booking Confirmation */}
          {bookingConfirmed && confirmedBooking && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-medium text-green-800">Booking Confirmed!</h4>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Your appointment for <strong>{confirmedBooking.service}</strong> has been confirmed for{' '}
                    <strong>{new Date(confirmedBooking.date).toLocaleDateString()}</strong> at{' '}
                    <strong>{confirmedBooking.time}</strong>.
                  </p>
                  <p className="text-sm text-green-700">
                    We'll contact you shortly to arrange payment of the ZMW 100 deposit.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <div className="space-y-8">
              <div className="bg-white border border-nude rounded-lg p-8">
                <h3 className="text-2xl font-serif font-medium mb-6">
                  Select Your Service
                </h3>
                
                {/* Show message if service was pre-selected */}
                {new URLSearchParams(location.search).get('service') && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-green-700">
                      <strong>{selectedService}</strong> has been pre-selected from our services page.
                      You can change it below if needed.
                    </p>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-black mb-2">
                      Service Type
                    </label>
                    <select
                      id="service"
                      value={selectedService}
                      onChange={(e) => handleServiceChange(e.target.value)}
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

                  {/* Booking Calendar */}
                  <BookingCalendar 
                    selectedService={selectedService}
                    onBookingConfirm={handleBookingConfirm}
                  />
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