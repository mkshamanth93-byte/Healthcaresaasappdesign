import { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import { Badge } from '../ui/badge';
import { BottomCTA } from './BottomCTA';
import { TopBar } from './TopBar';
import { SummaryPopup } from './SummaryPopup';
import { FloatingCloseButton } from './FloatingCloseButton';

interface ReturningProviderScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  usualProviderId?: string;
  bookingData: any;
  isComboFlow: boolean;
}

export function ReturningProviderScreen({ onContinue, onBack, onClose, isActive, usualProviderId = 'johnson', bookingData, isComboFlow }: ReturningProviderScreenProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>(usualProviderId);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  const providers = [
    {
      id: 'johnson',
      name: 'Dr. Sarah Johnson',
      credentials: 'DDS, FAGD',
      specialty: 'General & Cosmetic Dentistry',
      rating: 4.9,
      reviewCount: 248,
      yearsExperience: 15,
      profilePhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=200&fit=crop',
      bio: 'Dr. Johnson brings 15 years of experience in general and cosmetic dentistry, with a focus on patient comfort and comprehensive care.',
      designations: ['FAGD', 'Invisalign Certified', 'Cosmetic Expert'],
    },
    {
      id: 'roberts',
      name: 'Dr. Michael Roberts',
      credentials: 'DDS, MS',
      specialty: 'Master of Science in Dentistry',
      rating: 4.8,
      reviewCount: 195,
      yearsExperience: 12,
      profilePhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=200&fit=crop',
      bio: 'Dr. Roberts focuses on advanced diagnostic procedures and patient education, ensuring comprehensive treatment planning.',
      designations: ['Board Certified', 'ADA Member', 'Digital Dentistry'],
    },
    {
      id: 'chen',
      name: 'Dr. Emily Chen',
      credentials: 'DDS',
      specialty: 'Family & Preventive Dentistry',
      rating: 4.9,
      reviewCount: 312,
      yearsExperience: 10,
      profilePhoto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=200&fit=crop',
      bio: 'Dr. Chen specializes in family dentistry with a gentle touch, providing comprehensive care for patients of all ages.',
      designations: ['Invisalign Provider', 'CEREC Certified', 'Laser Dentistry'],
    },
  ];

  const handleContinue = () => {
    if (selectedProvider) {
      onContinue({ provider: selectedProvider });
    }
  };

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    
    // Auto-advance logic:
    // If user changed from usual provider → auto-advance
    // If usual provider is still selected → Keep CTA button (requires confirmation)
    const shouldAutoAdvance = providerId !== usualProviderId;
    
    if (shouldAutoAdvance) {
      setTimeout(() => {
        onContinue({ provider: providerId });
      }, 300);
    }
  };

  // Show Continue button only if usual provider is still selected
  const showContinueButton = selectedProvider === usualProviderId;

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <TopBar
        onBack={onBack}
        onClose={onClose}
        title="Select Provider"
        subtitle="Who would you like to see?"
        bookingData={bookingData}
        isComboFlow={isComboFlow}
        onSummaryClick={() => setShowSummaryPopup(true)}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-5">
        {/* Provider Cards */}
        <div className="space-y-4">
          {providers.map((provider) => {
            const isSelected = selectedProvider === provider.id;
            const isUsualProvider = provider.id === usualProviderId;
            return (
              <button
                key={provider.id}
                onClick={() => handleProviderSelect(provider.id)}
                className={`w-full rounded-2xl border-2 overflow-hidden transition-all text-left ${
                  isSelected
                    ? 'shadow-md'
                    : ''
                }`}
                style={{
                  borderColor: isSelected ? 'var(--booking-primary)' : '#e5e7eb',
                  background: isSelected ? 'var(--booking-primary-light)' : 'white'
                }}
              >
                {/* Cover Photo */}
                <div 
                  className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 relative"
                  style={{ 
                    backgroundImage: `url(${provider.coverPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Your Usual Dentist Tag */}
                  {isUsualProvider && (
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                        <span className="text-xs text-gray-900">Your Usual Dentist</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="px-5 pb-5">
                  {/* Profile Photo */}
                  <div className="relative -mt-10 mb-3 flex items-end justify-between">
                    <div 
                      className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden shadow-md"
                      style={{ border: '4px solid white' }}
                    >
                      <img 
                        src={provider.profilePhoto} 
                        alt={provider.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--booking-primary)' }}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-gray-900">{provider.name}</h3>
                      <p className="text-xs text-gray-600">{provider.credentials}</p>
                      <p className="text-xs" style={{ color: 'var(--booking-primary)' }}>{provider.specialty}</p>
                    </div>

                    {/* Rating & Experience */}
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5"
                              fill={i < Math.floor(provider.rating) ? 'var(--booking-accent)' : 'none'}
                              style={{ color: 'var(--booking-accent)' }}
                            />
                          ))}
                        </div>
                        <span className="text-gray-900">{provider.rating}</span>
                        <span className="text-gray-500">({provider.reviewCount})</span>
                      </div>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{provider.yearsExperience}+ years</span>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-gray-600 leading-relaxed">{provider.bio}</p>

                    {/* Designations */}
                    <div className="flex flex-wrap gap-1.5">
                      {provider.designations.map((designation, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs px-2 py-0.5"
                          style={{ background: '#f3f4f6', color: '#6b7280', border: 'none' }}
                        >
                          {designation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA - Only shown when usual provider is selected */}
      {showContinueButton && (
        <BottomCTA
          onContinue={handleContinue}
          onBack={onBack}
          continueText="Continue with My Dentist"
          continueDisabled={false}
        />
      )}

      {/* Floating Close Button - Only shown when auto-advance will happen */}
      {!showContinueButton && <FloatingCloseButton onClose={onClose} />}

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
