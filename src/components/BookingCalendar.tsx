import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, X, CheckCircle } from 'lucide-react';
import { env } from '../utils/env';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  [date: string]: TimeSlot[];
}

interface BookingCalendarProps {
  selectedService: string;
  onBookingConfirm: (date: string, time: string) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ selectedService, onBookingConfirm }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Mock booking data - in a real app, this would come from your backend
  const bookingData: BookingData = {
    '2025-08-30': [
      { time: '9:00 AM', available: true },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: true },
      { time: '2:00 PM', available: true },
      { time: '3:00 PM', available: false },
      { time: '4:00 PM', available: true },
      { time: '5:00 PM', available: true }
    ],
    '2025-08-31': [
      { time: '9:00 AM', available: true },
      { time: '10:00 AM', available: true },
      { time: '11:00 AM', available: false },
      { time: '2:00 PM', available: true },
      { time: '3:00 PM', available: true },
      { time: '4:00 PM', available: false },
      { time: '5:00 PM', available: true }
    ],
    '2025-09-02': [
      { time: '9:00 AM', available: false },
      { time: '10:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '2:00 PM', available: true },
      { time: '3:00 PM', available: true },
      { time: '4:00 PM', available: true },
      { time: '5:00 PM', available: false }
    ],
    '2025-09-03': [
      { time: '9:00 AM', available: true },
      { time: '10:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '2:00 PM', available: false },
      { time: '3:00 PM', available: true },
      { time: '4:00 PM', available: true },
      { time: '5:00 PM', available: true }
    ]
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateAvailable = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    
    // Sunday is closed (0 = Sunday)
    if (dayOfWeek === 0) return false;
    
    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return false;
    
    return true;
  };

  const hasAvailableSlots = (dateString: string) => {
    const slots = bookingData[dateString];
    return slots && slots.some(slot => slot.available);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = formatDate(clickedDate);
    
    if (isDateAvailable(dateString) && hasAvailableSlots(dateString)) {
      setSelectedDate(dateString);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedService) {
      setShowBookingForm(true);
    }
  };

  const confirmBooking = () => {
    if (selectedDate && selectedTime && customerInfo.name && customerInfo.phone) {
      onBookingConfirm(selectedDate, selectedTime);
      setShowBookingForm(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setCustomerInfo({ name: '', phone: '', email: '' });
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = formatDate(date);
      const isAvailable = isDateAvailable(dateString);
      const hasSlots = hasAvailableSlots(dateString);
      const isSelected = selectedDate === dateString;
      const isToday = dateString === formatDate(new Date());

      let dayClass = 'h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 touch-manipulation ';
      
      if (!isAvailable || !hasSlots) {
        dayClass += 'text-gray-300 cursor-not-allowed bg-gray-50';
      } else if (isSelected) {
        dayClass += 'bg-warm-gray text-white scale-105 shadow-md';
      } else if (isToday) {
        dayClass += 'bg-nude text-black font-semibold ring-2 ring-warm-gray/30';
      } else {
        dayClass += 'text-black hover:bg-nude/30 active:scale-95';
      }

      days.push(
        <div
          key={day}
          className={dayClass}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  if (!selectedService) {
    return (
      <div className="border-2 border-dashed border-nude rounded-lg p-12 text-center">
        <Clock className="w-16 h-16 mx-auto mb-4 text-warm-gray" />
        <h4 className="text-lg font-medium text-black mb-2">
          Select a Service First
        </h4>
        <p className="text-sm text-warm-gray">
          Please choose a service to view available appointment times
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-medium text-black">
          Available Dates for {selectedService}
        </h4>
        <div className="hidden sm:flex items-center space-x-2 text-sm text-warm-gray">
          <span>Select a date to view available times</span>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white border border-nude rounded-lg p-4 sm:p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-nude/20 rounded-lg transition-colors touch-manipulation"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg sm:text-xl font-medium">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-nude/20 rounded-lg transition-colors touch-manipulation"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-8 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-medium text-warm-gray">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>

        {/* Mobile helper text */}
        <div className="mt-4 text-center sm:hidden">
          <p className="text-xs text-warm-gray">
            Tap a date to see available appointment times
          </p>
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="bg-white border border-nude rounded-lg p-4 sm:p-6 space-y-4 animate-slideUp">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium text-black">
              Available Times
            </h4>
            <div className="text-sm text-warm-gray">
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
          
          <div className="text-sm text-warm-gray mb-4">
            Choose your preferred appointment time
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {bookingData[selectedDate]?.map((slot, index) => (
              <button
                key={slot.time}
                onClick={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`p-3 sm:p-4 rounded-lg text-sm font-medium transition-all duration-200 touch-manipulation animate-fadeIn ${
                  !slot.available
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                    : selectedTime === slot.time
                    ? 'bg-warm-gray text-white scale-105 shadow-md ring-2 ring-warm-gray/30'
                    : 'bg-nude/20 text-black hover:bg-nude/40 active:scale-95 hover:shadow-sm'
                }`}
              >
                {slot.time}
                {!slot.available && <span className="block text-xs mt-1 opacity-75">Booked</span>}
              </button>
            ))}
          </div>
          
          {selectedTime && (
            <div className="pt-4 space-y-4 animate-slideUp">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-800">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Time selected: {selectedTime}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleBooking}
                className="w-full bg-warm-gray text-white py-3 px-6 rounded-lg font-medium hover:bg-black transition-all duration-200 hover:scale-105 transform active:scale-95"
              >
                Continue to Book {selectedService}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-nude p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-serif font-medium">Confirm Your Booking</h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close booking form"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Booking Summary */}
              <div className="bg-nude/20 border border-nude rounded-lg p-4">
                <h4 className="font-medium text-black mb-3">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Service:</span>
                    <span className="font-medium">{selectedService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Date:</span>
                    <span className="font-medium">
                      {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                </div>
              </div>

              {/* Customer Information Form */}
              <div className="space-y-4">
                <h4 className="font-medium text-black">Your Information</h4>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-nude rounded-lg focus:ring-2 focus:ring-warm-gray focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border border-nude rounded-lg focus:ring-2 focus:ring-warm-gray focus:border-transparent transition-all"
                    placeholder={env.contact.phone.includes('XXX') ? '+260 XXX XXX XXX' : env.contact.phone}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-nude rounded-lg focus:ring-2 focus:ring-warm-gray focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Deposit Information */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-amber-800">Deposit Required</h5>
                    <p className="text-sm text-amber-700 leading-relaxed">
                      A deposit of <strong>{env.business.currency} {env.business.depositAmount}</strong> is required to confirm your booking. 
                      This amount will be deducted from your total service cost. We'll contact you 
                      with payment instructions after you confirm your booking.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 py-3 px-4 border border-nude rounded-lg text-black hover:bg-nude/20 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  disabled={!customerInfo.name || !customerInfo.phone}
                  className="flex-1 py-3 px-4 bg-warm-gray text-white rounded-lg hover:bg-black transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium disabled:hover:bg-gray-300"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-black mb-3">Legend</h4>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-nude rounded"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warm-gray rounded"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
