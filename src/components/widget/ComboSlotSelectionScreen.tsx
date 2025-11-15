import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { TopBar } from './TopBar';
import { SummaryPopup } from './SummaryPopup';

interface ComboSlotSelectionScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  bookingData: any;
  isComboFlow: boolean;
}

interface TimeSlot {
  time: string;
}

interface DateSlots {
  date: Date;
  slots: {
    morning: TimeSlot[];
    afternoon: TimeSlot[];
    evening: TimeSlot[];
  };
  totalSlots: number;
}

interface NoAvailabilityRange {
  startDate: Date;
  endDate: Date;
}

export function ComboSlotSelectionScreen({ 
  onContinue, 
  onBack, 
  onClose, 
  isActive, 
  bookingData,
  isComboFlow 
}: ComboSlotSelectionScreenProps) {
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  
  // Exam provider states
  const [examAccordionExpanded, setExamAccordionExpanded] = useState(true); // OPEN by default
  const [examSelectedDate, setExamSelectedDate] = useState<Date | null>(null);
  const [examSelectedTime, setExamSelectedTime] = useState<string | null>(null);
  const [expandedExamDates, setExpandedExamDates] = useState<Record<string, boolean>>({});
  
  // Hygiene provider states
  const [hygieneAccordionExpanded, setHygieneAccordionExpanded] = useState(false);
  const [hygieneSelectedTime, setHygieneSelectedTime] = useState<string | null>(null);
  const [expandedHygieneDates, setExpandedHygieneDates] = useState<Record<string, boolean>>({});
  
  const examAccordionRef = useRef<HTMLDivElement>(null);
  const hygieneAccordionRef = useRef<HTMLDivElement>(null);

  // Get provider names
  const getProviderName = (providerId: string) => {
    const providerNames: Record<string, string> = {
      'johnson': 'Dr. Sarah Johnson',
      'roberts': 'Dr. Michael Roberts',
      'chen': 'Dr. Emily Chen',
      'williams': 'Sarah Williams',
      'davis': 'Mike Davis',
      'taylor': 'Emily Taylor'
    };
    return providerNames[providerId] || providerId;
  };

  const examProviderId = bookingData?.comboProviders?.examProvider || bookingData?.examProvider;
  const hygieneProviderId = bookingData?.comboProviders?.hygieneProvider || bookingData?.hygieneProvider;
  const examProviderName = getProviderName(examProviderId);
  const hygieneProviderName = getProviderName(hygieneProviderId);

  // Mock data: Generate dates where BOTH providers are available
  const generateDualAvailableDates = (): DateSlots[] => {
    const slots: DateSlots[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Generate next 30 days with availability
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (both providers unavailable)
      if (date.getDay() === 0) continue;
      
      // Mock logic: Both available on Mon, Wed, Thu, Fri
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 2 || dayOfWeek === 6) continue; // Skip Tues & Sat
      
      // Generate random slots for this date
      const morningSlots: TimeSlot[] = [
        { time: '8:30 AM' }, { time: '9:00 AM' }, { time: '10:00 AM' },
        { time: '10:30 AM' }, { time: '11:00 AM' }, { time: '11:30 AM' }
      ];
      const afternoonSlots: TimeSlot[] = [
        { time: '1:00 PM' }, { time: '2:00 PM' }, { time: '2:30 PM' },
        { time: '3:00 PM' }, { time: '3:30 PM' }
      ];
      const eveningSlots: TimeSlot[] = [
        { time: '4:00 PM' }, { time: '4:30 PM' }, { time: '5:00 PM' }
      ];
      
      slots.push({
        date,
        slots: {
          morning: morningSlots,
          afternoon: afternoonSlots,
          evening: eveningSlots
        },
        totalSlots: morningSlots.length + afternoonSlots.length + eveningSlots.length
      });
    }
    
    return slots;
  };

  const availableDates = generateDualAvailableDates();

  // Generate no-availability ranges
  const generateNoAvailabilityRanges = (): NoAvailabilityRange[] => {
    const ranges: NoAvailabilityRange[] = [];
    
    for (let i = 0; i < availableDates.length - 1; i++) {
      const currentDate = new Date(availableDates[i].date);
      const nextDate = new Date(availableDates[i + 1].date);
      
      // Calculate days between
      const daysBetween = Math.floor((nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysBetween > 1) {
        const gapStart = new Date(currentDate);
        gapStart.setDate(gapStart.getDate() + 1);
        const gapEnd = new Date(nextDate);
        gapEnd.setDate(gapEnd.getDate() - 1);
        
        ranges.push({
          startDate: gapStart,
          endDate: gapEnd
        });
      }
    }
    
    return ranges;
  };

  const noAvailabilityRanges = generateNoAvailabilityRanges();

  // Format no-availability range text
  const formatNoAvailabilityRange = (startDate: Date, endDate: Date) => {
    if (startDate.toDateString() === endDate.toDateString()) {
      return startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    } else {
      return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
    }
  };

  // Combine slots and no-availability ranges for rendering
  const combinedExamTimeline: Array<{ type: 'slots' | 'noAvailability', data: any }> = [];
  
  availableDates.forEach((dateSlot, idx) => {
    combinedExamTimeline.push({ type: 'slots', data: dateSlot });
    
    // Check if there's a no-availability range after this slot
    const noAvailRange = noAvailabilityRanges[idx];
    if (noAvailRange) {
      combinedExamTimeline.push({ type: 'noAvailability', data: noAvailRange });
    }
  });

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    return { daysInMonth, startingDayOfWeek: firstDayOfWeek };
  };

  const isDateAvailable = (date: Date) => {
    return availableDates.some(slot => {
      const slotDate = new Date(slot.date);
      slotDate.setHours(0, 0, 0, 0);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      return slotDate.getTime() === checkDate.getTime();
    });
  };

  const handleCalendarDateClick = (date: Date) => {
    if (isDateAvailable(date)) {
      // Scroll to this date in the exam accordion
      const dateKey = date.toISOString();
      const element = document.getElementById(`exam-date-${dateKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setShowCalendar(false);
    }
  };

  const formatDateHeader = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    if (checkDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (checkDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const formatDateShort = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Toggle expanded slots
  const toggleExpandedExamSlots = (dateKey: string) => {
    setExpandedExamDates(prev => ({
      ...prev,
      [dateKey]: !prev[dateKey]
    }));
  };

  const toggleExpandedHygieneSlots = (dateKey: string) => {
    setExpandedHygieneDates(prev => ({
      ...prev,
      [dateKey]: !prev[dateKey]
    }));
  };

  // Handle exam slot selection
  const handleExamSlotSelect = (date: Date, time: string) => {
    setExamSelectedDate(date);
    setExamSelectedTime(time);
    
    // Close exam accordion and open hygiene accordion after a short delay
    setTimeout(() => {
      setExamAccordionExpanded(false);
      setHygieneAccordionExpanded(true);
      
      // Scroll to hygiene accordion
      setTimeout(() => {
        hygieneAccordionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 300);
  };

  // Handle hygiene slot selection
  const handleHygieneSlotSelect = (time: string) => {
    setHygieneSelectedTime(time);
    
    // Auto-advance after selection
    setTimeout(() => {
      onContinue({
        examSlot: { date: examSelectedDate?.toISOString().split('T')[0], time: examSelectedTime },
        hygieneSlot: { date: examSelectedDate?.toISOString().split('T')[0], time },
        date: examSelectedDate?.toISOString().split('T')[0],
        examTime: examSelectedTime,
        hygieneTime: time
      });
    }, 300);
  };

  // Change handlers
  const handleChangeExamDateTime = () => {
    setExamSelectedDate(null);
    setExamSelectedTime(null);
    setHygieneSelectedTime(null);
    setExamAccordionExpanded(true);
    setHygieneAccordionExpanded(false);
    
    setTimeout(() => {
      examAccordionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleChangeHygieneTime = () => {
    setHygieneSelectedTime(null);
    setHygieneAccordionExpanded(true);
    
    setTimeout(() => {
      hygieneAccordionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Render slot grid for a date
  const renderSlotGrid = (
    dateSlot: DateSlots,
    isExam: boolean,
    selectedDate: Date | null,
    selectedTime: string | null,
    onSelect: (date: Date, time: string) => void,
    expandedDates: Record<string, boolean>,
    toggleExpanded: (key: string) => void
  ) => {
    const dateKey = dateSlot.date.toISOString();
    const isExpanded = expandedDates[dateKey] || false;
    
    const visibleMorning = isExpanded ? dateSlot.slots.morning : dateSlot.slots.morning.slice(0, 3);
    const visibleAfternoon = isExpanded ? dateSlot.slots.afternoon : dateSlot.slots.afternoon.slice(0, 3);
    const visibleEvening = isExpanded ? dateSlot.slots.evening : dateSlot.slots.evening.slice(0, 3);
    
    const hasMoreSlots = (
      dateSlot.slots.morning.length > 3 ||
      dateSlot.slots.afternoon.length > 3 ||
      dateSlot.slots.evening.length > 3
    );

    const isDateSelected = selectedDate?.toDateString() === dateSlot.date.toDateString();

    return (
      <div key={dateKey} id={`${isExam ? 'exam' : 'hygiene'}-date-${dateKey}`} className="space-y-3 scroll-mt-4">
        {/* Date Header */}
        <div className="pt-2">
          <h3 className="text-base text-gray-900">
            {formatDateHeader(dateSlot.date)}
          </h3>
          <p className="text-xs text-gray-500">{dateSlot.totalSlots} slots available</p>
        </div>

        {/* Slot Groups */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
          {/* Morning */}
          {visibleMorning.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Morning</p>
              <div className="grid grid-cols-3 gap-2">
                {visibleMorning.map((slot) => {
                  const isSelected = isDateSelected && selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      onClick={() => onSelect(dateSlot.date, slot.time)}
                      className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                        isSelected
                          ? 'text-white shadow-sm'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                      style={isSelected ? {
                        background: 'var(--booking-primary)'
                      } : undefined}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Afternoon */}
          {visibleAfternoon.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Afternoon</p>
              <div className="grid grid-cols-3 gap-2">
                {visibleAfternoon.map((slot) => {
                  const isSelected = isDateSelected && selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      onClick={() => onSelect(dateSlot.date, slot.time)}
                      className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                        isSelected
                          ? 'text-white shadow-sm'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                      style={isSelected ? {
                        background: 'var(--booking-primary)'
                      } : undefined}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Evening */}
          {visibleEvening.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Evening</p>
              <div className="grid grid-cols-3 gap-2">
                {visibleEvening.map((slot) => {
                  const isSelected = isDateSelected && selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      onClick={() => onSelect(dateSlot.date, slot.time)}
                      className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                        isSelected
                          ? 'text-white shadow-sm'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                      style={isSelected ? {
                        background: 'var(--booking-primary)'
                      } : undefined}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Show More/Fewer Button */}
          {hasMoreSlots && (
            <button
              onClick={() => toggleExpanded(dateKey)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              style={{ color: 'var(--booking-primary)' }}
            >
              <Plus className="w-4 h-4" />
              {isExpanded ? 'Show fewer slots' : 'Show more slots'}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top Bar */}
      <TopBar
        onBack={onBack}
        onClose={onClose}
        title="Select Date & Time"
        subtitle="Choose appointment times for both providers"
        bookingData={bookingData}
        isComboFlow={isComboFlow}
        onSummaryClick={() => setShowSummaryPopup(true)}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-4">
        {/* Calendar Accordion - CLOSED by default */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-4">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" style={{ color: 'var(--booking-primary)' }} />
              <span className="text-sm text-gray-900">
                {showCalendar ? 'Close Calendar' : 'See Dates Available'}
              </span>
            </div>
            {showCalendar ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {showCalendar && (
            <div className="px-4 pb-4 pt-2 border-t border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => {
                      const newMonth = new Date(currentCalendarMonth);
                      newMonth.setMonth(newMonth.getMonth() - 1);
                      setCurrentCalendarMonth(newMonth);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-sm text-gray-900">
                    {currentCalendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => {
                      const newMonth = new Date(currentCalendarMonth);
                      newMonth.setMonth(newMonth.getMonth() + 1);
                      setCurrentCalendarMonth(newMonth);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="space-y-2">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                      <div key={idx} className="flex items-center justify-center text-xs text-gray-500 h-8">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {(() => {
                      const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentCalendarMonth);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      
                      return (
                        <>
                          {[...Array(startingDayOfWeek)].map((_, idx) => (
                            <div key={`empty-${idx}`} className="w-full aspect-square"></div>
                          ))}
                          {[...Array(daysInMonth)].map((_, idx) => {
                            const day = idx + 1;
                            const date = new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth(), day);
                            date.setHours(0, 0, 0, 0);
                            const isAvailable = isDateAvailable(date);
                            const isPast = date < today;
                            const isClickable = isAvailable && !isPast;

                            return (
                              <button
                                key={day}
                                disabled={!isClickable}
                                onClick={() => handleCalendarDateClick(date)}
                                className={`w-full aspect-square rounded-lg text-xs flex items-center justify-center transition-all ${
                                  isPast
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : isAvailable
                                    ? 'bg-green-100 text-green-900 hover:bg-green-200 border border-green-200'
                                    : 'text-gray-400'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
                    <span>Available (both providers)</span>
                  </div>
                </div>

                <p className="text-xs text-center text-gray-500 mt-2">
                  Select a date to jump to it in the list below
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Exam Provider Accordion */}
        <div ref={examAccordionRef} className="bg-white rounded-lg border-2 overflow-hidden" style={{ borderColor: 'var(--booking-primary)' }}>
          <button
            onClick={() => !examSelectedTime && setExamAccordionExpanded(!examAccordionExpanded)}
            disabled={!!examSelectedTime}
            className="w-full px-4 py-3 flex items-center justify-between"
            style={{ background: examSelectedTime ? '#f0fdf4' : 'var(--booking-primary-light)' }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: examSelectedTime ? '#10b981' : 'var(--booking-primary)' }}
              >
                {examSelectedTime ? (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-white text-sm">1</span>
                )}
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-900">{examProviderName}</div>
                <div className="text-xs text-gray-600">
                  {examSelectedTime && examSelectedDate 
                    ? `${formatDateShort(examSelectedDate)} at ${examSelectedTime}`
                    : 'Exam Appointment'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {examSelectedTime && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChangeExamDateTime();
                  }}
                  className="text-xs px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: 'var(--booking-primary)' }}
                >
                  Change
                </button>
              )}
              {!examSelectedTime && (examAccordionExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ))}
            </div>
          </button>

          {examAccordionExpanded && !examSelectedTime && (
            <div className="border-t border-gray-100 bg-gray-50 px-4 py-4 space-y-4 max-h-96 overflow-y-auto">
              {combinedExamTimeline.map((item, idx) => {
                if (item.type === 'noAvailability') {
                  const range = item.data as NoAvailabilityRange;
                  return (
                    <div key={`no-avail-${idx}`} className="text-center py-6">
                      <p className="text-sm text-gray-400 uppercase tracking-wide">
                        {formatNoAvailabilityRange(range.startDate, range.endDate)}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">Not working</p>
                    </div>
                  );
                }

                // Render date with slots
                const dateSlot = item.data as DateSlots;
                return renderSlotGrid(
                  dateSlot,
                  true,
                  examSelectedDate,
                  examSelectedTime,
                  handleExamSlotSelect,
                  expandedExamDates,
                  toggleExpandedExamSlots
                );
              })}
            </div>
          )}
        </div>

        {/* Hygiene Provider Accordion - Visible from start, locked until exam selected */}
        <div ref={hygieneAccordionRef} className="bg-white rounded-lg border-2 overflow-hidden" style={{ borderColor: examSelectedTime ? 'var(--booking-accent)' : '#e5e7eb' }}>
          <button
            onClick={() => examSelectedTime && !hygieneSelectedTime && setHygieneAccordionExpanded(!hygieneAccordionExpanded)}
            disabled={!examSelectedTime || !!hygieneSelectedTime}
            className={`w-full px-4 py-3 flex items-center justify-between ${!examSelectedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ background: hygieneSelectedTime ? '#f0fdf4' : examSelectedTime ? 'rgba(255, 215, 0, 0.1)' : '#f9fafb' }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: hygieneSelectedTime ? '#10b981' : examSelectedTime ? 'var(--booking-accent)' : '#d1d5db' }}
              >
                {hygieneSelectedTime ? (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-white text-sm">2</span>
                )}
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-900">{hygieneProviderName}</div>
                <div className="text-xs text-gray-600">
                  {hygieneSelectedTime && examSelectedDate
                    ? `${formatDateShort(examSelectedDate)} at ${hygieneSelectedTime}`
                    : examSelectedTime 
                    ? 'Hygiene Appointment'
                    : 'Select exam time first'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hygieneSelectedTime && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChangeHygieneTime();
                  }}
                  className="text-xs px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: 'var(--booking-accent)' }}
                >
                  Change
                </button>
              )}
              {examSelectedTime && !hygieneSelectedTime && (hygieneAccordionExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ))}
            </div>
          </button>

          {hygieneAccordionExpanded && !hygieneSelectedTime && examSelectedTime && examSelectedDate && (
            <div className="border-t border-gray-100 bg-gray-50 px-4 py-4 space-y-4 max-h-96 overflow-y-auto">
              {/* Note about same date */}
              <div className="px-3 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-900">
                  Showing available times on <strong>{formatDateShort(examSelectedDate)}</strong> only
                </p>
              </div>
              
              {/* Only show the single date that was selected for exam */}
              {availableDates
                .filter(dateSlot => dateSlot.date.toDateString() === examSelectedDate.toDateString())
                .map((dateSlot) => 
                  renderSlotGrid(
                    dateSlot,
                    false,
                    examSelectedDate,
                    hygieneSelectedTime,
                    (date, time) => handleHygieneSlotSelect(time),
                    expandedHygieneDates,
                    toggleExpandedHygieneSlots
                  )
                )}
            </div>
          )}
        </div>
      </div>

      {/* Summary Popup */}
      <SummaryPopup 
        isOpen={showSummaryPopup}
        onClose={() => setShowSummaryPopup(false)}
        bookingData={bookingData}
        isComboFlow={isComboFlow}
      />
    </div>
  );
}