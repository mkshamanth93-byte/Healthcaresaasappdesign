import { useState } from 'react';
import { Clock, Coins, ChevronDown } from 'lucide-react';
import { TopBar } from './TopBar';
import { SummaryPopup } from './SummaryPopup';

interface ReasonDetailScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  category: string;
  isActive: boolean;
  bookingData?: any;
  isComboFlow?: boolean;
}

export function ReasonDetailScreen({ 
  onContinue, 
  onBack, 
  onClose,
  category, 
  isActive,
  bookingData,
  isComboFlow = false
}: ReasonDetailScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [expandedPricing, setExpandedPricing] = useState<string | null>(null);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  const procedures = {
    cosmetic: [
      {
        id: 'whitening',
        name: 'Teeth Whitening',
        duration: '60 min',
        deposit: '150',
        totalPrice: '299',
        description: 'Professional whitening to brighten your smile by several shades',
        badge: 'Popular',
        details: [
          'Professional-grade whitening gel application',
          'LED light activation for enhanced results',
          'Can lighten teeth up to 8 shades',
          'Safe and effective whitening treatment',
          'Results visible immediately after treatment'
        ]
      },
      {
        id: 'veneers',
        name: 'Porcelain Veneers',
        duration: '120 min',
        deposit: '500',
        totalPrice: '1,299',
        description: 'Custom shells to cover the front surface of teeth',
        badge: null,
        details: [
          'Custom-designed porcelain shells',
          'Natural-looking aesthetic results',
          'Minimal tooth preparation required',
          'Stain-resistant material',
          'Long-lasting solution (10-15 years)'
        ]
      },
      {
        id: 'bonding',
        name: 'Dental Bonding',
        duration: '45 min',
        deposit: '100',
        totalPrice: '199',
        description: 'Repair chips, cracks, or gaps in your teeth',
        badge: null,
        details: [
          'Tooth-colored composite resin material',
          'Quick and painless procedure',
          'Repairs minor cosmetic imperfections',
          'Same-day results',
          'No anesthesia typically required'
        ]
      },
    ],
    exam: [
      {
        id: 'comprehensive',
        name: 'Comprehensive Exam',
        duration: '60 min',
        deposit: '75',
        totalPrice: '149',
        description: 'Complete oral health examination including X-rays',
        badge: 'Recommended',
        details: [
          'Full mouth digital X-rays included',
          'Thorough examination of teeth and gums',
          'Oral cancer screening',
          'Personalized treatment plan discussion',
          'Assessment of existing dental work'
        ]
      },
      {
        id: 'cleaning',
        name: 'Regular Cleaning',
        duration: '45 min',
        deposit: '50',
        totalPrice: '99',
        description: 'Routine cleaning and polishing',
        badge: null,
        details: [
          'Plaque and tartar removal',
          'Professional teeth polishing',
          'Fluoride treatment included',
          'Gum health assessment',
          'Oral hygiene tips and recommendations'
        ]
      },
    ],
    hygiene: [
      {
        id: 'cleaning',
        name: 'Deep Cleaning',
        duration: '90 min',
        deposit: '100',
        totalPrice: '249',
        description: 'Thorough cleaning below the gum line',
        badge: null,
        details: [
          'Scaling and root planing treatment',
          'Deep cleaning below gum line',
          'Removes bacteria and tartar buildup',
          'Local anesthesia for comfort',
          'May require multiple visits for full mouth'
        ]
      },
    ],
    emergency: [
      {
        id: 'urgent',
        name: 'Emergency Visit',
        duration: '30 min',
        deposit: '75',
        totalPrice: '150',
        description: 'Immediate care for dental emergencies',
        badge: 'Urgent',
        details: [
          'Same-day emergency appointment',
          'Pain relief and assessment',
          'Treatment for dental trauma',
          'Temporary solutions if needed',
          'Referral for follow-up care if required'
        ]
      },
    ],
    restorative: [
      {
        id: 'filling',
        name: 'Tooth Filling',
        duration: '60 min',
        deposit: '100',
        totalPrice: '199',
        description: 'Restore decayed or damaged teeth',
        badge: null,
        details: [
          'Tooth-colored composite fillings',
          'Removes decay and restores tooth',
          'Local anesthesia for comfort',
          'Natural appearance that blends with teeth',
          'Strengthens and protects the tooth'
        ]
      },
    ],
    orthodontics: [
      {
        id: 'consultation',
        name: 'Orthodontic Consultation',
        duration: '45 min',
        deposit: '0',
        totalPrice: '0',
        description: 'Discuss braces and alignment options',
        badge: 'Free Consult',
        details: [
          'Comprehensive orthodontic assessment',
          'Discussion of treatment options',
          'Clear aligner vs traditional braces comparison',
          'Treatment timeline and cost estimate',
          'Digital smile preview available'
        ]
      },
    ],
  };

  const categoryProcedures = procedures[category as keyof typeof procedures] || procedures.cosmetic;

  const handleProcedureSelect = (procedureId: string) => {
    setSelected(procedureId);
    
    // Auto-advance after procedure is selected
    setTimeout(() => {
      const selectedProcedure = categoryProcedures.find(p => p.id === procedureId);
      onContinue({ procedure: procedureId, reason: selectedProcedure?.name });
    }, 300);
  };

  // Generate summary text
  const getSummaryText = () => {
    const parts: string[] = [];
    
    if (bookingData?.location) {
      const locationNames: Record<string, string> = {
        'downtown': 'Downtown',
        'westside': 'Westside',
        'eastside': 'Eastside'
      };
      parts.push(locationNames[bookingData.location] || bookingData.location);
    }
    
    if (bookingData?.category) {
      parts.push(bookingData.category);
    }
    
    return parts.join(' • ');
  };

  const showSummary = bookingData?.location;

  const getCategoryName = (category: string) => {
    const categoryNames: Record<string, string> = {
      'cosmetic': 'Cosmetic',
      'exam': 'Exam',
      'hygiene': 'Hygiene',
      'emergency': 'Emergency',
      'restorative': 'Restorative',
      'orthodontics': 'Orthodontics'
    };
    return categoryNames[category] || 'Procedure';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar with Summary */}
      <TopBar
        onBack={onBack}
        onClose={onClose}
        title="Select Procedure"
        subtitle={`Choose your ${getCategoryName(category)} appointment`}
        bookingData={bookingData || {}}
        isComboFlow={isComboFlow}
        onSummaryClick={() => setShowSummaryPopup(true)}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {/* Procedures List */}
        <div className="space-y-3">
          {categoryProcedures.map((procedure) => {
            const isSelected = selected === procedure.id;
            const isPricingExpanded = expandedPricing === procedure.id;
            const isFree = procedure.totalPrice === '0';
            
            return (
              <div key={procedure.id}>
                <button
                  onClick={() => handleProcedureSelect(procedure.id)}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                    isSelected
                      ? 'shadow-sm'
                      : 'border-black/10 hover:border-black/20 bg-white/60'
                  }`}
                  style={{
                    borderColor: isSelected ? 'var(--booking-primary)' : undefined,
                    background: isSelected ? 'var(--booking-primary-light)' : undefined
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base text-gray-900">{procedure.name}</h3>
                          {procedure.badge && (
                            <span 
                              className="px-2 py-0.5 text-white text-xs rounded-full"
                              style={{ background: 'var(--booking-primary)' }}
                            >
                              {procedure.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{procedure.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {procedure.duration}
                          </span>
                          {!isFree && (
                            <span className="flex items-center gap-1.5">
                              <Coins className="w-4 h-4" />
                              £{procedure.deposit} deposit
                            </span>
                          )}
                        </div>
                      </div>
                      {isSelected && (
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                          style={{ background: 'var(--booking-primary)' }}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Pricing Section with Expand Option */}
                    {!isFree && (
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedPricing(isPricingExpanded ? null : procedure.id);
                        }}
                        className="pt-3 border-t border-black/10 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">Total appointment cost</p>
                            <p className="text-base text-gray-900">£{procedure.totalPrice}</p>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              isPricingExpanded ? 'rotate-180' : ''
                            }`} 
                          />
                        </div>
                        
                        {/* Expanded Treatment Details */}
                        {isPricingExpanded && (
                          <div className="mt-3 p-3 bg-white/80 rounded-lg space-y-2">
                            <p className="text-sm text-gray-600 mb-2">What's included:</p>
                            <ul className="space-y-1.5">
                              {procedure.details?.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                  <span style={{ color: 'var(--booking-primary)' }} className="mt-1">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {isFree && (
                      <div className="pt-3 border-t border-black/10">
                        <p className="text-base text-[#34C759]">Free Consultation</p>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Popup */}
      <SummaryPopup
        isOpen={showSummaryPopup}
        onClose={() => setShowSummaryPopup(false)}
        bookingData={bookingData || {}}
        isComboFlow={isComboFlow}
      />
    </div>
  );
}