import { useState } from 'react';
import { Star, Users, Heart, Handshake, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { BottomCTA } from './BottomCTA';
import { TopBar } from './TopBar';
import { SummaryPopup } from './SummaryPopup';
import { FloatingCloseButton } from './FloatingCloseButton';

interface ReturningFamilyProviderScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  appointmentType: 'exam-all' | 'hygiene-all';
  patientCount: number;
  location: string;
  bookingData: any;
  usualProviderId?: string; // ID of the usual provider (if any)
  selectedPatients?: any[]; // Selected family members
}

export function ReturningFamilyProviderScreen({ 
  onContinue, 
  onBack, 
  onClose,
  isActive, 
  appointmentType,
  patientCount,
  location,
  bookingData,
  usualProviderId = 'johnson', // Default for demo
  selectedPatients = []
}: ReturningFamilyProviderScreenProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>(usualProviderId);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  // Determine provider type based on appointment type
  const isExamType = appointmentType === 'exam-all';
  const providerTypeLabel = isExamType ? 'Dentist' : 'Hygienist';

  // Provider data with profile and cover photos
  const dentists = [
    {
      id: 'johnson',
      name: 'Dr. Sarah Johnson',
      credentials: 'DDS, FAGD',
      specialty: 'General & Cosmetic Dentistry',
      title: 'General Dentist',
      experience: '15 years',
      rating: 4.9,
      reviews: 234,
      yearsExperience: 15,
      availability: 'Available this week',
      specialties: ['General Dentistry', 'Cosmetic'],
      profilePhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=200&fit=crop',
      bio: 'Specializes in family dentistry and creating comfortable experiences for patients of all ages.',
      designations: ['FAGD', 'Invisalign Certified', 'Family Dentistry'],
      badge: ''
    },
    {
      id: 'roberts',
      name: 'Dr. Michael Roberts',
      credentials: 'DDS, MS',
      specialty: 'Orthodontist',
      title: 'General Dentist',
      experience: '12 years',
      rating: 4.8,
      reviews: 189,
      yearsExperience: 12,
      availability: 'Available this week',
      specialties: ['General Dentistry', 'Preventive'],
      profilePhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=200&fit=crop',
      bio: 'Board-certified orthodontist with expertise in treating multiple family members simultaneously.',
      designations: ['Board Certified', 'Invisalign Diamond', 'ABO Diplomate'],
      badge: ''
    },
    {
      id: 'chen',
      name: 'Dr. Emily Chen',
      credentials: 'DMD',
      specialty: 'Pediatric Dentistry',
      title: 'Senior Dentist',
      experience: '20 years',
      rating: 5.0,
      reviews: 312,
      yearsExperience: 10,
      availability: 'Limited availability',
      specialties: ['General Dentistry', 'Orthodontics'],
      profilePhoto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=200&fit=crop',
      bio: 'Creates a fun, comfortable environment for children and families, making dental visits enjoyable.',
      designations: ['Pediatric Specialist', 'AAPD Member', 'Sedation Certified'],
      badge: 'Popular'
    },
  ];

  const hygienists = [
    {
      id: 'williams',
      name: 'Sarah Williams',
      credentials: 'RDH',
      specialty: 'Dental Hygiene',
      title: 'Dental Hygienist',
      experience: '10 years',
      rating: 4.9,
      reviews: 156,
      yearsExperience: 10,
      availability: 'Available this week',
      specialties: ['Cleaning', 'Preventive Care'],
      profilePhoto: 'https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1762625570087-6d98fca29531?w=800&h=200&fit=crop',
      bio: 'Passionate about preventive care and creating comfortable dental experiences for the whole family.',
      designations: ['RDH Certified', 'Preventive Care Specialist'],
      badge: ''
    },
    {
      id: 'davis',
      name: 'Mike Davis',
      credentials: 'RDH, BS',
      specialty: 'Advanced Dental Hygiene',
      title: 'Senior Hygienist',
      experience: '15 years',
      rating: 4.8,
      reviews: 203,
      yearsExperience: 15,
      availability: 'Available this week',
      specialties: ['Deep Cleaning', 'Gum Care'],
      profilePhoto: 'https://images.unsplash.com/photo-1758205308181-d52b41e00cef?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1704455306925-1401c3012117?w=800&h=200&fit=crop',
      bio: 'Specializes in periodontal care and advanced cleaning techniques for patients of all ages.',
      designations: ['Periodontal Specialist', 'Advanced Techniques'],
      badge: 'Experienced'
    },
    {
      id: 'taylor',
      name: 'Emily Taylor',
      credentials: 'RDH',
      specialty: 'Dental Hygiene',
      title: 'Dental Hygienist',
      experience: '8 years',
      rating: 4.9,
      reviews: 142,
      yearsExperience: 8,
      availability: 'Available this week',
      specialties: ['Cleaning', 'Polishing'],
      profilePhoto: 'https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=200&fit=crop',
      bio: 'Creates a welcoming environment and focuses on patient education for the entire family.',
      designations: ['Patient Education Specialist', 'Gentle Care'],
      badge: ''
    },
  ];

  const providers = isExamType ? dentists : hygienists;

  // Create "No Preference" option
  const noPreferenceOption = {
    id: 'no-preference',
    name: 'No Preference',
    subtitle: 'First Available',
    description: `We'll match you with an available ${providerTypeLabel.toLowerCase()}`,
    isNoPreference: true
  };

  // Find the usual provider
  const usualProvider = providers.find(p => p.id === usualProviderId);

  // Organize providers: Usual first, then No Preference, then others
  const organizedProviders = usualProvider
    ? [usualProvider, noPreferenceOption, ...providers.filter(p => p.id !== usualProviderId)]
    : [noPreferenceOption, ...providers];

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    
    // Auto-advance logic:
    // If user changed from usual provider → auto-advance
    // If usual provider is still selected → Keep CTA button (requires confirmation)
    const shouldAutoAdvance = providerId !== usualProviderId;
    
    if (shouldAutoAdvance) {
      setTimeout(() => {
        onContinue({
          familyProvider: providerId,
        });
      }, 300);
    }
  };

  const handleContinue = () => {
    if (selectedProvider) {
      onContinue({
        familyProvider: selectedProvider,
      });
    }
  };

  // Show Continue button only if usual provider is still selected
  const showContinueButton = selectedProvider === usualProviderId;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Top Bar */}
      <TopBar
        onBack={onBack}
        onClose={onClose}
        title={`Select ${providerTypeLabel}`}
        subtitle={`One provider for all ${patientCount} ${patientCount === 1 ? 'patient' : 'patients'}`}
        bookingData={bookingData}
        isComboFlow={false}
        onSummaryClick={() => setShowSummaryPopup(true)}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* Providers List */}
        <div className="space-y-4">
          {organizedProviders.map((provider) => {
            const isSelected = selectedProvider === provider.id;
            const isNoPreference = provider.id === 'no-preference';
            const isUsualProvider = provider.id === usualProviderId;
            
            // No Preference - Simple design
            if (isNoPreference) {
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
            
            // Regular provider card with cover photo
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
                  className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 relative"
                  style={{ 
                    backgroundImage: `url(${provider.coverPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Your Usual Provider Tag */}
                  {isUsualProvider && (
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                        <span className="text-xs text-gray-900">
                          Your Usual {providerTypeLabel}
                        </span>
                      </div>
                    </div>
                  )}
                  {provider.badge && !isUsualProvider && (
                    <Badge 
                      className="absolute top-2 right-2 text-xs px-2 py-0.5"
                      style={{ background: 'var(--booking-accent)', color: 'white', border: 'none' }}
                    >
                      {provider.badge}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="px-5 pb-5">
                  {/* Profile Photo */}
                  <div className="relative -mt-10 mb-3 flex items-end justify-between">
                    <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
                      <ImageWithFallback 
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
                    {!isNoPreference && (
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
                          <span className="text-gray-500">({provider.reviews})</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{provider.yearsExperience}+ years</span>
                        </div>
                      </div>
                    )}

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

                    {/* Group Assignment Info (shown when selected) */}
                    {isSelected && (
                      <div 
                        className="pt-3 border-t flex items-center gap-2 mt-3"
                        style={{ borderColor: 'var(--booking-primary)' }}
                      >
                        <Users className="w-4 h-4" style={{ color: 'var(--booking-primary)' }} />
                        <span className="text-xs" style={{ color: 'var(--booking-primary)' }}>
                          Will see all {patientCount} {patientCount === 1 ? 'patient' : 'patients'} in your group
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Box */}
        <Card className="border-2" style={{ borderColor: '#e0e7ff', background: '#f0f4ff' }}>
          <CardContent className="p-4">
            <p className="text-xs text-gray-600">
              💡 <strong>Group Booking:</strong> All family members will have appointments with the same provider on the same day.
            </p>
          </CardContent>
        </Card>
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
        isComboFlow={false}
        isFamilyFlow={true}
      />

      {/* Floating Close Button - Only show when CTA is hidden */}
      {!showContinueButton && <FloatingCloseButton onClose={onClose} />}
    </div>
  );
}
