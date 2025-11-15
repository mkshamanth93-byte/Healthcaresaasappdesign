import { useState } from 'react';
import { Star, Award, Handshake, Heart } from 'lucide-react';
import { Badge } from '../ui/badge';
import { BottomCTA } from './BottomCTA';
import { TopBar } from './TopBar';
import { SummaryPopup } from './SummaryPopup';

interface ProviderScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  isReturningPatient?: boolean;
  preferredProviderId?: string;
  bookingData: any;
  isComboFlow: boolean;
}

export function ProviderScreen({ onContinue, onBack, onClose, isActive, isReturningPatient, preferredProviderId, bookingData, isComboFlow }: ProviderScreenProps) {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(preferredProviderId || null);
  const [hasChangedSelection, setHasChangedSelection] = useState(false);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  const providers = [
    {
      id: 'any',
      name: 'No Preference',
      subtitle: 'First Available',
      description: "We'll match you with an available provider",
      icon: Handshake,
      isNoPreference: true,
    },
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
      bio: 'Specializes in cosmetic dentistry and smile transformations with gentle, personalized care.',
      designations: ['FAGD', 'Invisalign Certified', 'Cosmetic Expert'],
    },
    {
      id: 'roberts',
      name: 'Dr. Michael Roberts',
      credentials: 'DDS, MS',
      specialty: 'Orthodontist',
      rating: 4.8,
      reviewCount: 195,
      yearsExperience: 12,
      profilePhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=200&fit=crop',
      bio: 'Board-certified orthodontist creating beautiful, healthy smiles using the latest technology.',
      designations: ['Board Certified', 'Invisalign Diamond', 'ABO Diplomate'],
    },
    {
      id: 'chen',
      name: 'Dr. Emily Chen',
      credentials: 'DMD',
      specialty: 'Pediatric Dentistry',
      rating: 5.0,
      reviewCount: 312,
      yearsExperience: 10,
      profilePhoto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=200&fit=crop',
      bio: 'Creates a fun, comfortable environment for children making dental visits enjoyable.',
      designations: ['Pediatric Specialist', 'AAPD Member', 'Sedation Certified'],
    },
  ];

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    
    // Auto-advance logic:
    // 1. If NO preferred provider (new patient) → auto-advance
    // 2. If user changed from preferred provider → auto-advance
    // 3. If preferred provider exists and was already selected → Keep CTA button (requires confirmation)
    const shouldAutoAdvance = !preferredProviderId || providerId !== preferredProviderId;
    
    if (shouldAutoAdvance) {
      setTimeout(() => {
        onContinue({ provider: providerId });
      }, 300);
    }
  };

  const handleContinue = () => {
    if (selectedProvider) {
      onContinue({ provider: selectedProvider });
    }
  };

  // Separate preferred provider from others if returning patient
  const preferredProvider = isReturningPatient && preferredProviderId 
    ? providers.find(p => p.id === preferredProviderId) 
    : null;
  
  const otherProviders = preferredProvider 
    ? providers.filter(p => p.id !== preferredProviderId)
    : providers;

  // Show Continue button only if preferred provider is still selected
  const showContinueButton = preferredProviderId && selectedProvider === preferredProviderId;

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <TopBar
        onClose={onClose}
        onBack={onBack}
        title="Provider"
        subtitle="Who would you like to see?"
        bookingData={bookingData}
        isComboFlow={isComboFlow}
        onSummaryClick={() => setShowSummaryPopup(true)}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-5">
        {/* Preferred Provider - For Returning Patients */}
        {preferredProvider && !preferredProvider.isNoPreference && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" style={{ color: 'var(--booking-primary)' }} />
              <h3 className="text-sm text-gray-700">Your Preferred Provider</h3>
            </div>
            
            <button
              onClick={() => handleProviderSelect(preferredProvider.id)}
              className={`w-full rounded-2xl border-2 overflow-hidden transition-all text-left ${
                selectedProvider === preferredProvider.id
                  ? 'shadow-sm'
                  : 'border-black/10 hover:border-black/20 bg-white/60'
              }`}
              style={selectedProvider === preferredProvider.id ? {
                borderColor: 'var(--booking-primary)',
                background: 'var(--booking-primary-light)'
              } : undefined}
            >
              {/* Cover Photo */}
              <div 
                className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 relative"
                style={{ 
                  backgroundImage: `url(${preferredProvider.coverPhoto})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <Badge 
                  className="absolute top-2 right-2 text-xs px-2 py-0.5"
                  style={{ background: 'var(--booking-accent)', color: 'white', border: 'none' }}
                >
                  Your Usual Dentist
                </Badge>
              </div>

              {/* Content */}
              <div className="px-5 pb-5">
                {/* Profile Photo */}
                <div className="relative -mt-10 mb-3 flex items-end justify-between">
                  <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
                    <img 
                      src={preferredProvider.profilePhoto} 
                      alt={preferredProvider.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedProvider === preferredProvider.id && (
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
                    <h3 className="text-xl text-gray-900">{preferredProvider.name}</h3>
                    <p className="text-sm text-gray-600">{preferredProvider.credentials}</p>
                    <p className="text-sm" style={{ color: 'var(--booking-primary)' }}>{preferredProvider.specialty}</p>
                  </div>

                  {/* Rating & Experience */}
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4"
                            style={{
                              color: i < Math.floor(preferredProvider.rating) ? 'var(--booking-primary)' : '#d1d5db',
                              fill: i < Math.floor(preferredProvider.rating) ? 'var(--booking-primary)' : 'none'
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-gray-900">{preferredProvider.rating}</span>
                      <span className="text-gray-500">({preferredProvider.reviewCount})</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Award className="w-4 h-4" />
                      <span>{preferredProvider.yearsExperience}+ years</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 leading-relaxed">{preferredProvider.bio}</p>

                  {/* Designations */}
                  <div className="flex flex-wrap gap-2">
                    {preferredProvider.designations.map((designation, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 bg-black/5 text-xs text-gray-700 rounded-lg"
                      >
                        {designation}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Other Providers */}
        {(preferredProvider || isReturningPatient) && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500">Or choose another provider</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
        )}

        {/* Providers List */}
        <div className="space-y-4">{otherProviders.map((provider) => {
            const isSelected = selectedProvider === provider.id;

            if (provider.isNoPreference) {
              return (
                <button
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider.id)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                    isSelected
                      ? 'shadow-sm'
                      : 'border-black/10 hover:border-black/20 bg-white/60'
                  }`}
                  style={isSelected ? {
                    borderColor: 'var(--booking-primary)',
                    background: 'var(--booking-primary-light)'
                  } : undefined}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-primary)' }}>
                      <Handshake className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-gray-900 mb-0.5">{provider.name}</h3>
                      <p className="text-base text-gray-500 mb-1">{provider.subtitle}</p>
                      <p className="text-sm text-gray-500">{provider.description}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-primary)' }}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            }

            return (
              <button
                key={provider.id}
                onClick={() => handleProviderSelect(provider.id)}
                className={`w-full rounded-2xl border-2 overflow-hidden transition-all text-left ${
                  isSelected
                    ? 'shadow-sm'
                    : 'border-black/10 hover:border-black/20 bg-white/60'
                }`}
                style={isSelected ? {
                  borderColor: 'var(--booking-primary)',
                  background: 'var(--booking-primary-light)'
                } : undefined}
              >
                {/* Cover Photo */}
                <div 
                  className="h-32 bg-gradient-to-br from-gray-100 to-gray-200"
                  style={{ 
                    backgroundImage: `url(${provider.coverPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />

                {/* Content */}
                <div className="px-5 pb-5">
                  {/* Profile Photo */}
                  <div className="relative -mt-10 mb-3 flex items-end justify-between">
                    <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
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
                      <h3 className="text-xl text-gray-900">{provider.name}</h3>
                      <p className="text-sm text-gray-600">{provider.credentials}</p>
                      <p className="text-sm" style={{ color: 'var(--booking-primary)' }}>{provider.specialty}</p>
                    </div>

                    {/* Rating & Experience */}
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1.5">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4"
                              style={{
                                color: i < Math.floor(provider.rating) ? 'var(--booking-primary)' : '#d1d5db',
                                fill: i < Math.floor(provider.rating) ? 'var(--booking-primary)' : 'none'
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-gray-900">{provider.rating}</span>
                        <span className="text-gray-500">({provider.reviewCount})</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Award className="w-4 h-4" />
                        <span>{provider.yearsExperience}+ years</span>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-gray-600 leading-relaxed">{provider.bio}</p>

                    {/* Designations */}
                    <div className="flex flex-wrap gap-2">
                      {provider.designations.map((designation, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 bg-black/5 text-xs text-gray-700 rounded-lg"
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

      {/* Bottom CTA - Only show when preferred provider is selected */}
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