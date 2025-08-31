import { useState, useEffect } from 'react';
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
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 animate-fadeIn">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div className="space-y-3">
                  <h4 className="font-medium text-green-800 text-lg">Booking Confirmed!</h4>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-green-600 font-medium">Service:</span>
                        <p className="text-green-800">{confirmedBooking.service}</p>
                      </div>
                      <div>
                        <span className="text-green-600 font-medium">Date:</span>
                        <p className="text-green-800">{new Date(confirmedBooking.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                      <div>
                        <span className="text-green-600 font-medium">Time:</span>
                        <p className="text-green-800">{confirmedBooking.time}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-green-700 leading-relaxed">
                    We'll contact you shortly via phone to arrange payment of the ZMW 100 deposit 
                    and confirm your appointment details.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <div className="space-y-8">
              <div className="bg-white border border-nude rounded-lg p-6 sm:p-8">
                <h3 className="text-2xl font-serif font-medium mb-6">
                  Select Your Service
                </h3>
                
                {/* Show message if service was pre-selected */}
                {new URLSearchParams(location.search).get('service') && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-green-700 font-medium">
                          <strong>{selectedService}</strong> has been pre-selected
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          You can change it below if needed
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-black mb-3">
                      Service Type
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        value={selectedService}
                        onChange={(e) => handleServiceChange(e.target.value)}
                        className="w-full p-4 border border-nude rounded-lg focus:ring-2 focus:ring-warm-gray focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="">Choose a service...</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-warm-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {!selectedService && (
                      <p className="text-xs text-warm-gray mt-2">
                        Please select a service to view available appointment times
                      </p>
                    )}
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
                  href="https://instagram.com/kirestudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 w-full bg-white border border-nude p-6 rounded-lg hover:bg-nude/20 hover:border-warm-gray transition-all duration-300 group hover:shadow-md"
                >
                  <Instagram className="w-6 h-6 text-warm-gray group-hover:text-black transition-colors" />
                  <span className="font-medium text-black">Book via Instagram</span>
                </a>

                <a
                  href="https://facebook.com/kirestudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 w-full bg-white border border-nude p-6 rounded-lg hover:bg-nude/20 hover:border-warm-gray transition-all duration-300 group hover:shadow-md"
                >
                  <Facebook className="w-6 h-6 text-warm-gray group-hover:text-black transition-colors" />
                  <span className="font-medium text-black">Book via Facebook</span>
                </a>
              </div>

              {/* Operating Hours */}
              <div className="bg-nude/30 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-5 h-5 text-warm-gray" />
                  <h4 className="font-medium text-black">Operating Hours</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-warm-gray">Monday - Friday</span>
                    <span className="font-medium text-black">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-warm-gray">Saturday</span>
                    <span className="font-medium text-black">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-warm-gray">Sunday</span>
                    <span className="font-medium text-red-600">Closed</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white border border-nude rounded-lg p-6">
                <h4 className="font-medium text-black mb-4">Need Help?</h4>
                <div className="space-y-3 text-sm">
                  <p className="text-warm-gray leading-relaxed">
                    Having trouble with online booking? Call us directly and we'll help you schedule your appointment.
                  </p>
                  <div className="pt-2">
                    <a 
                      href="tel:+260XXX"
                      className="inline-flex items-center space-x-2 text-warm-gray hover:text-black transition-colors"
                    >
                      <span>📞</span>
                      <span>+260 XXX XXX XXX</span>
                    </a>
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