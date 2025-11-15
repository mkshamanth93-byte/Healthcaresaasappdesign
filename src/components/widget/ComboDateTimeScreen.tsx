import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { BottomCTA } from './BottomCTA';

interface ComboDateTimeScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  comboProviders: {
    examProvider: string;
    hygienist: string;
  };
  isActive: boolean;
}

export function ComboDateTimeScreen({ 
  onContinue, 
  onBack, 
  comboProviders,
  isActive 
}: ComboDateTimeScreenProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedExamTime, setSelectedExamTime] = useState<string | null>(null);
  const [selectedHygieneTime, setSelectedHygieneTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const providerNames: any = {
    'johnson': 'Dr. Sarah Johnson',
    'roberts': 'Dr. Michael Roberts',
  };

  const hygienistNames: any = {
    'williams': 'Sarah Williams',
    'davis': 'Jennifer Davis',
  };

  // Mock: Days where both providers are available
  const availableDates = [
    '2025-12-03',
    '2025-12-05',
    '2025-12-08',
    '2025-12-10',
    '2025-12-12',
    '2025-12-15',
    '2025-12-17',
    '2025-12-19',
    '2025-12-22',
    '2025-12-24',
    '2025-12-26',
    '2025-12-29',
  ];

  // Mock time slots for exam provider
  const examTimeSlots = {
    morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'],
    afternoon: ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'],
    evening: ['4:00 PM', '4:30 PM', '5:00 PM'],
  };

  // Mock time slots for hygienist (1 hour after exam times)
  const hygieneTimeSlots = {
    morning: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'],
    evening: ['5:00 PM', '5:30 PM', '6:00 PM'],
  };

  const handleContinue = () => {
    if (selectedDate && selectedExamTime && selectedHygieneTime) {
      onContinue({ 
        date: selectedDate, 
        examTime: selectedExamTime,
        hygieneTime: selectedHygieneTime
      });
    }
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const isDateAvailable = (day: number | null) => {
    if (!day) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return availableDates.includes(dateString);
  };

  const formatDateString = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDate(null);
    setSelectedExamTime(null);
    setSelectedHygieneTime(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDate(null);
    setSelectedExamTime(null);
    setSelectedHygieneTime(null);
  };

  const TimeSlotButton = ({ 
    time, 
    isSelected, 
    onClick, 
    color 
  }: { 
    time: string; 
    isSelected: boolean; 
    onClick: () => void; 
    color: 'purple' | 'gold';
  }) => (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-lg text-xs transition-all"
      style={{
        background: isSelected 
          ? (color === 'purple' ? 'var(--booking-primary)' : 'var(--booking-secondary)')
          : '#f3f4f6',
        color: isSelected ? 'white' : '#374151',
        border: `2px solid ${isSelected 
          ? (color === 'purple' ? 'var(--booking-primary)' : 'var(--booking-secondary)')
          : 'transparent'
        }`
      }}
    >
      {time}
    </button>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#0071e3]" />
          </div>
          <h2 className="text-lg text-gray-900">Select Date & Time</h2>
          <p className="text-sm text-gray-500">
            Choose a day when both providers are available
          </p>
        </div>

        {/* Calendar */}
        <Card className="border-2" style={{ borderColor: '#e5e7eb' }}>
          <CardContent className="p-5 space-y-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h3 className="text-sm text-gray-900">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Day Labels */}
            <div className="grid grid-cols-7 gap-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-xs text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth().map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} />;
                }

                const dateString = formatDateString(day);
                const isAvailable = isDateAvailable(day);
                const isSelected = selectedDate === dateString;

                if (!isAvailable) {
                  return (
                    <div
                      key={day}
                      className="aspect-square flex items-center justify-center rounded-lg text-xs text-gray-300"
                    >
                      {day}
                    </div>
                  );
                }

                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDate(dateString);
                      setSelectedExamTime(null);
                      setSelectedHygieneTime(null);
                    }}
                    className="aspect-square flex items-center justify-center rounded-lg text-xs transition-all"
                    style={{
                      background: isSelected ? 'var(--booking-primary)' : '#f0fdf4',
                      color: isSelected ? 'white' : '#166534',
                      border: isSelected ? '2px solid var(--booking-primary)' : '2px solid #86efac'
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Time Slot Selection - Only show when date is selected */}
        {selectedDate && (
          <div className="space-y-4">
            {/* Exam Provider Time Slots */}
            <Card className="border-2" style={{ borderColor: 'var(--booking-primary)' }}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--booking-primary)' }}></div>
                  <h3 className="text-sm text-gray-900">
                    Exam: {providerNames[comboProviders.examProvider]}
                  </h3>
                </div>

                {/* Morning */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Morning</p>
                  <div className="flex flex-wrap gap-2">
                    {examTimeSlots.morning.map(time => (
                      <TimeSlotButton
                        key={time}
                        time={time}
                        isSelected={selectedExamTime === time}
                        onClick={() => setSelectedExamTime(time)}
                        color="purple"
                      />
                    ))}
                  </div>
                </div>

                {/* Afternoon */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Afternoon</p>
                  <div className="flex flex-wrap gap-2">
                    {examTimeSlots.afternoon.map(time => (
                      <TimeSlotButton
                        key={time}
                        time={time}
                        isSelected={selectedExamTime === time}
                        onClick={() => setSelectedExamTime(time)}
                        color="purple"
                      />
                    ))}
                  </div>
                </div>

                {/* Evening */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Evening</p>
                  <div className="flex flex-wrap gap-2">
                    {examTimeSlots.evening.map(time => (
                      <TimeSlotButton
                        key={time}
                        time={time}
                        isSelected={selectedExamTime === time}
                        onClick={() => setSelectedExamTime(time)}
                        color="purple"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hygiene Provider Time Slots */}
            <Card className="border-2" style={{ borderColor: 'var(--booking-secondary)' }}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'var(--booking-secondary)' }}></div>
                  <h3 className="text-sm text-gray-900">
                    Hygiene: {hygienistNames[comboProviders.hygienist]}
                  </h3>
                </div>

                {/* Morning */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Morning</p>
                  <div className="flex flex-wrap gap-2">
                    {hygieneTimeSlots.morning.map(time => (
                      <TimeSlotButton
                        key={time}
                        time={time}
                        isSelected={selectedHygieneTime === time}
                        onClick={() => setSelectedHygieneTime(time)}
                        color="gold"
                      />
                    ))}
                  </div>
                </div>

                {/* Afternoon */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Afternoon</p>
                  <div className="flex flex-wrap gap-2">
                    {hygieneTimeSlots.afternoon.map(time => (
                      <TimeSlotButton
                        key={time}
                        time={time}
                        isSelected={selectedHygieneTime === time}
                        onClick={() => setSelectedHygieneTime(time)}
                        color="gold"
                      />
                    ))}
                  </div>
                </div>

                {/* Evening */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Evening</p>
                  <div className="flex flex-wrap gap-2">
                    {hygieneTimeSlots.evening.map(time => (
                      <TimeSlotButton
                        key={time}
                        time={time}
                        isSelected={selectedHygieneTime === time}
                        onClick={() => setSelectedHygieneTime(time)}
                        color="gold"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selection Summary */}
            {selectedExamTime && selectedHygieneTime && (
              <div className="rounded-xl p-4 space-y-2" style={{ background: 'var(--booking-primary-light)' }}>
                <p className="text-sm text-gray-900">📅 Your Appointments</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>• Exam at {selectedExamTime}</p>
                  <p>• Hygiene at {selectedHygieneTime}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <BottomCTA
        onContinue={handleContinue}
        onBack={onBack}
        continueDisabled={!selectedDate || !selectedExamTime || !selectedHygieneTime}
      />
    </div>
  );
}