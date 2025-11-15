import { ChevronLeft, X, ChevronDown } from 'lucide-react';

interface TopBarProps {
  onBack?: () => void;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  bookingData: any;
  isComboFlow: boolean;
  onSummaryClick: () => void;
  hideBackButton?: boolean;
  hideCloseButton?: boolean;
}

export function TopBar({ 
  onBack, 
  onClose,
  title,
  subtitle,
  bookingData,
  isComboFlow,
  onSummaryClick,
  hideBackButton = false,
  hideCloseButton = false
}: TopBarProps) {
  
  // Build summary text from booking data
  const getSummaryText = () => {
    const parts: string[] = [];
    
    // Location
    if (bookingData.location) {
      const locationNames: Record<string, string> = {
        'downtown': 'Downtown',
        'westside': 'Westside',
        'eastside': 'Eastside'
      };
      parts.push(locationNames[bookingData.location] || bookingData.location);
    }
    
    // Family booking logic - Check BOTH old and new field names
    if (bookingData.familyAppointmentType || bookingData.appointmentType) {
      const appointmentType = bookingData.familyAppointmentType || bookingData.appointmentType;
      const isExam = appointmentType === 'exam-all';
      const appointmentLabel = isExam ? 'Exam for all' : 'Hygiene for all';
      const depositPerPerson = 50; // £50 per patient
      const patientCount = bookingData.familyPatientCount || bookingData.patientCount || 1;
      const totalDeposit = depositPerPerson * patientCount;
      
      parts.push(`${appointmentLabel}`);
      parts.push(`£${totalDeposit} deposit`);
    }
    // Procedure or Combo type
    else if (isComboFlow) {
      parts.push('Exam + Hygiene');
      // Add deposit for combo flow
      parts.push('£50 + £50 deposit');
    } else if (bookingData.procedure) {
      parts.push(bookingData.procedure);
      // Add deposit for single appointment
      parts.push('£50 deposit');
    }
    
    // Provider
    if (bookingData.comboProviders?.examProvider && bookingData.comboProviders?.hygienist) {
      const providerNames: Record<string, string> = {
        'johnson': 'Dr. Johnson',
        'roberts': 'Dr. Roberts',
        'chen': 'Dr. Chen',
        'williams': 'S. Williams',
        'davis': 'J. Davis'
      };
      const examName = providerNames[bookingData.comboProviders.examProvider] || bookingData.comboProviders.examProvider;
      const hygieneName = providerNames[bookingData.comboProviders.hygienist] || bookingData.comboProviders.hygienist;
      parts.push(`${examName} + ${hygieneName}`);
    } else if (bookingData.provider || bookingData.familyProvider) {
      const providerNames: Record<string, string> = {
        'johnson': 'Dr. Johnson',
        'roberts': 'Dr. Roberts',
        'chen': 'Dr. Chen',
        'any': 'Any Provider',
        'no-preference': 'Any Provider'
      };
      const providerId = bookingData.provider || bookingData.familyProvider;
      parts.push(providerNames[providerId] || providerId);
    }
    
    // Date/Time
    if (bookingData.date && bookingData.time) {
      const date = new Date(bookingData.date);
      parts.push(`${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} @ ${bookingData.time}`);
    } else if (bookingData.date && bookingData.examTime) {
      const date = new Date(bookingData.date);
      parts.push(`${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`);
    }
    
    return parts.join(' • ');
  };

  const summaryText = getSummaryText();
  const showSummary = summaryText.length > 0;

  return (
    <div className="flex-shrink-0 bg-white border-b border-gray-200">
      {/* Back and Close Buttons Row */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        {/* Back Button */}
        {!hideBackButton && onBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
        
        {/* Spacer if no back button */}
        {(hideBackButton || !onBack) && <div className="w-10" />}

        {/* Close Button */}
        {!hideCloseButton && (
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Title and Subtitle - Below buttons */}
      {(title || subtitle) && (
        <div className="px-5 pb-3 space-y-1">
          {title && <h2 className="text-lg text-gray-900">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}

      {/* Summary Section - Tappable */}
      {showSummary && (
        <button
          onClick={onSummaryClick}
          className="w-full px-5 pb-4 text-left hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">Your selection so far</p>
              <p className="text-sm text-gray-900 truncate">{summaryText}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
          </div>
        </button>
      )}
    </div>
  );
}