import { useState } from 'react';
import { Star, Award, Layers } from 'lucide-react';
import { BottomCTA } from './BottomCTA';

interface ComboProviderScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  isActive: boolean;
}

export function ComboProviderScreen({ onContinue, onBack, isActive }: ComboProviderScreenProps) {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedHygienist, setSelectedHygienist] = useState<string | null>(null);

  const examProviders = [
    {
      id: 'johnson',
      name: 'Dr. Sarah Johnson',
      credentials: 'DDS',
      specialty: 'General Dentistry',
      rating: 4.9,
      reviewCount: 248,
      profilePhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    },
    {
      id: 'roberts',
      name: 'Dr. Michael Roberts',
      credentials: 'DDS',
      specialty: 'General Dentistry',
      rating: 4.8,
      reviewCount: 195,
      profilePhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    },
  ];

  const hygienists = [
    {
      id: 'williams',
      name: 'Sarah Williams',
      credentials: 'RDH',
      specialty: 'Dental Hygienist',
      rating: 5.0,
      reviewCount: 312,
      profilePhoto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    },
    {
      id: 'davis',
      name: 'Jennifer Davis',
      credentials: 'RDH',
      specialty: 'Dental Hygienist',
      rating: 4.9,
      reviewCount: 287,
      profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    },
  ];

  const handleContinue = () => {
    if (selectedExam && selectedHygienist) {
      onContinue({ 
        comboProviders: {
          examProvider: selectedExam,
          hygienist: selectedHygienist
        }
      });
    }
  };

  const canContinue = selectedExam && selectedHygienist;

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--booking-primary)' }}>
            <Layers className="w-5 h-5" />
            <span className="text-sm">Complete Appointment</span>
          </div>
          <h2 className="text-2xl text-gray-900">Select Providers</h2>
          <p className="text-base text-gray-500">
            Choose your exam provider and hygienist
          </p>
        </div>

        {/* Exam Provider Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--booking-primary)' }}></div>
            <h3 className="text-base text-gray-900">Exam Provider</h3>
          </div>

          <div className="space-y-2">
            {examProviders.map((provider) => {
              const isSelected = selectedExam === provider.id;
              return (
                <button
                  key={provider.id}
                  onClick={() => setSelectedExam(provider.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? ''
                      : 'border-white/40 hover:border-white/60 bg-white/90'
                  }`}
                  style={isSelected ? {
                    borderColor: 'var(--booking-primary)',
                    background: 'var(--booking-primary-light)'
                  } : undefined}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <img 
                        src={provider.profilePhoto} 
                        alt={provider.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base text-gray-900">{provider.name}</h4>
                      <p className="text-sm text-gray-600">{provider.credentials} • {provider.specialty}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3"
                              style={{
                                color: i < Math.floor(provider.rating) ? 'var(--booking-primary)' : '#d1d5db',
                                fill: i < Math.floor(provider.rating) ? 'var(--booking-primary)' : 'none'
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">{provider.rating} ({provider.reviewCount})</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-primary)' }}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hygienist Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--booking-secondary)' }}></div>
            <h3 className="text-base text-gray-900">Hygienist</h3>
          </div>

          <div className="space-y-2">
            {hygienists.map((hygienist) => {
              const isSelected = selectedHygienist === hygienist.id;
              return (
                <button
                  key={hygienist.id}
                  onClick={() => setSelectedHygienist(hygienist.id)}
                  className={`w-full p-4 rounded-2xl border transition-all text-left ${
                    isSelected
                      ? ''
                      : 'border-white/40 hover:border-white/60 bg-white/90'
                  }`}
                  style={isSelected ? {
                    borderColor: 'var(--booking-secondary)',
                    background: 'var(--booking-secondary-light)'
                  } : undefined}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <img 
                        src={hygienist.profilePhoto} 
                        alt={hygienist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base text-gray-900">{hygienist.name}</h4>
                      <p className="text-sm text-gray-600">{hygienist.credentials} • {hygienist.specialty}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3"
                              style={{
                                color: i < Math.floor(hygienist.rating) ? 'var(--booking-secondary)' : '#d1d5db',
                                fill: i < Math.floor(hygienist.rating) ? 'var(--booking-secondary)' : 'none'
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">{hygienist.rating} ({hygienist.reviewCount})</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-secondary)' }}>
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Box */}
        {selectedExam && selectedHygienist && (
          <div className="p-4 rounded-xl" style={{ 
            background: 'var(--booking-primary-light)', 
            border: '1px solid var(--booking-primary)' 
          }}>
            <p className="text-sm" style={{ color: 'var(--booking-primary-hover)' }}>
              Next, we'll show available time slots where both providers are free
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <BottomCTA
        onContinue={handleContinue}
        onBack={onBack}
        continueDisabled={!canContinue}
      />
    </div>
  );
}