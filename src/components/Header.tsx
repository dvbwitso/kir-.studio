import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Booking', href: '/booking' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-nude relative">
      <nav className="container-custom">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-serif font-semibold tracking-wide">
              KIRÈ Studio
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  isActive(item.href)
                    ? 'text-black border-b border-black pb-1'
                    : 'text-warm-gray hover:text-black'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Authentication Section */}
            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-nude">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="w-4 h-4 text-warm-gray" />
                    <span className="text-warm-gray">Admin</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-sm text-warm-gray hover:text-black transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center space-x-2 text-sm font-medium text-warm-gray hover:text-black transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-black hover:text-warm-gray transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
                  {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-nude/95 backdrop-blur-sm border-t border-warm-gray/20 py-6 px-6 space-y-6 z-50">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-lg font-medium tracking-wide uppercase transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'text-black'
                      : 'text-warm-gray hover:text-black'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Authentication */}
              <div className="pt-4 border-t border-warm-gray/20">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-warm-gray">
                      <User className="w-4 h-4" />
                      <span>Logged in as Admin</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-lg font-medium text-warm-gray hover:text-black transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-lg font-medium text-warm-gray hover:text-black transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Admin Login</span>
                  </button>
                )}
              </div>
            </div>
          )}
      </nav>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </header>
  );
};

export default Header;