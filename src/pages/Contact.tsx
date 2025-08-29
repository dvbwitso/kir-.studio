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
                    <p className="text-sm text-warm-gray">+260 97 4823502</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/+260974823502"
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
                      Ibex Hub, Ibex Hill, Top Floor<br />
                      Zambeef Building, Lusaka, Zambia
                    </p>
                  </div>
                </div>
              </div>

                {/* Google Maps Integration */}
                <div className="space-y-4">
                <h4 className="text-lg font-medium">Find Us</h4>
                <div className="aspect-video rounded-lg overflow-hidden border border-nude">
                  <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.123456789!2d28.3293!3d-15.3875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1940f4b1234567ab%3A0x1234567890abcdef!2sIbex%20Hill%2C%20Lusaka%2C%20Zambia!5e0!3m2!1sen!2szm!4v1234567890123!5m2!1sen!2szm"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kire Studio Location - Ibex Hub, Lusaka"
                  className="w-full h-full"
                  ></iframe>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-warm-gray">Click to interact with map</span>
                  <a
                  href="https://maps.google.com/?q=Ibex+Hub,+Ibex+Hill,+Lusaka,+Zambia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-gray hover:text-black transition-colors underline"
                  >
                  Open in Google Maps
                  </a>
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