import { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronUp, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { TopBar } from './TopBar';
import { SummaryPopup } from './SummaryPopup';

interface FamilySlotSelectionScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  appointmentType: 'exam-all' | 'hygiene-all';
  patientCount: number;
  location: string;
  providerId: string;
  bookingData: any;
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

interface SelectedSlot {
  date: Date;
  time: string;
}

export function FamilySlotSelectionScreen({ 
  onContinue, 
  onBack, 
  onClose,
  isActive,
  appointmentType,
  patientCount,
  location,
  providerId,
  bookingData
}: FamilySlotSelectionScreenProps) {
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({});
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  
  // Mock data - Generate slots with gaps (like Dentally)
  const generateMockSlots = (): { slots: DateSlots[], noAvailabilityRanges: NoAvailabilityRange[] } => {
    const slots: DateSlots[] = [];
    const noAvailabilityRanges: NoAvailabilityRange[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Available: Nov 18
    const date1 = new Date(today);
    date1.setDate(today.getDate() + 3);
    slots.push({
      date: date1,
      slots: {
        morning: [
          { time: '9:00 AM' },
          { time: '9:30 AM' },
          { time: '10:00 AM' },
          { time: '10:30 AM' },
          { time: '11:00 AM' },
          { time: '11:30 AM' },
        ],
        afternoon: [
          { time: '12:00 PM' },
          { time: '1:00 PM' },
          { time: '2:00 PM' },
          { time: '3:00 PM' },
          { time: '4:00 PM' },
        ],
        evening: [
          { time: '5:00 PM' },
          { time: '5:30 PM' },
          { time: '6:00 PM' },
        ]
      },
      totalSlots: 14
    });
    
    // Not working: Nov 19
    noAvailabilityRanges.push({
      startDate: new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() + 1),
      endDate: new Date(date1.getFullYear(), date1.getMonth(), date1.getDate() + 1)
    });
    
    // Available: Nov 20
    const date2 = new Date(today);
    date2.setDate(today.getDate() + 5);
    slots.push({
      date: date2,
      slots: {
        morning: [
          { time: '9:00 AM' },
          { time: '9:30 AM' },
          { time: '10:00 AM' },
          { time: '10:30 AM' },
          { time: '11:00 AM' },
        ],
        afternoon: [
          { time: '12:00 PM' },
          { time: '1:00 PM' },
          { time: '2:00 PM' },
          { time: '3:00 PM' },
        ],
        evening: [
          { time: '5:00 PM' },
          { time: '5:30 PM' },
        ]
      },
      totalSlots: 12
    });
    
    // Not available: Nov 21 - Nov 30
    noAvailabilityRanges.push({
      startDate: new Date(date2.getFullYear(), date2.getMonth(), date2.getDate() + 1),
      endDate: new Date(date2.getFullYear(), date2.getMonth(), date2.getDate() + 10)
    });
    
    // Available: Dec 4
    const date3 = new Date(today);
    date3.setDate(today.getDate() + 16);
    slots.push({
      date: date3,
      slots: {
        morning: [
          { time: '9:00 AM' },
          { time: '9:30 AM' },
          { time: '10:00 AM' },
          { time: '10:30 AM' },
        ],
        afternoon: [
          { time: '12:00 PM' },
          { time: '1:00 PM' },
          { time: '2:00 PM' },
        ],
        evening: [
          { time: '5:00 PM' },
        ]
      },
      totalSlots: 8
    });
    
    return { slots, noAvailabilityRanges };
  };

  const { slots: availableDates, noAvailabilityRanges } = generateMockSlots();

  // Check if a slot is selected
  const isSlotSelected = (date: Date, time: string) => {
    return selectedSlots.some(slot => 
      slot.date.toDateString() === date.toDateString() && slot.time === time
    );
  };

  // Get the locked date (if any slots are selected)
  const getLockedDate = (): Date | null => {
    if (selectedSlots.length === 0) return null;
    return selectedSlots[0].date;
  };

  // Check if a date is the locked date
  const isDateLocked = (date: Date): boolean => {
    const lockedDate = getLockedDate();
    if (!lockedDate) return false;
    return date.toDateString() !== lockedDate.toDateString();
  };

  // Handle slot selection (multi-select)
  const handleSlotClick = (date: Date, time: string) => {
    const alreadySelected = isSlotSelected(date, time);
    
    if (alreadySelected) {
      // Remove the slot
      setSelectedSlots(selectedSlots.filter(slot => 
        !(slot.date.toDateString() === date.toDateString() && slot.time === time)
      ));
    } else {
      // Add the slot if we haven't reached the limit
      if (selectedSlots.length < patientCount) {
        setSelectedSlots([...selectedSlots, { date, time }]);
      }
    }
  };

  // Auto-advance when all slots are selected
  useEffect(() => {
    if (selectedSlots.length === patientCount) {
      setTimeout(() => {
        onContinue({
          selectedDate: selectedSlots[0].date.toISOString(),
          selectedTimeSlots: selectedSlots.map(slot => slot.time),
          familyDate: selectedSlots[0].date.toISOString(),
          familySlots: selectedSlots.map((slot, index) => ({
            time: slot.time,
            date: slot.date.toISOString(),
            patientIndex: index + 1,
            patientName: `Patient ${index + 1}`
          }))
        });
      }, 300);
    }
  }, [selectedSlots, patientCount, onContinue]);

  // Format date header (e.g., "Tue, November 18")
  const formatDateHeader = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'long',
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Format date range for no availability
  const formatNoAvailabilityRange = (startDate: Date, endDate: Date) => {
    const isSingleDay = startDate.getDate() === endDate.getDate() && 
                        startDate.getMonth() === endDate.getMonth();
    
    if (isSingleDay) {
      return startDate.toLocaleDateString('en-US', { 
        weekday: 'short',
        day: 'numeric',
        month: 'long'
      });
    } else {
      const startStr = startDate.toLocaleDateString('en-US', { 
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
      const endStr = endDate.toLocaleDateString('en-US', { 
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
      return `${startStr} - ${endStr}`;
    }
  };

  // Toggle expanded slots for a specific date
  const toggleExpandedSlots = (dateKey: string) => {
    setExpandedDates(prev => ({
      ...prev,
      [dateKey]: !prev[dateKey]
    }));
  };

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
      // Scroll to this date in the list
      const dateKey = date.toISOString();
      const element = document.getElementById(`date-${dateKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setShowCalendar(false);
    }
  };

  // Combine slots and no-availability ranges for rendering
  const combinedTimeline: Array<{ type: 'slots' | 'noAvailability', data: any }> = [];
  
  availableDates.forEach((dateSlot, idx) => {
    combinedTimeline.push({ type: 'slots', data: dateSlot });
    
    // Check if there's a no-availability range after this slot
    const noAvailRange = noAvailabilityRanges[idx];
    if (noAvailRange) {
      combinedTimeline.push({ type: 'noAvailability', data: noAvailRange });
    }
  });

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top Bar */}
      <TopBar
        onBack={onBack}
        onClose={onClose}
        title={`Select ${patientCount} ${patientCount === 1 ? 'Time' : 'Times'}`}
        subtitle={`Choose ${patientCount} time ${patientCount === 1 ? 'slot' : 'slots'} for your family members`}
        bookingData={bookingData}
        isComboFlow={false}
        onSummaryClick={() => setShowSummaryPopup(true)}
      />

      {/* Summary Popup */}
      <SummaryPopup
        isOpen={showSummaryPopup}
        onClose={() => setShowSummaryPopup(false)}
        bookingData={bookingData}
        isComboFlow={false}
        isFamilyFlow={true}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-8 space-y-4">
        {/* Selection Progress Indicator */}
        {selectedSlots.length > 0 && (
          <div 
            className="px-4 py-3 rounded-xl flex items-center justify-between mt-4"
            style={{ background: 'var(--booking-primary-light)' }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'var(--booking-primary)' }}
              >
                <span className="text-white text-sm">{selectedSlots.length}</span>
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--booking-primary)' }}>
                  {selectedSlots.length} of {patientCount} slots selected
                </p>
                {selectedSlots.length < patientCount && (
                  <p className="text-xs text-gray-600">
                    Select {patientCount - selectedSlots.length} more
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Calendar Accordion */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-4">
          {/* Calendar Toggle Header */}
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" style={{ color: 'var(--booking-primary)' }} />
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

          {/* Calendar Content - Expands inside same tile */}
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
                    <span>Available</span>
                  </div>
                </div>

                <p className="text-xs text-center text-gray-500 mt-2">
                  Select a date to jump to it in the list below
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Infinite Scroller - Date Slots with No Availability Ranges */}
        <div className="space-y-4">
          {combinedTimeline.map((item, idx) => {
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
            const dateKey = dateSlot.date.toISOString();
            const isExpanded = expandedDates[dateKey] || false;
            
            // Check if this date is locked (user selected slots from a different day)
            const thisDateIsLocked = isDateLocked(dateSlot.date);
            
            // Show first 3 slots of each period by default, unless expanded
            const visibleMorning = isExpanded ? dateSlot.slots.morning : dateSlot.slots.morning.slice(0, 3);
            const visibleAfternoon = isExpanded ? dateSlot.slots.afternoon : dateSlot.slots.afternoon.slice(0, 3);
            const visibleEvening = isExpanded ? dateSlot.slots.evening : dateSlot.slots.evening.slice(0, 3);
            
            const hasMoreSlots = (
              dateSlot.slots.morning.length > 3 ||
              dateSlot.slots.afternoon.length > 3 ||
              dateSlot.slots.evening.length > 3
            );

            return (
              <div key={dateKey} id={`date-${dateKey}`} className="space-y-3 scroll-mt-4">
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
                          const isSelected = isSlotSelected(dateSlot.date, slot.time);
                          const isDisabled = thisDateIsLocked || (!isSelected && selectedSlots.length >= patientCount);
                          
                          return (
                            <button
                              key={slot.time}
                              onClick={() => handleSlotClick(dateSlot.date, slot.time)}
                              disabled={isDisabled}
                              className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                                isSelected
                                  ? 'text-white shadow-sm'
                                  : isDisabled
                                  ? 'bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
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
                          const isSelected = isSlotSelected(dateSlot.date, slot.time);
                          const isDisabled = thisDateIsLocked || (!isSelected && selectedSlots.length >= patientCount);
                          
                          return (
                            <button
                              key={slot.time}
                              onClick={() => handleSlotClick(dateSlot.date, slot.time)}
                              disabled={isDisabled}
                              className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                                isSelected
                                  ? 'text-white shadow-sm'
                                  : isDisabled
                                  ? 'bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
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
                          const isSelected = isSlotSelected(dateSlot.date, slot.time);
                          const isDisabled = thisDateIsLocked || (!isSelected && selectedSlots.length >= patientCount);
                          
                          return (
                            <button
                              key={slot.time}
                              onClick={() => handleSlotClick(dateSlot.date, slot.time)}
                              disabled={isDisabled}
                              className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                                isSelected
                                  ? 'text-white shadow-sm'
                                  : isDisabled
                                  ? 'bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
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
                      onClick={() => toggleExpandedSlots(dateKey)}
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
          })}
        </div>
      </div>
    </div>
  );
}