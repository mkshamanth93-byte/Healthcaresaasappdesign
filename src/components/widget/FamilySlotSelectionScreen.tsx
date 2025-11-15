import { useState } from 'react';
import { Calendar, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, MapPin, Users, Stethoscope, User } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface FamilySlotSelectionScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  isActive: boolean;
  appointmentType: 'exam-all' | 'hygiene-all';
  patientCount: number;
  location: string;
  providerId: string;
}

interface DayAvailability {
  date: Date;
  availableSlots: number;
  hasEnoughSlots: boolean;
}

export function FamilySlotSelectionScreen({ 
  onContinue, 
  onBack, 
  isActive,
  appointmentType,
  patientCount,
  location,
  providerId
}: FamilySlotSelectionScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false);

  // Mock provider names
  const providerNames: Record<string, string> = {
    'johnson': 'Dr. Sarah Johnson',
    'roberts': 'Dr. Michael Roberts',
    'chen': 'Dr. Lisa Chen',
    'williams': 'Sarah Williams',
    'davis': 'Mike Davis',
    'taylor': 'Emily Taylor'
  };

  const locationNames: Record<string, string> = {
    'downtown': 'Downtown',
    'westside': 'Westside',
    'eastside': 'Eastside'
  };

  // Generate calendar data with smart availability
  const generateCalendarDays = (): DayAvailability[] => {
    const days: DayAvailability[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Generate next 42 days (6 weeks) for calendar grid
    for (let i = 0; i < 42; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      // Skip past dates
      if (date < today) continue;

      // Skip Sundays
      if (date.getDay() === 0) {
        days.push({
          date,
          availableSlots: 0,
          hasEnoughSlots: false
        });
        continue;
      }

      // Smart availability logic
      // More slots available on weekdays, fewer on Saturdays
      const isSaturday = date.getDay() === 6;
      const baseSlots = isSaturday ? 3 : 8;
      
      // Randomize availability (70% chance of having enough slots)
      const randomFactor = Math.random();
      const availableSlots = randomFactor > 0.3 
        ? Math.floor(Math.random() * 3) + patientCount // Has enough
        : Math.floor(Math.random() * (patientCount - 1)) + 1; // Not enough

      days.push({
        date,
        availableSlots: Math.min(availableSlots, baseSlots),
        hasEnoughSlots: availableSlots >= patientCount
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Get days for current month view
  const getMonthDays = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    const days: (DayAvailability | null)[] = [];
    
    // Add empty slots for days before month starts
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days
    const monthDays = calendarDays.filter(day => {
      return day.date.getMonth() === currentMonth.getMonth() &&
             day.date.getFullYear() === currentMonth.getFullYear();
    });
    
    days.push(...monthDays);
    
    return days;
  };

  const monthDays = getMonthDays();

  const handleDateSelect = (day: DayAvailability) => {
    if (day.hasEnoughSlots) {
      setSelectedDate(day.date);
      setSelectedTimeSlots([]); // Reset time slots when date changes
    }
  };

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlots.length > 0) {
      onContinue({
        selectedDate: selectedDate.toISOString(),
        selectedTimeSlots: selectedTimeSlots,
      });
    }
  };

  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    const today = new Date();
    // Don't go before current month
    if (prev >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(prev);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const canContinue = selectedDate !== null && selectedTimeSlots.length === patientCount;

  const isExamType = appointmentType === 'exam-all';

  // Generate available time slots for selected date
  const generateTimeSlots = () => {
    if (!selectedDate) return { morning: [], afternoon: [], evening: [] };

    // Individual 30-minute slots
    const morningTimes = ['8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
    const afternoonTimes = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'];
    const eveningTimes = ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'];

    const createSlots = (times: string[]) => {
      return times.map((time, index) => ({
        id: time,
        time: time,
        isAvailable: Math.random() > 0.2 // 80% available
      }));
    };

    return {
      morning: createSlots(morningTimes),
      afternoon: createSlots(afternoonTimes),
      evening: createSlots(eveningTimes)
    };
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSlotClick = (slotId: string, isAvailable: boolean) => {
    if (!isAvailable) return;

    const isSelected = selectedTimeSlots.includes(slotId);
    
    if (isSelected) {
      // Deselect
      setSelectedTimeSlots(selectedTimeSlots.filter(id => id !== slotId));
    } else {
      // Select if not at limit
      if (selectedTimeSlots.length < patientCount) {
        setSelectedTimeSlots([...selectedTimeSlots, slotId]);
      }
    }
  };

  const hasSlots = timeSlots.morning.length > 0 || timeSlots.afternoon.length > 0 || timeSlots.evening.length > 0;

  return (
    <div className="flex flex-col h-full" style={{ background: '#f8f9fa' }}>
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-6">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--booking-primary-light)' }}
            >
              <Calendar className="w-5 h-5" style={{ color: 'var(--booking-primary)' }} />
            </div>
            <div>
              <h2 className="text-gray-900">Select Date</h2>
              <p className="text-xs text-gray-500">Choose a day for your group appointment</p>
            </div>
          </div>
        </div>

        {/* Context Info Card - Collapsible */}
        <Card className="border-2" style={{ borderColor: 'var(--booking-primary-light)', background: 'white' }}>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--booking-primary-light)' }}
                >
                  <Users className="w-5 h-5" style={{ color: 'var(--booking-primary)' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Group Booking Summary</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{locationNames[location] || location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{providerNames[providerId] || providerId}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{patientCount} {patientCount === 1 ? 'patient' : 'patients'}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="p-1 transition-all"
                      style={{ color: 'var(--booking-primary)' }}
                    >
                      {showDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {showDetails && (
                <div 
                  className="pt-3 border-t space-y-2"
                  style={{ borderColor: 'var(--booking-primary-light)' }}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Stethoscope className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{isExamType ? 'Exam' : 'Hygiene'} for all patients</span>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: 'var(--booking-primary-light)' }}>
                    <p className="text-xs text-gray-600">
                      We'll find consecutive time slots so all {patientCount} family members can be seen back-to-back with {providerNames[providerId]}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <div className="space-y-3">
          <div>
            <h3 className="text-gray-900 mb-1">Available Dates</h3>
            <p className="text-xs text-gray-500">Dates with enough consecutive slots are highlighted</p>
          </div>

          <Card className="border-2" style={{ borderColor: '#e5e7eb', background: 'white' }}>
            <CardContent className="p-4">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: '#e5e7eb' }}>
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-lg transition-all hover:bg-gray-100"
                  style={{ color: '#6b7280' }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h4 className="text-gray-900">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h4>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg transition-all hover:bg-gray-100"
                  style={{ color: '#6b7280' }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} />;
                  }

                  const isSunday = day.date.getDay() === 0;
                  const isSelected = selectedDate?.getTime() === day.date.getTime();

                  // If Sunday or not enough slots, show as unavailable
                  if (isSunday || !day.hasEnoughSlots) {
                    return (
                      <div
                        key={index}
                        className="aspect-square flex items-center justify-center rounded-lg text-xs text-gray-300"
                      >
                        {day.date.getDate()}
                      </div>
                    );
                  }

                  // Available date
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(day)}
                      className="aspect-square flex items-center justify-center rounded-lg text-xs transition-all"
                      style={{
                        background: isSelected ? 'var(--booking-primary)' : '#d1fae5',
                        color: isSelected ? 'white' : '#059669',
                        border: isSelected ? '2px solid var(--booking-primary)' : '2px solid #86efac'
                      }}
                    >
                      {day.date.getDate()}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-lg" 
                style={{ background: '#d1fae5' }}
              />
              <span className="text-gray-600">Available</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <Card className="border-2" style={{ borderColor: '#e0e7ff', background: '#f0f4ff' }}>
          <CardContent className="p-4">
            <p className="text-xs text-gray-600">
              💡 <strong>Smart Scheduling:</strong> We only show dates where we can book {patientCount} consecutive appointments with your selected provider.
            </p>
          </CardContent>
        </Card>

        {/* Time Slot Selection - Shows after date is selected */}
        {selectedDate && hasSlots && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-900 mb-1">Available Time Slots</h3>
                <p className="text-xs text-gray-500">
                  Select {patientCount} time {patientCount === 1 ? 'slot' : 'slots'} for your family members
                </p>
              </div>
              {selectedTimeSlots.length > 0 && (
                <div
                  className="px-3 py-1.5 rounded-lg"
                  style={{
                    background: 'var(--booking-primary-light)',
                    color: 'var(--booking-primary)'
                  }}
                >
                  <span className="text-xs">{selectedTimeSlots.length} of {patientCount} selected</span>
                </div>
              )}
            </div>

            {/* Morning Slots */}
            {timeSlots.morning.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs text-gray-500 px-1">Morning</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.morning.map((slot) => {
                    const isSelected = selectedTimeSlots.includes(slot.id);
                    const isDisabled = !slot.isAvailable || (!isSelected && selectedTimeSlots.length >= patientCount);
                    
                    return (
                      <button
                        key={slot.id}
                        onClick={() => handleTimeSlotClick(slot.id, slot.isAvailable)}
                        disabled={isDisabled}
                        className={`
                          p-3 rounded-xl border-2 transition-all text-center
                          ${isDisabled && !isSelected ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:border-gray-300'}
                        `}
                        style={{
                          background: 'white',
                          borderColor: isSelected
                            ? 'var(--booking-primary)'
                            : '#e5e7eb'
                        }}
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-xs text-gray-900">{slot.time}</span>
                          {isSelected && (
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: 'var(--booking-primary)' }}
                            >
                              <svg
                                className="w-2.5 h-2.5"
                                fill="white"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Afternoon Slots */}
            {timeSlots.afternoon.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs text-gray-500 px-1">Afternoon</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.afternoon.map((slot) => {
                    const isSelected = selectedTimeSlots.includes(slot.id);
                    const isDisabled = !slot.isAvailable || (!isSelected && selectedTimeSlots.length >= patientCount);
                    
                    return (
                      <button
                        key={slot.id}
                        onClick={() => handleTimeSlotClick(slot.id, slot.isAvailable)}
                        disabled={isDisabled}
                        className={`
                          p-3 rounded-xl border-2 transition-all text-center
                          ${isDisabled && !isSelected ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:border-gray-300'}
                        `}
                        style={{
                          background: 'white',
                          borderColor: isSelected
                            ? 'var(--booking-primary)'
                            : '#e5e7eb'
                        }}
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-xs text-gray-900">{slot.time}</span>
                          {isSelected && (
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: 'var(--booking-primary)' }}
                            >
                              <svg
                                className="w-2.5 h-2.5"
                                fill="white"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Evening Slots */}
            {timeSlots.evening.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs text-gray-500 px-1">Evening</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.evening.map((slot) => {
                    const isSelected = selectedTimeSlots.includes(slot.id);
                    const isDisabled = !slot.isAvailable || (!isSelected && selectedTimeSlots.length >= patientCount);
                    
                    return (
                      <button
                        key={slot.id}
                        onClick={() => handleTimeSlotClick(slot.id, slot.isAvailable)}
                        disabled={isDisabled}
                        className={`
                          p-3 rounded-xl border-2 transition-all text-center
                          ${isDisabled && !isSelected ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:border-gray-300'}
                        `}
                        style={{
                          background: 'white',
                          borderColor: isSelected
                            ? 'var(--booking-primary)'
                            : '#e5e7eb'
                        }}
                      >
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-xs text-gray-900">{slot.time}</span>
                          {isSelected && (
                            <div
                              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: 'var(--booking-primary)' }}
                            >
                              <svg
                                className="w-2.5 h-2.5"
                                fill="white"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div 
        className="p-5 border-t flex items-center gap-3"
        style={{ 
          background: 'white', 
          borderColor: '#e5e7eb',
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}
      >
        <button
          onClick={onBack}
          className="p-3 transition-all flex items-center justify-center"
          style={{
            background: 'transparent',
            color: '#6b7280'
          }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="flex-1 px-6 py-3.5 rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: canContinue 
              ? 'linear-gradient(135deg, var(--booking-gradient-start) 0%, var(--booking-gradient-end) 100%)'
              : '#e5e7eb',
            color: canContinue ? 'white' : '#9ca3af'
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <span>Continue</span>
            <ChevronRight className="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  );
}