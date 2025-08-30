import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, MessageCircle } from 'lucide-react';
import mtnLogo from '../images/momo.jpg';
import airtelLogo from '../images/airtel-money.jpg';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Booking', href: '/booking' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-nude">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-semibold">KIRÈ Studio</h3>
            <p className="text-warm-gray text-sm leading-relaxed">
              A sanctuary of refinement, wellness, and timeless beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-medium">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm text-warm-gray hover:text-black transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-serif font-medium">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/kire_studiozm/"
                  className="p-2 text-warm-gray hover:text-black transition-colors duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://web.facebook.com/profile.php?id=61576159620581"
                  className="p-2 text-warm-gray hover:text-black transition-colors duration-300"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://wa.me/+260974823502"
                  className="p-2 text-warm-gray hover:text-black transition-colors duration-300"
                >
                  <MessageCircle size={20} />
                </a>
                <a
                  href="tel:+260974823502"
                  className="p-2 text-warm-gray hover:text-black transition-colors duration-300"
                >
                  <Phone size={20} />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-medium">Payment Methods</h5>
              <div className="flex space-x-4">
                <div className="flex items-center rounded-lg p-3">
                  <img src={mtnLogo} alt="MTN Money" className="w-24 h-16 object-contain rounded-lg" />
                </div>
                <div className="flex items-center rounded-lg p-3">
                  <img src={airtelLogo} alt="Airtel Money" className="w-24 h-16 object-contain rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-warm-gray mt-12 pt-8">
          <p className="text-center text-sm text-warm-gray">
            © 2025 KIRÈ Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;