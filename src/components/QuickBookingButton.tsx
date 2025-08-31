import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface QuickBookingButtonProps {
  serviceName?: string;
  variant?: 'primary' | 'secondary' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

const QuickBookingButton: React.FC<QuickBookingButtonProps> = ({
  serviceName,
  variant = 'primary',
  size = 'md',
  className = '',
  children
}) => {
  const bookingUrl = serviceName 
    ? `/booking?service=${encodeURIComponent(serviceName)}`
    : '/booking';

  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 hover:scale-105 transform active:scale-95';
  
  const variantClasses = {
    primary: 'bg-warm-gray text-white hover:bg-black',
    secondary: 'border border-black text-black hover:bg-black hover:text-white',
    inline: 'text-warm-gray hover:text-black underline decoration-2 underline-offset-4'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm space-x-2',
    md: 'px-6 py-3 text-sm space-x-2',
    lg: 'px-8 py-4 text-base space-x-3'
  };

  const roundedClass = variant === 'inline' ? '' : 'rounded-lg';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClass} ${className}`;

  return (
    <Link to={bookingUrl} className={buttonClasses}>
      {variant !== 'inline' && <Calendar className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>
        {children || (serviceName ? `Book ${serviceName}` : 'Book Appointment')}
      </span>
    </Link>
  );
};

export default QuickBookingButton;
