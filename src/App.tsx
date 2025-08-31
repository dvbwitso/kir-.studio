import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import EnvironmentChecker from './components/EnvironmentChecker';
import { validateEnv } from './utils/env';

function App() {
  useEffect(() => {
    // Validate environment variables on app startup
    validateEnv();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white text-black font-sans">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <EnvironmentChecker />
      </div>
    </Router>
  );
}

export default App;