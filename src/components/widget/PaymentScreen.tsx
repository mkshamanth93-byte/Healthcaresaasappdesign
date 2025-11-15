import { Lock, CreditCard, Calendar, MapPin, User, FileText, Check } from 'lucide-react';
import { BottomCTA } from './BottomCTA';
import { FloatingCloseButton } from './FloatingCloseButton';
import { useState } from 'react';

interface PaymentScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  bookingData: any;
  isActive: boolean;
}

export function PaymentScreen({ onContinue, onBack, onClose, bookingData, isActive }: PaymentScreenProps) {
  const isMultiPatient = bookingData.appointmentPath === 'family';
  const isCombo = bookingData.appointmentPath === 'combo';
  const isFamilyOnly = bookingData.familyBookingFor === 'family-only';
  
  // Handle both old and new family data structures
  const getFamilyPatients = () => {
    // Returning patient family flow - uses familyMembers directly
    if (bookingData.familyMembers && Array.isArray(bookingData.familyMembers)) {
      return bookingData.familyMembers;
    }
    
    // New patient family flow - uses familyContactInfo
    if (bookingData.familyContactInfo) {
      // For "Family Only", exclude the booker (primaryPatient) from the patient list
      if (isFamilyOnly) {
        return bookingData.familyContactInfo.additionalPatients || [];
      }
      // For "Me + Family", include everyone
      const patients = [bookingData.familyContactInfo.primaryPatient];
      if (bookingData.familyContactInfo.additionalPatients && bookingData.familyContactInfo.additionalPatients.length > 0) {
        patients.push(...bookingData.familyContactInfo.additionalPatients);
      }
      return patients;
    }
    
    // Fallback
    return bookingData.patients || [];
  };
  
  const familyPatients = getFamilyPatients();
  const patientCount = isMultiPatient ? familyPatients.length : 1;
  
  // Get correct date/time for family flow
  const getAppointmentDate = () => {
    if (isMultiPatient && bookingData.selectedDate) {
      return bookingData.selectedDate;
    }
    return bookingData.date;
  };
  
  const getAppointmentTimes = () => {
    if (isMultiPatient && bookingData.selectedTimeSlots) {
      return bookingData.selectedTimeSlots;
    }
    return bookingData.time ? [bookingData.time] : [];
  };
  
  // Get provider for family flow
  const getProvider = () => {
    if (isMultiPatient && bookingData.familyProvider) {
      return bookingData.familyProvider;
    }
    return bookingData.provider;
  };
  
  // Get procedure/appointment type
  const getProcedure = () => {
    if (isMultiPatient && bookingData.familyAppointmentType) {
      return bookingData.familyAppointmentType === 'exam' ? 'Comprehensive Exam' : 'Hygiene Cleaning';
    }
    return bookingData.reason || bookingData.procedure;
  };
  
  const depositPerAppointment = 50;
  const examFee = 50;
  const hygieneFee = 50;
  const totalDeposit = isCombo 
    ? (examFee + hygieneFee) 
    : (depositPerAppointment * patientCount);

  const [appointmentInfoExpanded, setAppointmentInfoExpanded] = useState(true);
  const [depositInfoExpanded, setDepositInfoExpanded] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'googlepay' | 'applepay' | null>(null);
  const [showDigitalPayModal, setShowDigitalPayModal] = useState(false);
  const [selectedDigitalPay, setSelectedDigitalPay] = useState<'googlepay' | 'applepay' | null>(null);

  const handleContinue = () => {
    onContinue({ paid: true });
  };

  const handleDigitalPaySelect = (method: 'googlepay' | 'applepay') => {
    setPaymentMethod(method);
    setSelectedDigitalPay(method);
    setShowDigitalPayModal(true);
  };

  const handleDigitalPayComplete = () => {
    setShowDigitalPayModal(false);
    // Simulate payment completion
    setTimeout(() => {
      handleContinue();
    }, 500);
  };
  
  // Provider name mapping
  const getProviderName = (providerId: string) => {
    const providers: Record<string, string> = {
      'johnson': 'Dr. Sarah Johnson',
      'roberts': 'Dr. Michael Roberts',
      'chen': 'Dr. Emily Chen',
      'williams': 'Sarah Williams',
      'davis': 'Jennifer Davis',
      'taylor': 'Mike Taylor',
      'any': 'First Available'
    };
    return providers[providerId] || 'Not selected';
  };
  
  // Location name mapping
  const getLocationName = (locationId: string) => {
    const locations: Record<string, string> = {
      'downtown': 'Downtown Office',
      'westside': 'Westside Office',
      'eastside': 'Eastside Office'
    };
    return locations[locationId] || 'Not selected';
  };
  
  const appointmentDate = getAppointmentDate();
  const appointmentTimes = getAppointmentTimes();
  const provider = getProvider();
  const procedure = getProcedure();

  return (
    <div className="flex flex-col h-full relative">
      {/* Floating Close Button */}
      <FloatingCloseButton onClose={onClose} />
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-3xl text-gray-900 tracking-tight">Checkout.</h2>
          <p className="text-xl text-gray-500">Review and secure your appointment</p>
        </div>

        {/* Appointment Summary - Clickable */}
        <button
          onClick={() => setAppointmentInfoExpanded(!appointmentInfoExpanded)}
          className={`w-full p-5 border rounded-2xl space-y-4 text-left transition-all ${
            appointmentInfoExpanded 
              ? 'border-[#0071e3] ring-2 ring-[#0071e3]/20 bg-[#eff6ff]' 
              : 'border-black/10 bg-white/60 hover:border-[#0071e3]/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-gray-900">Your Appointment</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="text-base text-gray-900">
                  {appointmentDate ? new Date(appointmentDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  }) : 'Not selected'}
                </p>
                <p className="text-base text-gray-900">{appointmentTimes.join(', ') || 'Not selected'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base text-gray-900">
                  {getLocationName(bookingData.location) || 'Not selected'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Provider</p>
                {isCombo ? (
                  <>
                    <p className="text-base text-gray-900">
                      {getProviderName(bookingData.comboProviders?.examProvider || 'any')} (Exam)
                    </p>
                    <p className="text-base text-gray-900">
                      {getProviderName(bookingData.comboProviders?.hygienist || 'any')} (Hygiene)
                    </p>
                  </>
                ) : (
                  <p className="text-base text-gray-900">
                    {getProviderName(provider) || 'Not selected'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">{isCombo ? 'Appointments' : 'Procedure'}</p>
                {isCombo ? (
                  <>
                    <p className="text-base text-gray-900">Comprehensive Exam at {bookingData.examTime}</p>
                    <p className="text-base text-gray-900">Hygiene Cleaning at {bookingData.hygieneTime}</p>
                  </>
                ) : (
                  <p className="text-base text-gray-900">{procedure || 'Not selected'}</p>
                )}
              </div>
            </div>

            {isMultiPatient && (
              <div className="pt-3 border-t border-black/10">
                <p className="text-sm text-gray-500 mb-2">Family Members ({patientCount})</p>
                {familyPatients.map((patient: any, idx: number) => (
                  <div key={idx} className="py-2">
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-gray-900">{patient.firstName} {patient.lastName}</p>
                      <p className="text-gray-500">£{depositPerAppointment}</p>
                    </div>
                    {patient.selectedSlot && (
                      <p className="text-xs text-gray-500 mt-1">Appointment at {patient.selectedSlot}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </button>

        {/* Deposit Amount - Clickable */}
        <button
          onClick={() => setDepositInfoExpanded(!depositInfoExpanded)}
          className={`w-full p-6 border rounded-2xl text-left transition-all ${
            depositInfoExpanded 
              ? 'border-[#0071e3] ring-2 ring-[#0071e3]/20 bg-[#eff6ff]' 
              : 'border-black/10 bg-white/60 hover:border-[#0071e3]/50'
          }`}
        >
          {isCombo ? (
            // Combo Breakdown
            <>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Exam Fee</p>
                  <p className="text-base text-gray-900">£{examFee}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Hygiene Fee</p>
                  <p className="text-base text-gray-900">£{hygieneFee}</p>
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-base text-gray-600">Total Deposit</p>
                <p className="text-3xl text-gray-900">£{totalDeposit}</p>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Secures both appointments
              </p>
            </>
          ) : (
            // Single or Family
            <>
              <div className="flex items-center justify-between mb-1">
                <p className="text-base text-gray-600">Deposit Required</p>
                <p className="text-3xl text-gray-900 text-center">£{totalDeposit}</p>
              </div>
              <p className="text-sm text-gray-500">
                {isMultiPatient 
                  ? `${patientCount} × £${depositPerAppointment} deposit` 
                  : 'Secures your booking'}
              </p>
            </>
          )}
        </button>

        {/* Payment Method Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg text-gray-900">Payment Method</h3>
          </div>

          <div className="space-y-3">
            {/* Card Option */}
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 border rounded-xl text-left transition-all flex items-center justify-between ${
                paymentMethod === 'card'
                  ? 'border-[#0071e3] ring-2 ring-[#0071e3]/20 bg-white'
                  : 'border-black/10 bg-white/60 hover:border-[#0071e3]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-base text-gray-900">Credit or Debit Card</span>
              </div>
              {paymentMethod === 'card' && (
                <div className="w-6 h-6 rounded-full bg-[#0071e3] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            {/* Google Pay Option */}
            <button
              onClick={() => handleDigitalPaySelect('googlepay')}
              className={`w-full p-4 border rounded-xl text-left transition-all flex items-center justify-between ${
                paymentMethod === 'googlepay'
                  ? 'border-[#0071e3] ring-2 ring-[#0071e3]/20 bg-white'
                  : 'border-black/10 bg-white/60 hover:border-[#0071e3]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 flex items-center justify-center">
                  <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                    <path d="M23.7 10.2v5.5h-1.7V4.3h4.5c1.1 0 2.1.4 2.8 1.1.8.7 1.2 1.7 1.2 2.7 0 1.1-.4 2-1.2 2.7-.8.7-1.7 1.1-2.8 1.1h-2.8v.3zm0-4.4v3h2.9c.7 0 1.2-.2 1.7-.6.4-.4.7-1 .7-1.6 0-.6-.2-1.2-.7-1.6-.5-.4-1-.6-1.7-.6h-2.9z" fill="#5F6368"/>
                    <path d="M33.9 8.7c1.2 0 2.2.4 3 1.2.8.8 1.2 1.8 1.2 3v.2h-6.8c.1.7.4 1.3.9 1.7.5.4 1 .6 1.7.6.9 0 1.6-.4 2.1-1.1l1.3.9c-.4.6-.9 1-1.5 1.3-.6.3-1.3.5-2.1.5-1.2 0-2.2-.4-3.1-1.2-.8-.8-1.3-1.9-1.3-3.1 0-1.2.4-2.3 1.2-3.1.9-.9 1.9-1.3 3.1-1.3l.3-.6zm-2.4 3.5h5c-.1-.7-.4-1.2-.8-1.5-.4-.4-.9-.6-1.6-.6-.6 0-1.2.2-1.6.6-.5.3-.8.9-1 1.5z" fill="#5F6368"/>
                    <path d="M46.4 9l-5.4 12.5h-1.8l2-4.4-3.6-8.1h1.9l2.5 5.9 2.5-5.9h1.9z" fill="#5F6368"/>
                    <path d="M16.2 9.4c0 .5 0 .9-.1 1.3h-7.5c.1.9.5 1.6 1.1 2.1.6.5 1.4.8 2.3.8 1.1 0 2-.4 2.7-1.1l1.4 1.4c-1 1.1-2.4 1.6-4 1.6-1.6 0-3-.5-4.1-1.6-1.1-1.1-1.7-2.4-1.7-4 0-1.6.6-2.9 1.7-4 1.1-1.1 2.5-1.6 4-1.6 1.5 0 2.8.5 3.9 1.5 1 1.1 1.5 2.5 1.5 4.2v.4h-.2zm-7.5-1h5.7c-.1-.7-.4-1.3-.9-1.7-.5-.4-1.1-.7-1.8-.7-.7 0-1.3.2-1.9.7-.5.4-.9 1-1.1 1.7z" fill="#4285F4"/>
                    <path d="M12.8 4.6c-1.5 0-2.7.5-3.7 1.6v-1.3h-2v10.8h2v-5.8c0-1 .3-1.9.9-2.5.6-.6 1.4-1 2.3-1 .9 0 1.6.3 2.2.9.6.6.9 1.4.9 2.4v5.9h2v-6.2c0-1.4-.5-2.6-1.4-3.5-.9-1-2-1.4-3.4-1.4l.2.1z" fill="#EA4335"/>
                    <path d="M2.5 4.9h2v10.8h-2V4.9zm0-3.6h2v2.2h-2V1.3z" fill="#34A853"/>
                  </svg>
                </div>
                <span className="text-base text-gray-900">Google Pay</span>
              </div>
              {paymentMethod === 'googlepay' && (
                <div className="w-6 h-6 rounded-full bg-[#0071e3] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            {/* Apple Pay Option */}
            <button
              onClick={() => handleDigitalPaySelect('applepay')}
              className={`w-full p-4 border rounded-xl text-left transition-all flex items-center justify-between ${
                paymentMethod === 'applepay'
                  ? 'border-[#0071e3] ring-2 ring-[#0071e3]/20 bg-white'
                  : 'border-black/10 bg-white/60 hover:border-[#0071e3]/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 flex items-center justify-center">
                  <svg width="48" height="20" viewBox="0 0 48 20" fill="none">
                    <path d="M8.8 3.5c.4-.5.7-1.2.6-1.9-.6 0-1.4.4-1.8.9-.4.4-.7 1.1-.6 1.8.7 0 1.4-.4 1.8-.8zm.6 1c-1 0-1.8.5-2.3.5s-1.2-.5-2-.5c-1 0-2 .6-2.5 1.5-1.1 1.8-.3 4.5.7 6 .5.7 1.1 1.5 1.8 1.5.7 0 1-.5 1.8-.5s1.1.5 1.9.5 1.3-.8 1.8-1.5c.6-.8.8-1.6.8-1.6s-1.6-.6-1.6-2.4.1-2.1 1.5-2.6c-.6-1-1.6-1.5-2.4-1.5l-.5.6z" fill="black"/>
                    <path d="M19.8 3.9c2.3 0 3.9 1.6 3.9 3.8 0 2.3-1.7 3.9-4 3.9h-2.6v3.9h-1.8V3.9h4.5zm-2.7 6.1h2.2c1.6 0 2.5-.8 2.5-2.3 0-1.4-.9-2.2-2.5-2.2h-2.2v4.5zm8.9 5.8c0-1.2.9-1.9 2.5-2l2.8-.2v-.7c0-1-.7-1.5-1.8-1.5-1 0-1.7.5-1.8 1.2h-1.6c.1-1.5 1.4-2.7 3.5-2.7s3.3 1.2 3.3 3v6.5h-1.7v-1.6h-.1c-.5 1-1.6 1.7-2.8 1.7-1.7.1-2.8-1-2.8-2.4l-.5-.3zm5.3-.7v-.7l-2.5.2c-1.1.1-1.7.5-1.7 1.3 0 .8.7 1.3 1.6 1.3 1.3 0 2.2-.8 2.6-2.1zm4.4 8.5v-1.4c.1 0 .4.1.6.1.9 0 1.4-.4 1.7-1.3 0-.1.2-.7.2-.7l-3.4-9.2h1.9l2.4 7.6h.1l2.4-7.6h1.8l-3.5 9.8c-.7 2-1.6 2.7-3.3 2.7-.2 0-.7 0-.9-.1v.1z" fill="black"/>
                  </svg>
                </div>
                <span className="text-base text-gray-900">Apple Pay</span>
              </div>
              {paymentMethod === 'applepay' && (
                <div className="w-6 h-6 rounded-full bg-[#0071e3] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          </div>

          {/* Card Form - Only shown when Card is selected */}
          {paymentMethod === 'card' && (
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 bg-white/60 border border-black/10 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Expiration</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 bg-white/60 border border-black/10 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 bg-white/60 border border-black/10 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
                    maxLength={3}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">ZIP Code</label>
                <input
                  type="text"
                  placeholder="94105"
                  className="w-full px-4 py-3 bg-white/60 border border-black/10 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
                  maxLength={5}
                />
              </div>
            </div>
          )}
        </div>

        {/* Security Badges */}
        <div className="flex items-center justify-center gap-4 py-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4" />
            <span>256-bit SSL</span>
          </div>
          <span>•</span>
          <span>Powered by Stripe</span>
          <span>•</span>
          <span>PCI Compliant</span>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Deposit is non-refundable if cancelled within 24 hours of appointment.
        </p>
      </div>

      {/* Bottom CTA */}
      <BottomCTA
        onContinue={handleContinue}
        onBack={onBack}
        continueText="Pay"
        showLockIcon={true}
        depositAmount={totalDeposit}
      />

      {/* Digital Pay Modal */}
      {showDigitalPayModal && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
          <div className="w-full bg-white rounded-t-3xl p-6 space-y-4 animate-slide-up">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            
            <div className="text-center space-y-2">
              <h3 className="text-2xl text-gray-900">
                {selectedDigitalPay === 'googlepay' ? 'Google Pay' : 'Apple Pay'}
              </h3>
              <p className="text-base text-gray-500">Complete your payment</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Downtown Office</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-900">Appointment Deposit</span>
                <span className="text-2xl text-gray-900">£{totalDeposit}</span>
              </div>
            </div>

            <button
              onClick={handleDigitalPayComplete}
              className="w-full py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-base text-center"
            >
              Pay £{totalDeposit}
            </button>

            <button
              onClick={() => setShowDigitalPayModal(false)}
              className="w-full py-3 text-gray-600 hover:text-gray-900 transition-colors text-base text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}