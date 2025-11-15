import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calendar, User, Stethoscope, Clock, Banknote } from 'lucide-react';

interface SummaryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: any;
  isComboFlow?: boolean;
}

export function SummaryPopup({ isOpen, onClose, bookingData, isComboFlow = false }: SummaryPopupProps) {
  // Helper functions
  const getLocationName = (locationId: string) => {
    const locationNames: Record<string, string> = {
      'downtown': 'Downtown',
      'westside': 'Westside',
      'eastside': 'Eastside'
    };
    return locationNames[locationId] || locationId;
  };

  const getProviderName = (providerId: string) => {
    const providerNames: Record<string, string> = {
      'johnson': 'Dr. Sarah Johnson',
      'roberts': 'Dr. Michael Roberts',
      'chen': 'Dr. Chen',
      'williams': 'Sarah Williams',
      'davis': 'Jennifer Davis',
      'taylor': 'Emily Taylor'
    };
    return providerNames[providerId] || providerId;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[200]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl z-[201] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-gray-900">Your Selection So Far</h3>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-4 space-y-4">
              {/* Location */}
              {bookingData.location && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-primary-light)' }}>
                    <MapPin className="w-4 h-4" style={{ color: 'var(--booking-primary)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm text-gray-900">{getLocationName(bookingData.location)}</p>
                  </div>
                </div>
              )}

              {/* Appointment Type */}
              {(isComboFlow || bookingData.procedure) && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-primary-light)' }}>
                    <Stethoscope className="w-4 h-4" style={{ color: 'var(--booking-primary)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Appointment Type</p>
                    <p className="text-sm text-gray-900">
                      {isComboFlow ? 'Exam + Hygiene' : bookingData.procedure}
                    </p>
                  </div>
                </div>
              )}

              {/* Provider(s) */}
              {(bookingData.provider || bookingData.comboProviders) && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-primary-light)' }}>
                    <User className="w-4 h-4" style={{ color: 'var(--booking-primary)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Provider</p>
                    {bookingData.comboProviders ? (
                      <div className="space-y-1">
                        {bookingData.comboProviders.examProvider && (
                          <p className="text-sm text-gray-900">
                            Exam: {getProviderName(bookingData.comboProviders.examProvider)}
                          </p>
                        )}
                        {bookingData.comboProviders.hygienist && (
                          <p className="text-sm text-gray-900">
                            Hygiene: {getProviderName(bookingData.comboProviders.hygienist)}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-900">{getProviderName(bookingData.provider)}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Date & Time */}
              {bookingData.date && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-primary-light)' }}>
                    <Calendar className="w-4 h-4" style={{ color: 'var(--booking-primary)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Date & Time</p>
                    <p className="text-sm text-gray-900">{formatDate(bookingData.date)}</p>
                    {bookingData.time && (
                      <p className="text-sm text-gray-600 mt-0.5">{bookingData.time}</p>
                    )}
                    {bookingData.examTime && bookingData.hygieneTime && (
                      <div className="space-y-0.5 mt-0.5">
                        <p className="text-sm text-gray-600">Exam: {bookingData.examTime}</p>
                        <p className="text-sm text-gray-600">Hygiene: {bookingData.hygieneTime}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Deposit Required */}
              {(isComboFlow || bookingData.procedure) && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-accent-light)' }}>
                    <Banknote className="w-4 h-4" style={{ color: 'var(--booking-accent)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Deposit Required</p>
                    {isComboFlow ? (
                      <div className="space-y-0.5">
                        <p className="text-sm text-gray-900">Exam: £50</p>
                        <p className="text-sm text-gray-900">Hygiene: £50</p>
                        <p className="text-sm text-gray-600 mt-1">Total: £100</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-900">£50</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Tap outside to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}