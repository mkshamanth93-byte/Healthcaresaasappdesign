import { useState } from 'react';
import { Users, UserPlus, Stethoscope, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface FamilySetupScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  isActive: boolean;
}

export function FamilySetupScreen({ onContinue, onBack, isActive }: FamilySetupScreenProps) {
  const [bookingFor, setBookingFor] = useState<'me-plus-family' | 'family-only' | null>(null);
  const [patientCount, setPatientCount] = useState<number>(2);
  const [appointmentType, setAppointmentType] = useState<'exam-all' | 'hygiene-all' | null>(null);

  // Handle booking type change and reset patient count appropriately
  const handleBookingForChange = (type: 'me-plus-family' | 'family-only') => {
    setBookingFor(type);
    // Set default count based on booking type
    if (type === 'me-plus-family') {
      setPatientCount(2); // Default to 2 for "Me + Family"
    } else {
      setPatientCount(1); // Default to 1 for "Family Only"
    }
    
    // Auto-advance if appointment type is already selected
    if (appointmentType) {
      setTimeout(() => {
        onContinue({
          familyBookingFor: type,
          familyPatientCount: type === 'me-plus-family' ? 2 : 1,
          familyAppointmentType: appointmentType,
        });
      }, 300);
    }
  };

  // Handle patient count change
  const handlePatientCountChange = (count: number) => {
    setPatientCount(count);
    
    // Auto-advance if bookingFor and appointmentType are already selected
    if (bookingFor && appointmentType) {
      setTimeout(() => {
        onContinue({
          familyBookingFor: bookingFor,
          familyPatientCount: count,
          familyAppointmentType: appointmentType,
        });
      }, 300);
    }
  };

  // Handle appointment type change
  const handleAppointmentTypeChange = (type: 'exam-all' | 'hygiene-all') => {
    setAppointmentType(type);
    
    // Auto-advance if bookingFor and patientCount are already selected
    if (bookingFor && patientCount) {
      setTimeout(() => {
        onContinue({
          familyBookingFor: bookingFor,
          familyPatientCount: patientCount,
          familyAppointmentType: type,
        });
      }, 300);
    }
  };

  // Get available patient counts based on booking type
  const getAvailableCounts = () => {
    if (bookingFor === 'me-plus-family') {
      return [2, 3, 4]; // Me + Family: 2-4 people
    }
    return [1, 2, 3, 4]; // Family Only: 1-4 people
  };

  const bookingForOptions = [
    {
      id: 'me-plus-family' as const,
      title: 'Me + Family',
      description: 'I am also getting an appointment',
      icon: UserPlus,
    },
    {
      id: 'family-only' as const,
      title: 'Family Only',
      description: 'Booking for others only',
      icon: Users,
    },
  ];

  const appointmentTypeOptions = [
    {
      id: 'exam-all' as const,
      title: 'Exam for All',
      description: 'Everyone gets an exam',
      icon: Stethoscope,
    },
    {
      id: 'hygiene-all' as const,
      title: 'Hygiene for All',
      description: 'Everyone gets a cleaning',
      icon: Sparkles,
      badge: 'Popular'
    },
  ];

  const handleContinue = () => {
    if (bookingFor && appointmentType) {
      onContinue({
        familyBookingFor: bookingFor,
        familyPatientCount: patientCount,
        familyAppointmentType: appointmentType,
      });
    }
  };

  const canContinue = bookingFor && appointmentType;

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
              <Users className="w-5 h-5" style={{ color: 'var(--booking-primary)' }} />
            </div>
            <div>
              <h2 className="text-gray-900">Family Booking</h2>
              <p className="text-xs text-gray-500">Set up appointments for your family</p>
            </div>
          </div>
        </div>

        {/* Step 1: Who are you booking for? */}
        <div className="space-y-3">
          <div>
            <h3 className="text-gray-900 mb-1">Who are you booking for?</h3>
            <p className="text-xs text-gray-500">Select booking type</p>
          </div>
          
          <div className="space-y-3">
            {bookingForOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = bookingFor === option.id;
              return (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all border-2 ${
                    isSelected ? 'shadow-md' : 'hover:shadow-sm'
                  }`}
                  style={{
                    borderColor: isSelected ? 'var(--booking-primary)' : '#e5e7eb',
                    background: isSelected ? 'var(--booking-primary-light)' : 'white'
                  }}
                  onClick={() => handleBookingForChange(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isSelected ? 'var(--booking-primary)' : '#f3f4f6'
                        }}
                      >
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm text-gray-900 mb-0.5">{option.title}</h4>
                        <p className="text-xs text-gray-500">{option.description}</p>
                      </div>
                      {isSelected && (
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ background: 'var(--booking-primary)' }}
                        >
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Step 2: Number of Patients - Only show when bookingFor is selected */}
        {bookingFor && (
          <div className="space-y-3">
            <div>
              <h3 className="text-gray-900 mb-1">How many people?</h3>
              <p className="text-xs text-gray-500">
                {bookingFor === 'me-plus-family' 
                  ? 'Including yourself (up to 4 total)' 
                  : 'Family members only (up to 4)'}
              </p>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {getAvailableCounts().map((count) => {
                const isSelected = patientCount === count;
                return (
                  <button
                    key={count}
                    onClick={() => handlePatientCountChange(count)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected ? 'shadow-md' : 'hover:shadow-sm'
                    }`}
                    style={{
                      borderColor: isSelected ? 'var(--booking-primary)' : '#e5e7eb',
                      background: isSelected ? 'var(--booking-primary-light)' : 'white'
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          background: isSelected ? 'var(--booking-primary)' : '#f3f4f6'
                        }}
                      >
                        <span className={`${isSelected ? 'text-white' : 'text-gray-600'}`}>
                          {count}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {count === 1 ? 'person' : 'people'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Appointment Type - Only show when bookingFor and count are selected */}
        {bookingFor && (
          <div className="space-y-3">
            <div>
              <h3 className="text-gray-900 mb-1">What type of appointments?</h3>
              <p className="text-xs text-gray-500">Select appointment style</p>
            </div>
            
            <div className="space-y-3">
              {appointmentTypeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = appointmentType === option.id;
                return (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all border-2 ${
                      isSelected ? 'shadow-md' : 'hover:shadow-sm'
                    }`}
                    style={{
                      borderColor: isSelected ? 'var(--booking-primary)' : '#e5e7eb',
                      background: isSelected ? 'var(--booking-primary-light)' : 'white'
                    }}
                    onClick={() => handleAppointmentTypeChange(option.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: isSelected ? 'var(--booking-primary)' : '#f3f4f6'
                          }}
                        >
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-sm text-gray-900">{option.title}</h4>
                            {option.badge && (
                              <Badge 
                                variant="secondary" 
                                className="text-xs px-2 py-0"
                                style={{ background: 'var(--booking-accent)', color: 'white', border: 'none' }}
                              >
                                {option.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{option.description}</p>
                        </div>
                        {isSelected && (
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: 'var(--booking-primary)' }}
                          >
                            <ChevronRight className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Navigation */}
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