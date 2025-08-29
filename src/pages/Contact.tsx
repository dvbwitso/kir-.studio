import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { ContactIllustration } from '../components/Illustrations';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-light">
            Get In Touch
          </h1>
          <div className="flex justify-center py-6">
            <ContactIllustration className="w-36 h-36" />
          </div>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            We'd love to hear from you. Reach out for bookings, inquiries, 
            or simply to learn more about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-medium">Send us a Message</h2>
              <p className="text-warm-gray">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 border border-nude rounded focus:ring-2 focus:ring-warm-gray focus:border-warm-gray transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-nude rounded focus:ring-2 focus:ring-warm-gray focus:border-warm-gray transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 border border-nude rounded focus:ring-2 focus:ring-warm-gray focus:border-warm-gray transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full flex items-center justify-center space-x-2">
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            {/* Quick Contact */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-medium">Quick Contact</h3>
              
              <div className="space-y-4">
                <a
                  href="tel:+260"
                  className="flex items-center space-x-4 p-4 bg-white border border-nude rounded-lg hover:bg-nude/20 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 text-warm-gray" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-sm text-warm-gray">+260 XXX XXX XXX</p>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center space-x-4 p-4 bg-white border border-nude rounded-lg hover:bg-nude/20 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 text-warm-gray" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-warm-gray">Quick responses</p>
                  </div>
                </a>

                <a
                  href="mailto:hello@kirestudio.com"
                  className="flex items-center space-x-4 p-4 bg-white border border-nude rounded-lg hover:bg-nude/20 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 text-warm-gray" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-warm-gray">hello@kirestudio.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-medium">Visit Our Studio</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-warm-gray mt-1" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-warm-gray leading-relaxed">
                      123 Luxury Avenue<br />
                      Lusaka, Zambia
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video bg-warm-gray/20 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="w-8 h-8 text-warm-gray mx-auto" />
                  <p className="text-sm text-warm-gray">Google Map Integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;