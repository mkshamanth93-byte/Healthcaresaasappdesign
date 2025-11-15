import { useState } from 'react';
import { Star, Sparkles, Heart } from 'lucide-react';
import { Badge } from '../ui/badge';
import { BottomCTA } from './BottomCTA';
import { TopBar } from './TopBar';
import { SummaryPopup } from './SummaryPopup';

interface ReturningHygieneProviderScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  examProvider: string;
  usualHygienistId?: string;
  bookingData: any;
  isComboFlow: boolean;
}

export function ReturningHygieneProviderScreen({ 
  onContinue, 
  onBack,
  onClose,
  isActive, 
  examProvider,
  usualHygienistId = 'williams',
  bookingData,
  isComboFlow
}: ReturningHygieneProviderScreenProps) {
  const [selectedHygienist, setSelectedHygienist] = useState<string>(usualHygienistId);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  const hygienists = [
    {
      id: 'williams',
      name: 'Sarah Williams',
      credentials: 'RDH, BS',
      specialty: 'Registered Dental Hygienist',
      rating: 4.9,
      reviewCount: 312,
      yearsExperience: 10,
      profilePhoto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1758653500469-f5f3fc122844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBoeWdpZW5pc3QlMjBvZmZpY2V8ZW58MXx8fHwxNzYzMDA0NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Sarah specializes in gentle, thorough cleanings with a focus on patient comfort and education.',
      designations: ['Periodontal Certified', 'Laser Therapy', 'Pain Management'],
    },
    {
      id: 'davis',
      name: 'Jennifer Davis',
      credentials: 'RDH, BSDH',
      specialty: 'Bachelor of Science in Dental Hygiene',
      rating: 4.8,
      reviewCount: 267,
      yearsExperience: 8,
      profilePhoto: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBtb2Rlcm58ZW58MXx8fHwxNzYyOTE2Njc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      bio: 'Jennifer brings a warm, caring approach to dental hygiene with expertise in preventive care techniques.',
      designations: ['Whitening Specialist', 'Preventive Care', 'Pediatric Certified'],
    },
  ];

  // Get exam provider name
  const examProviderNames: any = {
    'johnson': 'Dr. Sarah Johnson',
    'roberts': 'Dr. Michael Roberts',
  };
  const examProviderName = examProviderNames[examProvider] || 'your dentist';

  const handleContinue = () => {
    if (selectedHygienist) {
      onContinue({ 
        hygienist: selectedHygienist,
        comboProviders: {
          examProvider,
          hygienist: selectedHygienist
        }
      });
    }
  };

  const handleHygienistSelect = (hygienistId: string) => {
    setSelectedHygienist(hygienistId);
    
    // Auto-advance logic:
    // If user changed from usual hygienist → auto-advance
    // If usual hygienist is still selected → Keep CTA button (requires confirmation)
    const shouldAutoAdvance = hygienistId !== usualHygienistId;
    
    if (shouldAutoAdvance) {
      setTimeout(() => {
        onContinue({ 
          hygienist: hygienistId,
          comboProviders: {
            examProvider,
            hygienist: hygienistId
          }
        });
      }, 300);
    }
  };

  // Show Continue button only if usual hygienist is still selected
  const showContinueButton = selectedHygienist === usualHygienistId;

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <TopBar
        onBack={onBack}
        onClose={onClose}
        title="Select Hygienist"
        subtitle={`Choose your hygienist to work with ${examProviderName}`}
        bookingData={bookingData}
        isComboFlow={isComboFlow}
        onSummaryClick={() => setShowSummaryPopup(true)}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-5">
        {/* Badge Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" style={{ color: 'var(--booking-secondary)' }} />
          <Badge 
            className="text-xs px-3 py-1"
            style={{ background: 'var(--booking-secondary)', color: 'white', border: 'none' }}
          >
            Step 2 of 2
          </Badge>
        </div>

        {/* Selected Providers Summary */}
        <div className="p-4 bg-white/60 rounded-xl border border-black/10">
          <p className="text-xs text-gray-500 mb-2">Your Providers</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-900">{examProviderName}</p>
              <p className="text-xs text-gray-500">Exam</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-900">
                {selectedHygienist === 'williams' ? 'Sarah Williams' : 'Jennifer Davis'}
              </p>
              <p className="text-xs text-gray-500">Hygiene</p>
            </div>
          </div>
        </div>

        {/* Hygienist Cards */}
        <div className="space-y-4">
          {hygienists.map((hygienist) => {
            const isSelected = selectedHygienist === hygienist.id;
            const isUsualHygienist = hygienist.id === usualHygienistId;
            return (
              <button
                key={hygienist.id}
                onClick={() => handleHygienistSelect(hygienist.id)}
                className={`w-full rounded-2xl border-2 overflow-hidden transition-all text-left ${
                  isSelected
                    ? 'shadow-md'
                    : ''
                }`}
                style={{
                  borderColor: isSelected ? 'var(--booking-secondary)' : '#e5e7eb',
                  background: isSelected ? 'var(--booking-secondary-light)' : 'white'
                }}
              >
                {/* Cover Photo */}
                <div 
                  className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 relative"
                  style={{ 
                    backgroundImage: `url(${hygienist.coverPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Your Usual Hygienist Tag */}
                  {isUsualHygienist && (
                    <div className="absolute top-3 right-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
                        <span className="text-xs text-gray-900">Your Usual Hygienist</span>
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
                        src={hygienist.profilePhoto} 
                        alt={hygienist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--booking-secondary)' }}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-gray-900">{hygienist.name}</h3>
                      <p className="text-xs text-gray-600">{hygienist.credentials}</p>
                      <p className="text-xs" style={{ color: 'var(--booking-secondary)' }}>{hygienist.specialty}</p>
                    </div>

                    {/* Rating & Experience */}
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(hygienist.rating) ? 'fill-current' : ''
                              }`}
                              style={{ color: 'var(--booking-secondary)' }}
                            />
                          ))}
                        </div>
                        <span className="text-gray-900">{hygienist.rating}</span>
                        <span className="text-gray-500">({hygienist.reviewCount})</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{hygienist.yearsExperience} years exp.</span>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {hygienist.bio}
                    </p>

                    {/* Designation Badges */}
                    <div className="flex flex-wrap gap-2">
                      {hygienist.designations.map((designation, idx) => (
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

      {/* Bottom CTA - Only show when usual hygienist is selected */}
      {showContinueButton && (
        <BottomCTA
          onContinue={handleContinue}
          onBack={onBack}
          continueDisabled={!selectedHygienist}
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