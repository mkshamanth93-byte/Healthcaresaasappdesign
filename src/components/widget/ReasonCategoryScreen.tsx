import { useState } from 'react';
import { Search, Sparkles, Smile, Stethoscope, Wrench, Braces, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { TopBar } from './TopBar';
import { SummaryPopup } from './SummaryPopup';

interface ReasonCategoryScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  bookingData?: any;
  isComboFlow?: boolean;
}

export function ReasonCategoryScreen({ 
  onContinue, 
  onBack, 
  onClose,
  isActive, 
  bookingData,
  isComboFlow = false
}: ReasonCategoryScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);

  const categories = [
    { 
      id: 'exam', 
      title: 'Exam & Prevention', 
      icon: Search, 
      color: 'bg-blue-500',
      description: 'Regular check-ups and preventive care' 
    },
    { 
      id: 'hygiene', 
      title: 'Hygiene', 
      icon: Sparkles, 
      color: 'bg-green-500',
      description: 'Professional teeth cleaning and oral hygiene' 
    },
    { 
      id: 'emergency', 
      title: 'Emergency', 
      icon: AlertCircle, 
      color: 'bg-red-500',
      description: 'Immediate dental care for urgent issues' 
    },
    { 
      id: 'cosmetic', 
      title: 'Cosmetic', 
      icon: Smile, 
      color: 'bg-purple-500',
      description: 'Enhancing your smile with cosmetic procedures' 
    },
    { 
      id: 'restorative', 
      title: 'Restorative', 
      icon: Wrench, 
      color: 'bg-orange-500',
      description: 'Repairing damaged teeth and restoring function' 
    },
    { 
      id: 'orthodontics', 
      title: 'Orthodontics', 
      icon: Braces, 
      color: 'bg-pink-500',
      description: 'Straightening teeth and improving alignment' 
    },
  ];

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    
    // Auto-advance to procedure selection
    setTimeout(() => {
      onContinue({ category: id });
    }, 300);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar with Summary */}
      <TopBar
        onBack={onBack}
        onClose={onClose}
        title="Appointment Type"
        subtitle="What brings you in today?"
        bookingData={bookingData || {}}
        isComboFlow={isComboFlow}
        onSummaryClick={() => setShowSummaryPopup(true)}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-3">{categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'shadow-md'
                  : 'hover:shadow-sm'
              }`}
              style={{
                borderColor: isSelected ? 'var(--booking-primary)' : '#e5e7eb'
              }}
              onClick={() => handleCategorySelect(category.id)}
            >
              <CardContent className="p-4 space-y-3">
                {/* Icon Circle */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: isSelected ? 'var(--booking-primary)' : 'var(--booking-primary-light)'
                  }}
                >
                  <Icon 
                    className="w-6 h-6"
                    style={{
                      color: isSelected ? 'white' : 'var(--booking-primary)'
                    }}
                  />
                </div>
                
                {/* Text */}
                <div>
                  <h3 className="text-sm text-gray-900 mb-1">{category.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{category.description}</p>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="flex items-center justify-end">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--booking-primary)' }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
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