import { Calendar, X } from 'lucide-react';
import { useState } from 'react';
import QuickBookingButton from './QuickBookingButton';

interface FloatingBookingButtonProps {
  serviceName?: string;
  show?: boolean;
}

const FloatingBookingButton: React.FC<FloatingBookingButtonProps> = ({ 
  serviceName, 
  show = true 
}) => {
  const [isVisible, setIsVisible] = useState(show);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <div className="relative">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-gray-600 transition-colors z-10"
          aria-label="Close floating booking button"
        >
          <X className="w-3 h-3" />
        </button>
        
        {/* Main button */}
        <div className="bg-warm-gray text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          <QuickBookingButton
            serviceName={serviceName}
            variant="primary"
            size="md"
            className="bg-transparent hover:bg-transparent text-white rounded-full shadow-none p-4"
          >
            <div className="flex flex-col items-center space-y-1">
              <Calendar className="w-6 h-6" />
              <span className="text-xs font-medium">Book Now</span>
            </div>
          </QuickBookingButton>
        </div>
      </div>
    </div>
  );
};

export default FloatingBookingButton;
