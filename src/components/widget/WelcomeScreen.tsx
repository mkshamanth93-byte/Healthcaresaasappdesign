import { useState, useRef } from 'react';
import { UserPlus, UserCheck, Calendar, Layers, Users, ChevronRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { FloatingCloseButton } from './FloatingCloseButton';

interface WelcomeScreenProps {
  onContinue: (data: any) => void;
  onClose: () => void;
  isActive: boolean;
}

export function WelcomeScreen({ onContinue, onClose, isActive }: WelcomeScreenProps) {
  const [patientType, setPatientType] = useState<'new' | 'returning' | null>(null);
  const [appointmentPath, setAppointmentPath] = useState<'single' | 'combo' | 'family' | null>(null);
  const appointmentTypeRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePatientTypeSelect = (type: 'new' | 'returning') => {
    setPatientType(type);
    
    // Scroll to appointment type section
    setTimeout(() => {
      if (appointmentTypeRef.current && scrollContainerRef.current) {
        appointmentTypeRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleAppointmentPathSelect = (path: 'single' | 'combo' | 'family') => {
    setAppointmentPath(path);
    
    // Auto-advance after appointment path is selected
    setTimeout(() => {
      if (patientType) {
        onContinue({ patientType, appointmentPath: path });
      }
    }, 300);
  };

  const patientTypeOptions = [
    {
      id: 'new' as const,
      title: 'New Patient',
      description: 'First time visiting',
      icon: UserPlus,
    },
    {
      id: 'returning' as const,
      title: 'Returning',
      description: 'Existing patient',
      icon: UserCheck,
    },
  ];

  const appointmentPathOptions = [
    {
      id: 'single' as const,
      title: 'Single Visit',
      description: 'One appointment',
      icon: Calendar,
    },
    {
      id: 'combo' as const,
      title: 'Combo Visit',
      description: 'Exam + Cleaning',
      icon: Layers,
      badge: 'Popular'
    },
    {
      id: 'family' as const,
      title: 'Family Booking',
      description: 'Multiple patients',
      icon: Users,
    },
  ];

  const handleContinue = () => {
    if (patientType && appointmentPath) {
      onContinue({ patientType, appointmentPath });
    }
  };

  const canContinue = patientType && appointmentPath;

  return (
    <div className="flex flex-col h-full">
      {/* Hero Cover Image - Reduced height for more scroll space */}
      <div 
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: '140px' }}
      >
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1704455306925-1401c3012117?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjI5MTkyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
          alt="Dental Clinic Interior" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        <div className="relative h-full flex flex-col justify-end p-5 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-white/90" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
              Quick & Easy
            </Badge>
          </div>
          <h1 className="text-white mb-1" style={{ fontSize: '20px' }}>Book Your Appointment</h1>
          <p className="text-white/90 text-xs">Get started in just a few simple steps</p>
        </div>
      </div>

      {/* Scrollable Content with Cards */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-6" style={{ background: '#f8f9fa' }}>
        {/* Patient Type Selection */}
        <div className="space-y-3">
          <div>
            <h3 className="text-gray-900 mb-1">I am a...</h3>
            <p className="text-xs text-gray-500">Select your patient status</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {patientTypeOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = patientType === option.id;
              return (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all border-2 ${
                    isSelected
                      ? 'shadow-md'
                      : 'hover:shadow-sm'
                  }`}
                  style={{
                    borderColor: isSelected ? 'var(--booking-primary)' : '#e5e7eb',
                    background: isSelected ? 'var(--booking-primary-light)' : 'white'
                  }}
                  onClick={() => handlePatientTypeSelect(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: isSelected ? 'var(--booking-primary)' : '#f3f4f6'
                        }}
                      >
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-900 mb-1">{option.title}</h4>
                        <p className="text-xs text-gray-500">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Welcome Message - Shows after patient type is selected */}
        {patientType === 'new' && (
          <div className="flex items-center justify-center">
            <Badge 
              variant="secondary" 
              className="text-xs px-3 py-1"
              style={{ background: 'var(--booking-accent)', color: 'white', border: 'none' }}
            >
              Welcome!
            </Badge>
          </div>
        )}
        {patientType === 'returning' && (
          <div className="flex items-center justify-center">
            <Badge 
              variant="secondary" 
              className="text-xs px-3 py-1"
              style={{ background: 'var(--booking-accent)', color: 'white', border: 'none' }}
            >
              Welcome Back!
            </Badge>
          </div>
        )}

        {/* Appointment Type Selection - Only show when patient type is selected */}
        {patientType && (
          <div className="space-y-3" ref={appointmentTypeRef}>
            <div>
              <h3 className="text-gray-900 mb-1">What are you looking for?</h3>
              <p className="text-xs text-gray-500">Select your appointment type</p>
            </div>
            
            <div className="space-y-3">
              {appointmentPathOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = appointmentPath === option.id;
                return (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all border-2 ${
                      isSelected
                        ? 'shadow-md'
                        : 'hover:shadow-sm'
                    }`}
                    style={{
                      borderColor: isSelected ? 'var(--booking-primary)' : '#e5e7eb',
                      background: isSelected ? 'var(--booking-primary-light)' : 'white'
                    }}
                    onClick={() => handleAppointmentPathSelect(option.id)}
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
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <FloatingCloseButton onClose={onClose} />
    </div>
  );
}