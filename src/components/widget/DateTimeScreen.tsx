import { useState, useEffect } from 'react';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Layers, ChevronLeft } from 'lucide-react';

interface DateTimeScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  isActive: boolean;
  isCombo?: boolean;
  comboProviders?: {
    examProvider: string;
    hygienist: string;
  };
  bookingData?: any;
}

export function DateTimeScreen({ onContinue, onBack, isActive, isCombo, comboProviders, bookingData }: DateTimeScreenProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedExamTime, setSelectedExamTime] = useState<string | null>(null);
  const [selectedHygieneTime, setSelectedHygieneTime] = useState<string | null>(null);

  const examTimeSlots = {
    morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'],
    afternoon: ['1:00 PM', '2:00 PM', '3:00 PM'],
  };

  const hygieneTimeSlots = {
    morning: ['11:00 AM', '11:30 AM'],
    afternoon: ['12:00 PM', '2:30 PM', '3:30 PM', '4:00 PM'],
  };

  const singleTimeSlots = {
    morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
    evening: ['5:00 PM', '5:30 PM', '6:00 PM'],
  };

  const availableDates = [3, 5, 7, 10, 12, 14, 17, 19, 21, 24, 26, 28];
  const fillingFastDates = [14, 19, 26]; // Dates that are filling fast

  // Auto-land on first available date
  useEffect(() => {
    if (isActive && !selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Find first available date starting from today
      let foundDate: Date | null = null;
      const currentYear = today.getFullYear();
      const currentMonthNum = today.getMonth();
      
      // Check current month first
      for (const day of availableDates) {
        const testDate = new Date(currentYear, currentMonthNum, day);
        testDate.setHours(0, 0, 0, 0);
        if (testDate >= today) {
          foundDate = testDate;
          break;
        }
      }
      
      // If no dates in current month, check next month
      if (!foundDate && availableDates.length > 0) {
        const nextMonth = new Date(currentYear, currentMonthNum + 1, availableDates[0]);
        nextMonth.setHours(0, 0, 0, 0);
        foundDate = nextMonth;
        setCurrentMonth(new Date(currentYear, currentMonthNum + 1, 1));
      }
      
      if (foundDate) {
        setSelectedDate(foundDate);
      }
    }
  }, [isActive, selectedDate]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDateSelectable = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isDateAvailable = (day: number) => availableDates.includes(day);
  const isDateFillingFast = (day: number) => fillingFastDates.includes(day);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Auto-advance when all required fields are selected
  useEffect(() => {
    if (isCombo) {
      // For combo: need date + exam time + hygiene time
      if (selectedDate && selectedExamTime && selectedHygieneTime) {
        setTimeout(() => {
          onContinue({ 
            date: selectedDate, 
            examTime: selectedExamTime,
            hygieneTime: selectedHygieneTime
          });
        }, 300);
      }
    } else {
      // For single: need date + time
      if (selectedDate && selectedExamTime) {
        setTimeout(() => {
          onContinue({ date: selectedDate, time: selectedExamTime });
        }, 300);
      }
    }
  }, [selectedDate, selectedExamTime, selectedHygieneTime, isCombo, onContinue]);

  const handleContinue = () => {
    if (isCombo) {
      if (selectedDate && selectedExamTime && selectedHygieneTime) {
        onContinue({ 
          date: selectedDate, 
          examTime: selectedExamTime,
          hygieneTime: selectedHygieneTime
        });
      }
    } else {
      if (selectedDate && selectedExamTime) {
        onContinue({ date: selectedDate, time: selectedExamTime });
      }
    }
  };

  const canContinue = isCombo 
    ? (selectedDate && selectedExamTime && selectedHygieneTime)
    : (selectedDate && selectedExamTime);

  return (
    <div className="flex flex-col h-full">
      {/* Back Button - Top Left */}
      <div className="flex-shrink-0 px-5 pt-4 pb-2">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-5">
        {/* Section Header */}
        <div className="space-y-2">
          {isCombo && (
            <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--booking-primary)' }}>
              <Layers className="w-5 h-5" />
              <span className="text-sm">Complete Appointment</span>
            </div>
          )}
          <h2 className="text-2xl text-gray-900">Date & Time</h2>
          <p className="text-base text-gray-500">
            {isCombo ? 'Select a date, then pick times for both services' : 'When would you like to come in?'}
          </p>
        </div>

        {/* Calendar */}
        <div className="bg-white/90 rounded-2xl p-4 border border-white/40 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 2))}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="text-base text-gray-900">
              {monthNames[currentMonth.getMonth()]} - {monthNames[(currentMonth.getMonth() + 1) % 12]} {currentMonth.getMonth() === 11 ? currentMonth.getFullYear() + 1 : currentMonth.getFullYear()}
            </h3>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2))}
              className="p-2 hover:bg-black/5 rounded-lg transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Dual Month View */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Month */}
            <div className="space-y-2">
              <h4 className="text-sm text-center text-gray-700">{monthNames[currentMonth.getMonth()]}</h4>
              
              <div className="grid grid-cols-7 gap-0.5 mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <div key={idx} className="flex items-center justify-center text-xs text-gray-500 h-6">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5">
                {[...Array(startingDayOfWeek)].map((_, idx) => (
                  <div key={`empty-${idx}`} className="w-full" style={{ paddingBottom: '100%' }}></div>
                ))}
                {[...Array(daysInMonth)].map((_, idx) => {
                  const day = idx + 1;
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  date.setHours(0, 0, 0, 0);
                  const isSelectable = isDateSelectable(day);
                  const isFillingFast = isDateFillingFast(day);
                  const isAvailable = isDateAvailable(day) && !isFillingFast;
                  const isSelected = selectedDate?.getDate() === day && 
                                    selectedDate?.getMonth() === currentMonth.getMonth() &&
                                    selectedDate?.getFullYear() === currentMonth.getFullYear();
                  const isToday = date.getTime() === today.getTime();

                  return (
                    <div key={day} className="relative w-full" style={{ paddingBottom: '100%' }}>
                      <button
                        disabled={!isSelectable}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedExamTime(null);
                          setSelectedHygieneTime(null);
                        }}
                        className={`absolute inset-0 rounded-md text-xs transition-all font-medium flex items-center justify-center ${
                          isSelected
                            ? 'text-white shadow-md'
                            : isSelectable && isAvailable
                            ? 'bg-green-100 border border-green-200 text-green-800 hover:bg-green-200'
                            : isSelectable && isFillingFast
                            ? 'bg-orange-100 border border-orange-200 text-orange-800 hover:bg-orange-200'
                            : isSelectable
                            ? 'hover:bg-black/5 text-gray-900'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                        style={isSelected ? { background: 'var(--booking-primary)' } : undefined}
                      >
                        {day}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Second Month */}
            <div className="space-y-2">
              {(() => {
                const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
                const { daysInMonth: nextDaysInMonth, startingDayOfWeek: nextStartingDay } = getDaysInMonth(nextMonth);
                
                return (
                  <>
                    <h4 className="text-sm text-center text-gray-700">{monthNames[nextMonth.getMonth()]}</h4>
                    
                    <div className="grid grid-cols-7 gap-0.5 mb-1">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                        <div key={idx} className="flex items-center justify-center text-xs text-gray-500 h-6">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-0.5">
                      {[...Array(nextStartingDay)].map((_, idx) => (
                        <div key={`empty-next-${idx}`} className="w-full" style={{ paddingBottom: '100%' }}></div>
                      ))}
                      {[...Array(nextDaysInMonth)].map((_, idx) => {
                        const day = idx + 1;
                        const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), day);
                        date.setHours(0, 0, 0, 0);
                        const isSelectable = date >= today;
                        const isFillingFast = isDateFillingFast(day);
                        const isAvailable = isDateAvailable(day) && !isFillingFast;
                        const isSelected = selectedDate?.getDate() === day && 
                                          selectedDate?.getMonth() === nextMonth.getMonth() &&
                                          selectedDate?.getFullYear() === nextMonth.getFullYear();

                        return (
                          <div key={day} className="relative w-full" style={{ paddingBottom: '100%' }}>
                            <button
                              disabled={!isSelectable}
                              onClick={() => {
                                setSelectedDate(date);
                                setSelectedExamTime(null);
                                setSelectedHygieneTime(null);
                              }}
                              className={`absolute inset-0 rounded-md text-xs transition-all font-medium flex items-center justify-center ${
                                isSelected
                                  ? 'text-white shadow-md'
                                  : isSelectable && isAvailable
                                  ? 'bg-green-100 border border-green-200 text-green-800 hover:bg-green-200'
                                  : isSelectable && isFillingFast
                                  ? 'bg-orange-100 border border-orange-200 text-orange-800 hover:bg-orange-200'
                                  : isSelectable
                                  ? 'hover:bg-black/5 text-gray-900'
                                  : 'text-gray-300 cursor-not-allowed'
                              }`}
                              style={isSelected ? { background: 'var(--booking-primary)' } : undefined}
                            >
                              {day}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-black/5 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
              <span>High availability</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-100 border border-orange-200 rounded"></div>
              <span>Filling fast</span>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className="space-y-5">
            {isCombo ? (
              <>
                {/* Exam Time Slots */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: 'var(--booking-primary)' }}></div>
                    <h3 className="text-base text-gray-900">Exam Time</h3>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Morning</p>
                    <div className="grid grid-cols-3 gap-2">
                      {examTimeSlots.morning.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedExamTime(time)}
                          className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                            selectedExamTime === time
                              ? 'text-white'
                              : 'bg-white/60 border border-black/10 text-gray-900'
                          }`}
                          style={selectedExamTime === time ? {
                            background: 'var(--booking-primary)'
                          } : undefined}
                          onMouseEnter={(e) => {
                            if (selectedExamTime !== time) {
                              e.currentTarget.style.borderColor = 'var(--booking-primary)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedExamTime !== time) {
                              e.currentTarget.style.borderColor = '';
                            }
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Afternoon</p>
                    <div className="grid grid-cols-3 gap-2">
                      {examTimeSlots.afternoon.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedExamTime(time)}
                          className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                            selectedExamTime === time
                              ? 'text-white'
                              : 'bg-white/60 border border-black/10 text-gray-900'
                          }`}
                          style={selectedExamTime === time ? {
                            background: 'var(--booking-primary)'
                          } : undefined}
                          onMouseEnter={(e) => {
                            if (selectedExamTime !== time) {
                              e.currentTarget.style.borderColor = 'var(--booking-primary)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedExamTime !== time) {
                              e.currentTarget.style.borderColor = '';
                            }
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hygiene Time Slots */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: 'var(--booking-secondary)' }}></div>
                    <h3 className="text-base text-gray-900">Hygiene Time</h3>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Morning</p>
                    <div className="grid grid-cols-3 gap-2">
                      {hygieneTimeSlots.morning.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedHygieneTime(time)}
                          className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                            selectedHygieneTime === time
                              ? 'text-white'
                              : 'bg-white/60 border border-black/10 text-gray-900'
                          }`}
                          style={selectedHygieneTime === time ? {
                            background: 'var(--booking-secondary)'
                          } : undefined}
                          onMouseEnter={(e) => {
                            if (selectedHygieneTime !== time) {
                              e.currentTarget.style.borderColor = 'var(--booking-secondary)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedHygieneTime !== time) {
                              e.currentTarget.style.borderColor = '';
                            }
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Afternoon</p>
                    <div className="grid grid-cols-3 gap-2">
                      {hygieneTimeSlots.afternoon.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedHygieneTime(time)}
                          className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                            selectedHygieneTime === time
                              ? 'text-white'
                              : 'bg-white/60 border border-black/10 text-gray-900'
                          }`}
                          style={selectedHygieneTime === time ? {
                            background: 'var(--booking-secondary)'
                          } : undefined}
                          onMouseEnter={(e) => {
                            if (selectedHygieneTime !== time) {
                              e.currentTarget.style.borderColor = 'var(--booking-secondary)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedHygieneTime !== time) {
                              e.currentTarget.style.borderColor = '';
                            }
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Morning</p>
                  <div className="grid grid-cols-3 gap-2">
                    {singleTimeSlots.morning.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedExamTime(time)}
                        className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                          selectedExamTime === time
                            ? 'text-white'
                            : 'bg-white/60 border border-black/10 text-gray-900'
                        }`}
                        style={selectedExamTime === time ? {
                          background: 'var(--booking-primary)'
                        } : undefined}
                        onMouseEnter={(e) => {
                          if (selectedExamTime !== time) {
                            e.currentTarget.style.borderColor = 'var(--booking-primary)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedExamTime !== time) {
                            e.currentTarget.style.borderColor = '';
                          }
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Afternoon</p>
                  <div className="grid grid-cols-3 gap-2">
                    {singleTimeSlots.afternoon.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedExamTime(time)}
                        className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                          selectedExamTime === time
                            ? 'text-white'
                            : 'bg-white/60 border border-black/10 text-gray-900'
                        }`}
                        style={selectedExamTime === time ? {
                          background: 'var(--booking-primary)'
                        } : undefined}
                        onMouseEnter={(e) => {
                          if (selectedExamTime !== time) {
                            e.currentTarget.style.borderColor = 'var(--booking-primary)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedExamTime !== time) {
                            e.currentTarget.style.borderColor = '';
                          }
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Evening</p>
                  <div className="grid grid-cols-3 gap-2">
                    {singleTimeSlots.evening.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedExamTime(time)}
                        className={`px-3 py-2.5 rounded-lg text-sm transition-all ${
                          selectedExamTime === time
                            ? 'text-white'
                            : 'bg-white/60 border border-black/10 text-gray-900'
                        }`}
                        style={selectedExamTime === time ? {
                          background: 'var(--booking-primary)'
                        } : undefined}
                        onMouseEnter={(e) => {
                          if (selectedExamTime !== time) {
                            e.currentTarget.style.borderColor = 'var(--booking-primary)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedExamTime !== time) {
                            e.currentTarget.style.borderColor = '';
                          }
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}