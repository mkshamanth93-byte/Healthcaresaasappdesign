import { useState, useEffect } from 'react';
import { Users, UserPlus, Stethoscope, Sparkles, ChevronRight, User, Check } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { TopBar } from './TopBar';

interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  relationship: string; // 'primary' | 'spouse' | 'child' | 'parent' | 'sibling' | 'other'
  email?: string;
  phone?: string;
}

interface ReturningFamilySetupScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  familyMembers: FamilyMember[]; // Family data from database
}

export function ReturningFamilySetupScreen({ 
  onContinue, 
  onBack, 
  onClose, 
  isActive,
  familyMembers 
}: ReturningFamilySetupScreenProps) {
  const [bookingFor, setBookingFor] = useState<'me-plus-family' | 'family-only' | null>(null);
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [appointmentType, setAppointmentType] = useState<'exam-all' | 'hygiene-all' | null>(null);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  // Find primary patient
  const primaryPatient = familyMembers.find(m => m.relationship === 'primary');

  // Handle booking type change and auto-select primary if needed
  const handleBookingForChange = (type: 'me-plus-family' | 'family-only') => {
    setBookingFor(type);
    
    // Auto-select primary patient if "Me + Family"
    if (type === 'me-plus-family' && primaryPatient) {
      setSelectedPatients([primaryPatient.id]);
    } else {
      // Clear selection when switching to "Family Only"
      setSelectedPatients([]);
    }
  };

  // Handle patient selection toggle
  const handlePatientToggle = (patientId: string) => {
    // If "Me + Family", primary patient cannot be deselected
    if (bookingFor === 'me-plus-family' && primaryPatient?.id === patientId) {
      return; // Do nothing - primary must stay selected
    }

    setSelectedPatients(prev => {
      if (prev.includes(patientId)) {
        return prev.filter(id => id !== patientId);
      } else {
        return [...prev, patientId];
      }
    });
  };

  // Handle appointment type change - AUTO ADVANCE
  const handleAppointmentTypeChange = (type: 'exam-all' | 'hygiene-all') => {
    setAppointmentType(type);
    
    // Auto-advance after selection
    setTimeout(() => {
      onContinue({
        familyBookingFor: bookingFor,
        selectedPatientIds: selectedPatients,
        familyPatientCount: selectedPatients.length,
        familyAppointmentType: type,
        familyMembers: familyMembers.filter(m => selectedPatients.includes(m.id))
      });
    }, 300);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Get relationship display text
  const getRelationshipText = (relationship: string) => {
    if (relationship === 'primary') return null;
    return relationship.charAt(0).toUpperCase() + relationship.slice(1);
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
      depositPerPerson: 50,
    },
    {
      id: 'hygiene-all' as const,
      title: 'Hygiene for All',
      description: 'Everyone gets a cleaning',
      icon: Sparkles,
      badge: 'Popular',
      depositPerPerson: 35,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top Bar */}
      <TopBar
        onBack={onBack}
        onClose={onClose}
        title="Family Booking"
        subtitle="Set up appointments for your family"
        bookingData={{}}
        isComboFlow={false}
        onSummaryClick={() => setShowSummaryPopup(true)}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-6">
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

        {/* Step 2: Patient Selection - Only show when bookingFor is selected */}
        {bookingFor && (
          <div className="space-y-3">
            <div>
              <h3 className="text-gray-900 mb-1">Who needs appointments?</h3>
              <p className="text-xs text-gray-500">
                Select family members who need appointments
              </p>
            </div>
            
            <div className="space-y-3">
              {familyMembers.map((member) => {
                const isSelected = selectedPatients.includes(member.id);
                const isPrimary = member.relationship === 'primary';
                const isDisabled = bookingFor === 'me-plus-family' && isPrimary;
                const relationshipText = getRelationshipText(member.relationship);
                
                return (
                  <Card
                    key={member.id}
                    className={`cursor-pointer transition-all border-2 ${
                      isSelected ? 'shadow-md' : 'hover:shadow-sm'
                    } ${isDisabled ? 'opacity-75' : ''}`}
                    style={{
                      borderColor: isSelected ? 'var(--booking-primary)' : '#e5e7eb',
                      background: isSelected ? 'var(--booking-primary-light)' : 'white'
                    }}
                    onClick={() => handlePatientToggle(member.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Checkbox */}
                        <div 
                          className="w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
                          style={{
                            borderColor: isSelected ? 'var(--booking-primary)' : '#d1d5db',
                            background: isSelected ? 'var(--booking-primary)' : 'white'
                          }}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>

                        {/* Patient Icon */}
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: isSelected ? 'var(--booking-primary)' : '#f3f4f6'
                          }}
                        >
                          <User className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                        </div>

                        {/* Patient Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-sm text-gray-900">
                              {member.firstName} {member.lastName}
                              {isPrimary && <span className="text-gray-500"> (You)</span>}
                            </h4>
                            {isDisabled && (
                              <Badge 
                                variant="secondary" 
                                className="text-xs px-2 py-0"
                                style={{ background: 'var(--booking-primary)', color: 'white', border: 'none' }}
                              >
                                Required
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
                            {relationshipText && (
                              <>
                                <span>{relationshipText}</span>
                                <span>•</span>
                              </>
                            )}
                            <span>DOB: {formatDate(member.dateOfBirth)}</span>
                            <span>•</span>
                            <span className="capitalize">{member.gender}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Selection count indicator */}
            {selectedPatients.length > 0 && (
              <div 
                className="p-3 rounded-lg flex items-center justify-between"
                style={{ background: 'var(--booking-primary-light)' }}
              >
                <p className="text-xs" style={{ color: 'var(--booking-primary)' }}>
                  <strong>{selectedPatients.length}</strong> {selectedPatients.length === 1 ? 'patient' : 'patients'} selected
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Appointment Type - Only show when patients are selected */}
        {bookingFor && selectedPatients.length > 0 && (
          <div className="space-y-3">
            <div>
              <h3 className="text-gray-900 mb-1">What type of appointments?</h3>
              <p className="text-xs text-gray-500">Select appointment style</p>
            </div>
            
            <div className="space-y-3">
              {appointmentTypeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = appointmentType === option.id;
                const totalDeposit = option.depositPerPerson * selectedPatients.length;
                
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
                      <div className="space-y-3">
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
                        
                        {/* Deposit Info */}
                        <div 
                          className="flex items-start gap-2 p-3 rounded-lg"
                          style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}
                        >
                          <span className="text-sm flex-shrink-0 mt-0.5">£</span>
                          <div className="flex-1">
                            <p className="text-xs text-gray-900">
                              <span>Deposit: £{option.depositPerPerson} per person</span>
                              <span className="mx-1.5">•</span>
                              <span className="text-gray-900">Total: £{totalDeposit}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Refundable if cancelled 24+ hours in advance
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
