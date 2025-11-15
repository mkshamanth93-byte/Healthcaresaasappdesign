import { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink } from 'lucide-react';
import { TopBar } from './TopBar';
import { SummaryPopup } from './SummaryPopup';

interface LocationScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  nextStepText?: string;
  flow?: 'single' | 'combo' | 'family';
  bookingData?: any;
  isComboFlow?: boolean;
}

export function LocationScreen({ 
  onContinue, 
  onBack, 
  onClose,
  isActive, 
  nextStepText, 
  flow = 'single',
  bookingData,
  isComboFlow = false
}: LocationScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  const locations = [
    {
      id: 'downtown',
      name: 'Downtown Office',
      address: '123 Main Street',
      city: 'San Francisco, CA 94105',
      phone: '(415) 555-0100',
      hours: 'Mon–Fri: 8am–6pm',
      saturday: 'Sat: 9am–2pm',
      distance: '2.3 miles',
      status: 'Open now',
      mapsUrl: 'https://maps.google.com',
    },
    {
      id: 'westside',
      name: 'Westside Office',
      address: '456 Ocean Avenue',
      city: 'San Francisco, CA 94112',
      phone: '(415) 555-0200',
      hours: 'Mon–Fri: 9am–5pm',
      saturday: 'Closed weekends',
      distance: '5.7 miles',
      status: 'Open now',
      mapsUrl: 'https://maps.google.com',
    },
  ];

  const handleLocationSelect = (locationId: string) => {
    setSelected(locationId);
    
    // Auto-advance after location is selected
    setTimeout(() => {
      onContinue({ location: locationId });
    }, 300);
  };

  // Note: LocationScreen typically doesn't show summary since it's often the first selection
  // But we'll keep the infrastructure for returning patient flow where verification comes first

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar - No summary on location screen for new patients (it's the first selection) */}
      <TopBar
        onBack={onBack}
        onClose={onClose}
        title="Select Location"
        subtitle="Choose your preferred office location"
        bookingData={bookingData}
        isComboFlow={isComboFlow}
        onSummaryClick={() => setShowSummaryPopup(true)}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {/* Locations List */}
        <div className="space-y-3">{locations.map((location) => {
          const isSelected = selected === location.id;
          return (
            <div
              key={location.id}
              onClick={() => handleLocationSelect(location.id)}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'shadow-md'
                  : 'hover:shadow-sm'
              }`}
              style={{
                borderColor: isSelected ? 'var(--booking-primary)' : '#e5e7eb'
              }}
            >
              {/* Header Row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Icon */}
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isSelected ? 'var(--booking-primary)' : 'var(--booking-primary-light)'
                    }}
                  >
                    <MapPin 
                      className="w-5 h-5"
                      style={{
                        color: isSelected ? 'white' : 'var(--booking-primary)'
                      }}
                    />
                  </div>
                  
                  {/* Name and Status */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 mb-1">{location.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-xs text-green-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        {location.status}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{location.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--booking-primary)' }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Details Grid */}
              <div className="space-y-2 ml-[52px]">
                {/* Address */}
                <div className="text-sm text-gray-600">
                  <p>{location.address}</p>
                  <p>{location.city}</p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{location.hours}</span>
                  </div>
                </div>

                {/* Saturday Hours */}
                <p className="text-xs text-gray-500">{location.saturday}</p>

                {/* Directions Link */}
                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs hover:underline"
                  style={{ color: 'var(--booking-primary)' }}
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
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