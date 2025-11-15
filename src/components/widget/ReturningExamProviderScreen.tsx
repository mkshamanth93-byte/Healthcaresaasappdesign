import { useState } from 'react';
import { Star, Sparkles, Heart } from 'lucide-react';
import { Badge } from '../ui/badge';
import { BottomCTA } from './BottomCTA';
import { TopBar } from './TopBar';
import { SummaryPopup } from './SummaryPopup';

interface ReturningExamProviderScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  usualProviderId?: string;
  bookingData: any;
  isComboFlow: boolean;
}

export function ReturningExamProviderScreen({ onContinue, onBack, onClose, isActive, usualProviderId = 'johnson', bookingData, isComboFlow }: ReturningExamProviderScreenProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>(usualProviderId);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  const examProviders = [
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
      bio: 'Dr. Johnson brings 15 years of experience in general and cosmetic dentistry, specializing in comprehensive exams and preventive care.',
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
      bio: 'Dr. Roberts focuses on thorough diagnostic exams and patient education, ensuring you understand every aspect of your oral health.',
      designations: ['Board Certified', 'ADA Member', 'Digital Dentistry'],
    },
  ];

  const handleContinue = () => {
    if (selectedProvider) {
      onContinue({ examProvider: selectedProvider });
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
        onContinue({ examProvider: providerId });
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
        title="Select Exam Provider"
        subtitle="Choose the dentist who will perform your comprehensive exam"
        bookingData={bookingData}
        isComboFlow={isComboFlow}
        onSummaryClick={() => setShowSummaryPopup(true)}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-5">
        {/* Badge Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" style={{ color: 'var(--booking-primary)' }} />
          <Badge 
            className="text-xs px-3 py-1"
            style={{ background: 'var(--booking-primary)', color: 'white', border: 'none' }}
          >
            Exam + Hygiene
          </Badge>
        </div>

        {/* Provider Cards */}
        <div className="space-y-4">
          {examProviders.map((provider) => {
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
                              className={`w-3 h-3 ${
                                i < Math.floor(provider.rating) ? 'fill-current' : ''
                              }`}
                              style={{ color: 'var(--booking-primary)' }}
                            />
                          ))}
                        </div>
                        <span className="text-gray-900">{provider.rating}</span>
                        <span className="text-gray-500">({provider.reviewCount})</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{provider.yearsExperience} years exp.</span>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {provider.bio}
                    </p>

                    {/* Designation Badges */}
                    <div className="flex flex-wrap gap-2">
                      {provider.designations.map((designation, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-white/60 text-xs text-gray-700 rounded-md border border-black/5"
                        >
                          {designation}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA - Only show when usual provider is selected */}
      {showContinueButton && (
        <BottomCTA
          onContinue={handleContinue}
          onBack={onBack}
          continueDisabled={!selectedProvider}
        />
      )}

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