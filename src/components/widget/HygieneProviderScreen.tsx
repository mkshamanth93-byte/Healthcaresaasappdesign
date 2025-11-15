import { useState } from 'react';
import { Star, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import { TopBar } from './TopBar';
import { SummaryPopup } from './SummaryPopup';

interface HygieneProviderScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  examProvider: string;
  isActive: boolean;
  bookingData: any;
  isComboFlow: boolean;
}

export function HygieneProviderScreen({ 
  onContinue, 
  onBack,
  onClose,
  examProvider,
  isActive,
  bookingData,
  isComboFlow
}: HygieneProviderScreenProps) {
  const [selectedHygienist, setSelectedHygienist] = useState<string | null>(null);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  const examProviderNames: any = {
    'johnson': 'Dr. Sarah Johnson',
    'roberts': 'Dr. Michael Roberts',
  };

  const hygienists = [
    {
      id: 'williams',
      name: 'Sarah Williams',
      credentials: 'RDH, BS',
      specialty: 'Preventive Care & Patient Education',
      rating: 5.0,
      reviewCount: 312,
      yearsExperience: 10,
      profilePhoto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=200&fit=crop',
      bio: 'Sarah specializes in gentle cleanings and comprehensive patient education, making every hygiene visit comfortable and informative.',
      designations: ['RDH Certified', 'Laser Therapy', 'Periodontal Care'],
    },
    {
      id: 'davis',
      name: 'Jennifer Davis',
      credentials: 'RDH',
      specialty: 'Periodontal Care',
      rating: 4.9,
      reviewCount: 287,
      yearsExperience: 8,
      profilePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=200&fit=crop',
      bio: 'Jennifer brings expertise in periodontal health and preventive care, ensuring your gums stay healthy and your smile bright.',
      designations: ['Periodontal Specialist', 'ADHA Member', 'Patient Educator'],
    },
  ];

  const handleHygienistSelect = (hygienistId: string) => {
    setSelectedHygienist(hygienistId);
    
    // Auto-advance immediately after selection
    setTimeout(() => {
      onContinue({ 
        comboProviders: {
          examProvider: examProvider,
          hygienist: hygienistId
        }
      });
    }, 300);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <TopBar
        onBack={onBack}
        onClose={onClose}
        title="Select Hygienist"
        subtitle={`Choose your hygienist to work with ${examProviderNames[examProvider] || examProvider}`}
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

        {/* Hygienist Cards */}
        <div className="space-y-4">
          {hygienists.map((hygienist) => {
            const isSelected = selectedHygienist === hygienist.id;
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
                />

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
                      <span className="text-gray-600">{hygienist.yearsExperience}+ years</span>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {hygienist.bio}
                    </p>

                    {/* Designation Badges */}
                    <div className="flex flex-wrap gap-2">
                      {hygienist.designations.map((designation) => (
                        <span
                          key={designation}
                          className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-700"
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