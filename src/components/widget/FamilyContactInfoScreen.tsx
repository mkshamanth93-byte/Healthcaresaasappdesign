import { useState } from 'react';
import { Users, ChevronRight, ChevronLeft, User, Mail, Phone, Clock, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface FamilyContactInfoScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  isActive: boolean;
  appointmentType: 'exam-all' | 'hygiene-all';
  familyPatientCount: number;
  selectedTimeSlots: string[];
  selectedDate: string;
  location: string;
  providerId: string;
  familyBookingFor?: 'me-plus-family' | 'family-only';
}

interface PrimaryPatientData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  selectedSlot: string;
}

interface AdditionalPatientData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  relationship: string;
  useSameContact: boolean;
  selectedSlot: string;
}

export function FamilyContactInfoScreen({ 
  onContinue, 
  onBack, 
  isActive,
  appointmentType,
  familyPatientCount,
  selectedTimeSlots,
  selectedDate,
  location,
  providerId,
  familyBookingFor = 'me-plus-family'  // Default to me-plus-family for backward compatibility
}: FamilyContactInfoScreenProps) {
  const isFamilyOnly = familyBookingFor === 'family-only';
  
  // For "family-only", we need booker info + all family members
  // For "me-plus-family", primary patient is also a patient
  const totalFormsToCollect = isFamilyOnly ? familyPatientCount + 1 : familyPatientCount;
  
  const [primaryPatient, setPrimaryPatient] = useState<PrimaryPatientData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    selectedSlot: ''
  });

  const [additionalPatients, setAdditionalPatients] = useState<AdditionalPatientData[]>(
    Array(isFamilyOnly ? familyPatientCount : familyPatientCount - 1).fill(null).map(() => ({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      relationship: '',
      useSameContact: false,
      selectedSlot: ''
    }))
  );

  const [currentPatientIndex, setCurrentPatientIndex] = useState(0); // 0 = primary, 1+ = additional

  // Mock provider names
  const providerNames: Record<string, string> = {
    'johnson': 'Dr. Sarah Johnson',
    'roberts': 'Dr. Michael Roberts',
    'chen': 'Dr. Lisa Chen',
    'williams': 'Sarah Williams',
    'davis': 'Mike Davis',
    'taylor': 'Emily Taylor'
  };

  const locationNames: Record<string, string> = {
    'downtown': 'Downtown',
    'westside': 'Westside',
    'eastside': 'Eastside'
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

  const isExamType = appointmentType === 'exam-all';

  // Validation
  const isPrimaryPatientValid = () => {
    // For family-only, booker doesn't need a time slot or DOB/gender (just contact info)
    if (isFamilyOnly) {
      return primaryPatient.firstName.trim() !== '' &&
             primaryPatient.lastName.trim() !== '' &&
             primaryPatient.phone.trim() !== '' &&
             primaryPatient.email.trim() !== '';
    }
    // For me-plus-family, primary patient needs everything including slot
    return primaryPatient.firstName.trim() !== '' &&
           primaryPatient.lastName.trim() !== '' &&
           primaryPatient.phone.trim() !== '' &&
           primaryPatient.email.trim() !== '' &&
           primaryPatient.dateOfBirth.trim() !== '' &&
           primaryPatient.gender.trim() !== '' &&
           primaryPatient.selectedSlot !== '';
  };

  const isAdditionalPatientValid = (index: number) => {
    const patient = additionalPatients[index];
    return patient.firstName.trim() !== '' &&
           patient.lastName.trim() !== '' &&
           patient.dateOfBirth.trim() !== '' &&
           patient.gender.trim() !== '' &&
           patient.relationship.trim() !== '' &&
           patient.selectedSlot !== '';
  };

  const canContinue = () => {
    if (currentPatientIndex === 0) {
      return isPrimaryPatientValid();
    } else {
      return isAdditionalPatientValid(currentPatientIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPatientIndex < totalFormsToCollect - 1) {
      // Move to next patient
      setCurrentPatientIndex(currentPatientIndex + 1);
    } else {
      // All patients done - continue to next step
      onContinue({
        familyContactInfo: {
          primaryPatient,
          additionalPatients
        }
      });
    }
  };

  const handlePrevious = () => {
    if (currentPatientIndex > 0) {
      setCurrentPatientIndex(currentPatientIndex - 1);
    } else {
      onBack();
    }
  };

  const updatePrimaryPatient = (field: keyof PrimaryPatientData, value: string) => {
    setPrimaryPatient({ ...primaryPatient, [field]: value });
  };

  const updateAdditionalPatient = (index: number, field: keyof AdditionalPatientData, value: string | boolean) => {
    const updated = [...additionalPatients];
    updated[index] = { ...updated[index], [field]: value };
    setAdditionalPatients(updated);
  };

  // Get slots that haven't been selected yet
  const getAvailableSlots = (currentSlot: string) => {
    const selectedSlots = [
      primaryPatient.selectedSlot,
      ...additionalPatients.map(p => p.selectedSlot)
    ].filter(s => s !== '' && s !== currentSlot);

    return selectedTimeSlots.filter(slot => !selectedSlots.includes(slot));
  };

  const sortedTimeSlots = [...selectedTimeSlots].sort((a, b) => {
    const timeA = new Date(`2000-01-01 ${a}`);
    const timeB = new Date(`2000-01-01 ${b}`);
    return timeA.getTime() - timeB.getTime();
  });

  const totalPatients = totalFormsToCollect;
  const completedPatients = currentPatientIndex;

  // Get display text for current step based on flow type
  const getCurrentStepLabel = () => {
    if (isFamilyOnly) {
      // Family Only: Booker first (not a patient), then patients
      if (currentPatientIndex === 0) {
        return 'Booker contact details';
      }
      return `Patient ${currentPatientIndex} of ${familyPatientCount}`;
    } else {
      // Me + Family: All are patients
      if (currentPatientIndex === 0) {
        return 'Primary contact details';
      }
      return `Patient ${currentPatientIndex + 1} of ${totalPatients}`;
    }
  };

  // Get progress display text
  const getProgressLabel = () => {
    if (isFamilyOnly) {
      // Family Only: "Booker Details + Patient 1 of 3" format
      if (currentPatientIndex === 0) {
        return 'Booker Details';
      }
      return `Patient ${currentPatientIndex} of ${familyPatientCount}`;
    } else {
      // Me + Family: "Patient 1 of 4" format
      return `Patient ${currentPatientIndex + 1} of ${totalPatients}`;
    }
  };

  // Get button text based on current position
  const getButtonText = () => {
    if (isFamilyOnly) {
      // Family Only flow
      if (currentPatientIndex === 0) {
        return 'Continue to Patients';
      }
      if (currentPatientIndex < totalFormsToCollect - 1) {
        return 'Next Patient';
      }
      return 'Continue';
    } else {
      // Me + Family flow
      if (currentPatientIndex < totalFormsToCollect - 1) {
        return 'Next Patient';
      }
      return 'Continue';
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: '#f8f9fa' }}>
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-6">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--booking-primary-light)' }}
            >
              <Users className="w-5 h-5" style={{ color: 'var(--booking-primary)' }} />
            </div>
            <div>
              <h2 className="text-gray-900">Patient Information</h2>
              <p className="text-xs text-gray-500">{getCurrentStepLabel()}</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <Card className="border-2" style={{ borderColor: 'var(--booking-primary-light)', background: 'white' }}>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" style={{ color: 'var(--booking-primary)' }} />
                  <div>
                    <p className="text-sm text-gray-900">Collection Progress</p>
                    <p className="text-xs text-gray-500">{getProgressLabel()}</p>
                  </div>
                </div>
                <div 
                  className="px-3 py-1.5 rounded-lg"
                  style={{
                    background: 'var(--booking-primary-light)',
                    color: 'var(--booking-primary)'
                  }}
                >
                  <span className="text-xs">{completedPatients}/{totalPatients}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: `${(completedPatients / totalPatients) * 100}%`,
                    background: 'var(--booking-primary)'
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Context Info */}
        <Card className="border-2" style={{ borderColor: '#e0e7ff', background: '#f0f4ff' }}>
          <CardContent className="p-4">
            <div className="space-y-2 text-xs text-gray-700">
              <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
              <p><strong>Location:</strong> {locationNames[location] || location}</p>
              <p><strong>Provider:</strong> {providerNames[providerId] || providerId}</p>
              <p><strong>Service:</strong> {isExamType ? 'Dental Exam' : 'Dental Hygiene'}</p>
            </div>
          </CardContent>
        </Card>

        {/* PRIMARY PATIENT FORM */}
        {currentPatientIndex === 0 && (
          <Card className="border-2" style={{ borderColor: 'var(--booking-primary)', background: 'white' }}>
            <CardContent className="p-5">
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--booking-primary)' }}
                  >
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">
                      {isFamilyOnly ? 'Booker Contact Info' : 'Primary Patient (You)'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {isFamilyOnly ? 'For notifications only (not receiving appointment)' : 'Person booking this appointment'}
                    </p>
                  </div>
                </div>

                {/* OTP Notice */}
                <div 
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b' }}
                >
                  <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    <strong>OTP will be sent to this contact</strong> for verification
                  </p>
                </div>

                {/* First Name and Last Name - Side by Side */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="primary-first-name" className="text-xs text-gray-600">First Name *</Label>
                    <Input
                      id="primary-first-name"
                      type="text"
                      placeholder="John"
                      value={primaryPatient.firstName}
                      onChange={(e) => updatePrimaryPatient('firstName', e.target.value)}
                      className="h-12 px-4 border-2 rounded-xl text-sm"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primary-last-name" className="text-xs text-gray-600">Last Name *</Label>
                    <Input
                      id="primary-last-name"
                      type="text"
                      placeholder="Smith"
                      value={primaryPatient.lastName}
                      onChange={(e) => updatePrimaryPatient('lastName', e.target.value)}
                      className="h-12 px-4 border-2 rounded-xl text-sm"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="primary-email" className="text-xs text-gray-600">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="primary-email"
                      type="email"
                      placeholder="john.smith@email.com"
                      value={primaryPatient.email}
                      onChange={(e) => updatePrimaryPatient('email', e.target.value)}
                      className="h-12 pl-11 pr-4 border-2 rounded-xl text-sm"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="primary-phone" className="text-xs text-gray-600">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="primary-phone"
                      type="tel"
                      placeholder="(415) 555-0123"
                      value={primaryPatient.phone}
                      onChange={(e) => updatePrimaryPatient('phone', e.target.value)}
                      className="h-12 pl-11 pr-4 border-2 rounded-xl text-sm"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>
                </div>

                {/* Only show DOB, Gender, and Slot for Me+Family (not for Family-Only) */}
                {!isFamilyOnly && (
                  <>
                    {/* Date of Birth and Gender - Side by Side */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="primary-date-of-birth" className="text-xs text-gray-600">Date of Birth *</Label>
                        <Input
                          id="primary-date-of-birth"
                          type="date"
                          value={primaryPatient.dateOfBirth}
                          onChange={(e) => updatePrimaryPatient('dateOfBirth', e.target.value)}
                          className="h-12 px-4 border-2 rounded-xl text-sm"
                          style={{ borderColor: '#e5e7eb' }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="primary-gender" className="text-xs text-gray-600">Gender *</Label>
                        <select
                          id="primary-gender"
                          value={primaryPatient.gender}
                          onChange={(e) => updatePrimaryPatient('gender', e.target.value)}
                          className="w-full h-12 px-4 border-2 rounded-xl text-sm bg-white"
                          style={{ borderColor: '#e5e7eb', color: primaryPatient.gender ? '#1f2937' : '#9ca3af' }}
                        >
                          <option value="">Select...</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Slot Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="primary-slot" className="text-xs text-gray-600">Preferred Time Slot *</Label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select
                          id="primary-slot"
                          value={primaryPatient.selectedSlot}
                          onChange={(e) => updatePrimaryPatient('selectedSlot', e.target.value)}
                          className="w-full h-12 pl-11 pr-4 border-2 rounded-xl text-sm bg-white"
                          style={{ borderColor: '#e5e7eb' }}
                        >
                          <option value="">Choose a time slot...</option>
                          {getAvailableSlots(primaryPatient.selectedSlot).map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Provider Info */}
                    {primaryPatient.selectedSlot && (
                      <div 
                        className="flex items-center gap-2 p-3 rounded-lg"
                        style={{ background: 'var(--booking-primary-light)' }}
                      >
                        <User className="w-4 h-4" style={{ color: 'var(--booking-primary)' }} />
                        <p className="text-xs" style={{ color: 'var(--booking-primary)' }}>
                          <strong>{primaryPatient.name || 'You'}</strong> at {primaryPatient.selectedSlot} with {providerNames[providerId]}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ADDITIONAL PATIENT FORM */}
        {currentPatientIndex > 0 && (
          <Card className="border-2" style={{ borderColor: 'var(--booking-accent)', background: 'white' }}>
            <CardContent className="p-5">
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--booking-accent)' }}
                  >
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900">
                      Patient {isFamilyOnly ? currentPatientIndex : currentPatientIndex + 1}
                    </h3>
                    <p className="text-xs text-gray-500">Family member details</p>
                  </div>
                </div>

                {/* First Name and Last Name - Side by Side */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`patient-${currentPatientIndex}-first-name`} className="text-xs text-gray-600">First Name *</Label>
                    <Input
                      id={`patient-${currentPatientIndex}-first-name`}
                      type="text"
                      placeholder="First name"
                      value={additionalPatients[currentPatientIndex - 1].firstName}
                      onChange={(e) => updateAdditionalPatient(currentPatientIndex - 1, 'firstName', e.target.value)}
                      className="h-12 px-4 border-2 rounded-xl text-sm"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`patient-${currentPatientIndex}-last-name`} className="text-xs text-gray-600">Last Name *</Label>
                    <Input
                      id={`patient-${currentPatientIndex}-last-name`}
                      type="text"
                      placeholder="Last name"
                      value={additionalPatients[currentPatientIndex - 1].lastName}
                      onChange={(e) => updateAdditionalPatient(currentPatientIndex - 1, 'lastName', e.target.value)}
                      className="h-12 px-4 border-2 rounded-xl text-sm"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>
                </div>

                {/* Date of Birth and Gender - Side by Side */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`patient-${currentPatientIndex}-date-of-birth`} className="text-xs text-gray-600">Date of Birth *</Label>
                    <Input
                      id={`patient-${currentPatientIndex}-date-of-birth`}
                      type="date"
                      value={additionalPatients[currentPatientIndex - 1].dateOfBirth}
                      onChange={(e) => updateAdditionalPatient(currentPatientIndex - 1, 'dateOfBirth', e.target.value)}
                      className="h-12 px-4 border-2 rounded-xl text-sm"
                      style={{ borderColor: '#e5e7eb' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`patient-${currentPatientIndex}-gender`} className="text-xs text-gray-600">Gender *</Label>
                    <select
                      id={`patient-${currentPatientIndex}-gender`}
                      value={additionalPatients[currentPatientIndex - 1].gender}
                      onChange={(e) => updateAdditionalPatient(currentPatientIndex - 1, 'gender', e.target.value)}
                      className="w-full h-12 px-4 border-2 rounded-xl text-sm bg-white"
                      style={{ borderColor: '#e5e7eb', color: additionalPatients[currentPatientIndex - 1].gender ? '#1f2937' : '#9ca3af' }}
                    >
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Relationship */}
                <div className="space-y-2">
                  <Label htmlFor={`patient-${currentPatientIndex}-relationship`} className="text-xs text-gray-600">Relationship *</Label>
                  <select
                    id={`patient-${currentPatientIndex}-relationship`}
                    value={additionalPatients[currentPatientIndex - 1].relationship}
                    onChange={(e) => updateAdditionalPatient(currentPatientIndex - 1, 'relationship', e.target.value)}
                    className="w-full h-12 px-4 border-2 rounded-xl text-sm bg-white"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    <option value="">Select relationship...</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Use Same Contact Checkbox */}
                <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: '#f3f4f6' }}>
                  <input
                    type="checkbox"
                    id={`patient-${currentPatientIndex}-same-contact`}
                    checked={additionalPatients[currentPatientIndex - 1].useSameContact}
                    onChange={(e) => updateAdditionalPatient(currentPatientIndex - 1, 'useSameContact', e.target.checked)}
                    className="mt-0.5"
                  />
                  <label htmlFor={`patient-${currentPatientIndex}-same-contact`} className="text-xs text-gray-700">
                    Use same contact information as primary patient
                  </label>
                </div>

                {/* Slot Selection */}
                <div className="space-y-2">
                  <Label htmlFor={`patient-${currentPatientIndex}-slot`} className="text-xs text-gray-600">Preferred Time Slot *</Label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      id={`patient-${currentPatientIndex}-slot`}
                      value={additionalPatients[currentPatientIndex - 1].selectedSlot}
                      onChange={(e) => updateAdditionalPatient(currentPatientIndex - 1, 'selectedSlot', e.target.value)}
                      className="w-full h-12 pl-11 pr-4 border-2 rounded-xl text-sm bg-white"
                      style={{ borderColor: '#e5e7eb' }}
                    >
                      <option value="">Choose a time slot...</option>
                      {getAvailableSlots(additionalPatients[currentPatientIndex - 1].selectedSlot).map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Provider Info */}
                {additionalPatients[currentPatientIndex - 1].selectedSlot && (
                  <div 
                    className="flex items-center gap-2 p-3 rounded-lg"
                    style={{ background: 'var(--booking-accent-light)' }}
                  >
                    <User className="w-4 h-4" style={{ color: 'var(--booking-accent)' }} />
                    <p className="text-xs" style={{ color: 'var(--booking-accent)' }}>
                      <strong>{additionalPatients[currentPatientIndex - 1].name || `Patient ${currentPatientIndex + 1}`}</strong> at {additionalPatients[currentPatientIndex - 1].selectedSlot} with {providerNames[providerId]}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Text */}
        {!canContinue() && (
          <Card className="border-2" style={{ borderColor: '#fef3c7', background: '#fffbeb' }}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700">
                  Please fill in all required fields before continuing.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Navigation */}
      <div 
        className="p-5 border-t flex items-center gap-3"
        style={{ 
          background: 'white', 
          borderColor: '#e5e7eb',
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}
      >
        <button
          onClick={handlePrevious}
          className="p-3 transition-all flex items-center justify-center"
          style={{
            background: 'transparent',
            color: '#6b7280'
          }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canContinue()}
          className="flex-1 px-6 py-3.5 rounded-xl transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: canContinue() 
              ? 'linear-gradient(135deg, var(--booking-gradient-start) 0%, var(--booking-gradient-end) 100%)'
              : '#e5e7eb',
            color: canContinue() ? 'white' : '#9ca3af'
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <span>{getButtonText()}</span>
            <ChevronRight className="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  );
}