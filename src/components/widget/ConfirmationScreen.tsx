import { useEffect, useState } from 'react';
import { CheckCircle, Calendar, MapPin, User, Copy, Phone, Mail, Download, ExternalLink, ChevronDown, ArrowRight } from 'lucide-react';

interface ConfirmationScreenProps {
  bookingData: any;
  onClose: () => void;
}

export function ConfirmationScreen({ bookingData, onClose }: ConfirmationScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const isCombo = bookingData.appointmentPath === 'combo';
  const isFamily = bookingData.appointmentPath === 'family';
  const isFamilyOnly = bookingData.familyBookingFor === 'family-only';
  
  // Get family patients
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
      if (bookingData.familyContactInfo.additionalPatients) {
        patients.push(...bookingData.familyContactInfo.additionalPatients);
      }
      return patients;
    }
    
    // Fallback
    return bookingData.patients || [];
  };

  const familyPatients = getFamilyPatients();
  
  // Get booker info (for family-only flow)
  const bookerInfo = isFamilyOnly && bookingData.familyContactInfo?.primaryPatient 
    ? bookingData.familyContactInfo.primaryPatient 
    : null;

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-8 space-y-6 relative">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: ['#0071e3', '#34C759', '#FF9500', '#FF3B30', '#AF52DE'][Math.floor(Math.random() * 5)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Success Icon */}
        <div className="text-center pt-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#34C759] rounded-full mb-4 animate-scale-in shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl text-gray-900 mb-2 tracking-tight">You're all set!</h2>
          <p className="text-xl text-gray-500">Your appointment is confirmed</p>
        </div>

        {/* Booking Summary */}
        {isFamily ? (
          // Family Appointment Tiles - One for each family member
          <div className="space-y-4">
            <h3 className="text-lg text-gray-900">Family Appointments</h3>
            {familyPatients.map((patient: any, idx: number) => {
              const providerNames: Record<string, string> = {
                'johnson': 'Dr. Sarah Johnson',
                'roberts': 'Dr. Michael Roberts',
                'chen': 'Dr. Emily Chen'
              };
              
              const locationNames: Record<string, string> = {
                'downtown': 'Downtown Office',
                'westside': 'Westside Office',
                'eastside': 'Eastside Office'
              };
              
              const appointmentTypes: Record<string, string> = {
                'exam': 'Comprehensive Exam',
                'hygiene': 'Hygiene Cleaning'
              };
              
              // Get the time slot for this patient
              const timeSlot = bookingData.selectedTimeSlots?.[idx] || '2:00 PM';
              
              const colors = [
                { bg: 'var(--booking-primary-light)', border: 'var(--booking-primary)', icon: 'var(--booking-primary)' },
                { bg: 'var(--booking-secondary-light)', border: 'var(--booking-secondary)', icon: 'var(--booking-secondary)' },
                { bg: '#E8F5E9', border: '#4CAF50', icon: '#4CAF50' },
                { bg: '#FFF3E0', border: '#FF9800', icon: '#FF9800' }, 
              ];
              
              const color = colors[idx % colors.length];
              
              return (
                <div
                  key={idx}
                  className="w-full p-5 rounded-2xl space-y-3 border-2"
                  style={{ background: color.bg, borderColor: color.border }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: color.icon }}></div>
                    <p className="text-xs text-gray-600">
                      {isFamilyOnly 
                        ? `Family Member ${idx + 1}`
                        : (idx === 0 ? 'Primary Patient' : `Family Member ${idx}`)}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: color.icon }}
                    >
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Patient</p>
                      <p className="text-base text-gray-900">
                        {patient.firstName} {patient.lastName}
                      </p>
                      {patient.dob && (
                        <p className="text-sm text-gray-500">DOB: {patient.dob}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: color.icon }}
                    >
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Appointment</p>
                      <p className="text-base text-gray-900">
                        {appointmentTypes[bookingData.familyAppointmentType] || 'Comprehensive Exam'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {providerNames[bookingData.familyProvider] || 'Dr. Sarah Johnson'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {bookingData.selectedDate
                          ? `${new Date(bookingData.selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${timeSlot}`
                          : `Monday, March 15, 2024 at ${timeSlot}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: color.icon }}
                    >
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-base text-gray-900">
                        {locationNames[bookingData.location] || 'Downtown Office'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : isCombo ? (
          // Dual Appointment Cards for Combo
          <div className="space-y-4">
            {/* Exam Appointment */}
            <div className="w-full p-5 rounded-2xl space-y-3 border-2" style={{ background: 'var(--booking-primary-light)', borderColor: 'var(--booking-primary)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--booking-primary)' }}></div>
                <p className="text-xs text-gray-600">Appointment 1</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-primary)' }}>
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Exam</p>
                  <p className="text-base text-gray-900">
                    {bookingData.comboProviders?.examProvider === 'johnson' ? 'Dr. Sarah Johnson' : 'Dr. Michael Roberts'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {bookingData.date && bookingData.examTime
                      ? `${new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${bookingData.examTime}`
                      : 'Monday, March 15, 2024 at 2:00 PM'}
                  </p>
                </div>
              </div>
            </div>

            {/* Hygiene Appointment */}
            <div className="w-full p-5 rounded-2xl space-y-3 border-2" style={{ background: 'var(--booking-secondary-light)', borderColor: 'var(--booking-secondary)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--booking-secondary)' }}></div>
                <p className="text-xs text-gray-600">Appointment 2</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-secondary)' }}>
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hygiene</p>
                  <p className="text-base text-gray-900">
                    {bookingData.comboProviders?.hygienist === 'williams' ? 'Sarah Williams' : 'Jennifer Davis'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {bookingData.date && bookingData.hygieneTime
                      ? `${new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${bookingData.hygieneTime}`
                      : 'Monday, March 15, 2024 at 3:00 PM'}
                  </p>
                </div>
              </div>
            </div>

            {/* Location - Shared */}
            <div className="w-full p-5 rounded-2xl border-2 bg-white/60 border-black/10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-600">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-base text-gray-900">
                    {bookingData.location === 'downtown' ? 'Downtown Office' : 
                     bookingData.location === 'westside' ? 'Westside Office' : 'Downtown Office'}
                  </p>
                  <p className="text-sm text-gray-600">123 Main Street, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Single Appointment Card
          <div 
            className="w-full p-5 rounded-2xl space-y-4 border-2"
            style={{ background: 'var(--booking-primary-light)', borderColor: 'var(--booking-primary)' }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-primary)' }}>
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointment</p>
                <p className="text-base text-gray-900">{bookingData.reason || 'Dental Appointment'}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {bookingData.date && bookingData.time
                    ? `${new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at ${bookingData.time}`
                    : 'Monday, March 15, 2024 at 2:00 PM'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-primary)' }}>
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Provider</p>
                <p className="text-base text-gray-900">
                  {bookingData.provider === 'johnson' ? 'Dr. Sarah Johnson' : 
                   bookingData.provider === 'roberts' ? 'Dr. Michael Roberts' :
                   bookingData.provider === 'chen' ? 'Dr. Emily Chen' : 'Dr. Sarah Johnson'}
                </p>
                <p className="text-sm text-gray-600">DDS, General Dentist</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--booking-primary)' }}>
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base text-gray-900">
                  {bookingData.location === 'downtown' ? 'Downtown Office' : 
                   bookingData.location === 'westside' ? 'Westside Office' : 'Downtown Office'}
                </p>
                <p className="text-sm text-gray-600">123 Main Street, San Francisco, CA</p>
              </div>
            </div>
          </div>
        )}

        {/* Patient Information Card */}
        <div 
          className="w-full p-5 rounded-2xl space-y-4 border-2"
          style={{ background: 'var(--booking-primary-light)', borderColor: 'var(--booking-primary)' }}
        >
          <h3 className="text-base text-gray-900">
            {isFamilyOnly ? 'Booking Contact Information' : 'Patient Information'}
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">
                {isFamilyOnly ? 'Booked by' : 'Patient Name'}
              </p>
              <p className="text-base text-gray-900">
                {isFamily && bookingData.familyContactInfo?.primaryPatient 
                  ? `${bookingData.familyContactInfo.primaryPatient.firstName} ${bookingData.familyContactInfo.primaryPatient.lastName}`
                  : bookingData.patientName || 'John Smith'}
              </p>
            </div>
            {/* Only show DOB for Me+Family, not for Family Only */}
            {!isFamilyOnly && (
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-base text-gray-900">
                  {isFamily && bookingData.familyContactInfo?.primaryPatient?.dateOfBirth
                    ? bookingData.familyContactInfo.primaryPatient.dateOfBirth
                    : bookingData.dob || 'January 15, 1990'}
                </p>
              </div>
            )}
            <div className="pt-3 border-t" style={{ borderColor: 'rgba(122, 44, 127, 0.2)' }}>
              <p className="text-sm text-gray-700">
                {isFamilyOnly 
                  ? 'Appointment reminders and confirmations will be sent to '
                  : 'You will receive an appointment confirmation soon at '}
                <span style={{ color: 'var(--booking-primary)' }}>
                  {isFamily && bookingData.familyContactInfo?.primaryPatient?.email
                    ? bookingData.familyContactInfo.primaryPatient.email
                    : bookingData.email || 'john.smith@example.com'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="space-y-3">
          <h3 className="text-lg text-gray-900">What happens next?</h3>
          <div className="space-y-3">
            {[
              { icon: Mail, text: 'Confirmation email sent to your inbox' },
              { icon: Calendar, text: "We'll send a reminder 24 hours before" },
              { icon: MapPin, text: 'Get directions on the day of your visit' },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5">
                  <step.icon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-700">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/60 border border-black/10 text-gray-700 rounded-xl hover:bg-white hover:border-[#0071e3] hover:text-[#0071e3] transition-all">
            <Download className="w-4 h-4" />
            <span className="text-sm">Add to Calendar</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/60 border border-black/10 text-gray-700 rounded-xl hover:bg-white hover:border-[#0071e3] hover:text-[#0071e3] transition-all">
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">Directions</span>
          </button>
        </div>

        {/* Contact Card */}
        <div className="p-4 bg-white/60 border border-black/10 rounded-xl">
          <p className="text-sm text-gray-900 mb-3">Questions? We're here to help</p>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-black/10 rounded-lg hover:bg-black/5 transition-colors">
              <Phone className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Call</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-black/10 rounded-lg hover:bg-black/5 transition-colors">
              <Mail className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Email</span>
            </button>
          </div>
        </div>

        {/* Pre-appointment Instructions */}
        <div className="p-5 bg-white/60 border border-black/10 rounded-2xl space-y-3">
          <h3 className="text-base text-gray-900">Pre-appointment instructions</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#0071e3]">•</span>
              <span>Arrive 15 minutes early to complete paperwork</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0071e3]">•</span>
              <span>Bring your insurance card and ID</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0071e3]">•</span>
              <span>Avoid eating 2 hours before your appointment</span>
            </li>
          </ul>
        </div>

        {/* Portal Access Card */}
        <div className="space-y-3">
          <h3 className="text-base text-gray-900">You have 3 things to do before your appointment</h3>
          
          {/* Large Portal CTA Card */}
          <button 
            className="w-full p-6 text-white rounded-2xl transition-all shadow-lg hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, var(--booking-primary) 0%, var(--booking-primary-hover) 100%)'
            }}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h4 className="text-xl">Access your portal</h4>
                <ArrowRight className="w-6 h-6 flex-shrink-0" />
              </div>
              
              {/* Tasks List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm">Fill in your NHS form</p>
                    <p className="text-xs text-white/70">80% complete</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm">Complete your medical information</p>
                    <p className="text-xs text-white/70">not started</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm">Complete your details</p>
                    <p className="text-xs text-white/70">80% complete</p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full px-6 py-4 text-white rounded-xl shadow-sm transition-all"
          style={{
            background: 'linear-gradient(135deg, var(--booking-primary) 0%, var(--booking-primary-hover) 100%)'
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}