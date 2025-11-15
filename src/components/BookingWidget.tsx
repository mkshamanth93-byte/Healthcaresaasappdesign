import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CalendarCheck } from 'lucide-react';
import { CloseConfirmationDialog } from './widget/CloseConfirmationDialog';

// Screen Imports
import { WelcomeScreen } from './widget/WelcomeScreen';
import { LocationScreen } from './widget/LocationScreen';
import { ReasonCategoryScreen } from './widget/ReasonCategoryScreen';
import { ReasonDetailScreen } from './widget/ReasonDetailScreen';
import { ProviderScreen } from './widget/ProviderScreen';
import { DateTimeScreen } from './widget/DateTimeScreen';
import { PatientInfoScreen } from './widget/PatientInfoScreen';
import { VerificationMethodScreen } from './widget/VerificationMethodScreen';
import { PhoneVerificationScreen } from './widget/PhoneVerificationScreen';
import { PaymentScreen } from './widget/PaymentScreen';
import { ConfirmationScreen } from './widget/ConfirmationScreen';
import { PatientDetailsEntryScreen } from './widget/PatientDetailsEntryScreen';
import { PatientLookupScreen } from './widget/PatientLookupScreen';
import { ExamProviderScreen } from './widget/ExamProviderScreen';
import { HygieneProviderScreen } from './widget/HygieneProviderScreen';
import { ComboSlotSelectionScreen } from './widget/ComboSlotSelectionScreen';
import { ReturningExamProviderScreen } from './widget/ReturningExamProviderScreen';
import { ReturningHygieneProviderScreen } from './widget/ReturningHygieneProviderScreen';
import { FamilySetupScreen } from './widget/FamilySetupScreen';
import { FamilyProviderScreen } from './widget/FamilyProviderScreen';
import { FamilySlotSelectionScreen } from './widget/FamilySlotSelectionScreen';
import { FamilyContactInfoScreen } from './widget/FamilyContactInfoScreen';
import { SingleAppointmentSlotScreen } from './widget/SingleAppointmentSlotScreen';
import { ReturningProviderScreen } from './widget/ReturningProviderScreen';
import { ReturningFamilySetupScreen } from './widget/ReturningFamilySetupScreen';
import { ReturningFamilyProviderScreen } from './widget/ReturningFamilyProviderScreen';

interface BookingWidgetProps {
  externalIsOpen?: boolean;
  onExternalClose?: () => void;
}

export function BookingWidget({ externalIsOpen, onExternalClose }: BookingWidgetProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<any>({});
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  // Sync external state
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  const nextStep = (data?: any) => {
    if (data) {
      setBookingData({ ...bookingData, ...data });
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const closeWidget = () => {
    setIsOpen(false);
    setShowCloseConfirm(false);
    setTimeout(() => {
      setCurrentStep(1);
      setBookingData({});
    }, 300);
    if (onExternalClose) {
      onExternalClose();
    }
  };

  const handleCloseClick = () => {
    // Don't show confirmation on Welcome screen or Confirmation screen
    const isConfirmationScreen = 
      (isComboFlow && currentStep === 10) ||  // Both combo flows now end at step 10
      (!isComboFlow && !isFamilyFlow && currentStep === 11) ||  // Both single flows end at step 11
      (isFamilyFlow && currentStep === 10);  // All family flows end at step 10
    
    if (currentStep === 1 || isConfirmationScreen) {
      closeWidget();
    } else {
      setShowCloseConfirm(true);
    }
  };

  // Determine flow type
  const isComboFlow = bookingData.appointmentPath === 'combo';
  const isFamilyFlow = bookingData.appointmentPath === 'family';
  const isReturningPatient = bookingData.patientType === 'returning';

  // Calculate total steps and progress
  const getTotalSteps = () => {
    if (isComboFlow) return 10;  // Combo flows now have 10 steps (removed Category screen)
    if (isFamilyFlow) return 10;  // All family flows have 10 steps
    return 11;  // Both single flows have 11 steps
  };

  const totalSteps = getTotalSteps();
  const completionPercentage = Math.round((currentStep / totalSteps) * 100);

  // Show summary in top bar after location selection
  const showSummary = currentStep > (isReturningPatient ? 5 : 2) && currentStep < totalSteps;

  const getSummaryText = () => {
    const parts: string[] = [];
    
    // Location
    if (bookingData.location) {
      const locationNames: Record<string, string> = {
        'downtown': 'Downtown',
        'westside': 'Westside',
        'eastside': 'Eastside'
      };
      parts.push(locationNames[bookingData.location]);
    }
    
    // Procedure or Combo type
    if (isComboFlow) {
      parts.push('Exam + Hygiene');
    } else if (bookingData.procedure) {
      parts.push(bookingData.procedure);
    }
    
    // Provider
    if (bookingData.comboProviders?.examProvider && bookingData.comboProviders?.hygieneProvider) {
      const providerNames: Record<string, string> = {
        'johnson': 'Dr. Johnson',
        'roberts': 'Dr. Roberts',
        'chen': 'Dr. Chen',
        'williams': 'Sarah Williams',
        'davis': 'Mike Davis',
        'taylor': 'Emily Taylor'
      };
      parts.push(`${providerNames[bookingData.comboProviders.examProvider]} + ${providerNames[bookingData.comboProviders.hygieneProvider]}`);
    } else if (bookingData.provider) {
      const providerNames: Record<string, string> = {
        'johnson': 'Dr. Johnson',
        'roberts': 'Dr. Roberts',
        'chen': 'Dr. Chen'
      };
      parts.push(providerNames[bookingData.provider]);
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

  // FLOW MAPPING REFERENCE
  /*
   * NEW PATIENT SINGLE (11 steps):
   * 1. Welcome
   * 2. Location ← MOVED UP
   * 3. Category
   * 4. Procedure
   * 5. Provider
   * 6. DateTime
   * 7. PatientInfo
   * 8. VerificationMethod
   * 9. PhoneVerification
   * 10. Payment
   * 11. Confirmation
   *
   * RETURNING PATIENT SINGLE (11 steps):
   * 1. Welcome
   * 2. PatientDetailsEntry
   * 3. PatientLookup
   * 4. PhoneVerification
   * 5. Location ← MOVED UP
   * 6. Category
   * 7. Procedure
   * 8. Provider
   * 9. DateTime
   * 10. Payment
   * 11. Confirmation
   *
   * NEW PATIENT COMBO (10 steps):
   * 1. Welcome
   * 2. Location
   * 3. ExamProvider (NO Category for Combo - goes directly to providers)
   * 4. HygieneProvider
   * 5. ComboDateTime
   * 6. PatientInfo
   * 7. VerificationMethod
   * 8. PhoneVerification
   * 9. Payment
   * 10. Confirmation
   *
   * RETURNING PATIENT COMBO (10 steps):
   * 1. Welcome
   * 2. PatientDetailsEntry
   * 3. PatientLookup
   * 4. PhoneVerification
   * 5. Location
   * 6. ExamProvider (NO Category for Combo - goes directly to providers)
   * 7. HygieneProvider
   * 8. ComboDateTime
   * 9. Payment
   * 10. Confirmation
   * 
   * FAMILY FLOWS (10 steps):
   * 1. Welcome
   * 2. FamilySetup
   * 3. Location
   * 4. FamilyProvider
   * 5. FamilySlotSelection
   * 6. FamilyContactInfo
   * 7. VerificationMethod
   * 8. PhoneVerification
   * 9. Payment
   * 10. Confirmation
   */

  const renderStep = () => {
    // =====================================================
    // STEP 1: Welcome (ALL FLOWS)
    // =====================================================
    if (currentStep === 1) {
      return (
        <WelcomeScreen 
          onContinue={nextStep}
          onClose={closeWidget}
          isActive={currentStep === 1}
        />
      );
    }

    // =====================================================
    // NEW PATIENT SINGLE FLOW (11 steps)
    // =====================================================
    if (!isReturningPatient && !isComboFlow && !isFamilyFlow) {
      if (currentStep === 2) {
        return (
          <LocationScreen 
            onContinue={nextStep} 
            onBack={prevStep} 
            onClose={handleCloseClick}
            isActive={true} 
            flow="single"
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 3) {
        return (
          <ReasonCategoryScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true}
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 4) {
        return (
          <ReasonDetailScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            category={bookingData.category} 
            isActive={true}
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 5) {
        return (
          <ProviderScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true} 
            isReturningPatient={false}
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 6) {
        return (
          <SingleAppointmentSlotScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true}
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 7) {
        return (
          <PatientInfoScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isNewPatient={true} 
            appointmentPath="single" 
            familyMembers={[]} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 8) {
        return (
          <VerificationMethodScreen 
            onContinue={nextStep} 
            onBack={prevStep} 
            phone={bookingData.phone || ''} 
            email={bookingData.email || ''} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 9) {
        return (
          <PhoneVerificationScreen 
            onContinue={nextStep} 
            onBack={prevStep} 
            phoneNumber={bookingData.verificationContact || bookingData.phone || ''} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 10) {
        return (
          <PaymentScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            bookingData={bookingData} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 11) {
        return (
          <ConfirmationScreen 
            bookingData={bookingData} 
            onClose={closeWidget} 
          />
        );
      }
    }

    // =====================================================
    // RETURNING PATIENT SINGLE FLOW (11 steps)
    // =====================================================
    if (isReturningPatient && !isComboFlow && !isFamilyFlow) {
      if (currentStep === 2) {
        return (
          <PatientDetailsEntryScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={closeWidget}
            isActive={true} 
            defaultVerificationMethod="sms" 
          />
        );
      }
      if (currentStep === 3) {
        return (
          <PatientLookupScreen 
            onContinue={nextStep}
            onBack={prevStep}
            patientData={{
              firstName: bookingData.firstName || '',
              lastName: bookingData.lastName || '',
              phone: bookingData.phone,
              email: bookingData.email,
              verificationMethod: bookingData.verificationMethod || 'sms'
            }}
            isActive={true}
          />
        );
      }
      if (currentStep === 4) {
        return (
          <PhoneVerificationScreen 
            onContinue={nextStep} 
            onBack={prevStep} 
            phoneNumber={bookingData.phone || bookingData.email || ''} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 5) {
        return (
          <LocationScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true} 
            flow="single"
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 6) {
        return (
          <ReasonCategoryScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true}
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 7) {
        return (
          <ReasonDetailScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            category={bookingData.category} 
            isActive={true}
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 8) {
        return (
          <ReturningProviderScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true}
            usualProviderId="johnson"
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 9) {
        return (
          <SingleAppointmentSlotScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true}
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 10) {
        return (
          <PaymentScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            bookingData={bookingData} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 11) {
        return (
          <ConfirmationScreen 
            bookingData={bookingData} 
            onClose={closeWidget} 
          />
        );
      }
    }

    // =====================================================
    // NEW PATIENT COMBO FLOW (10 steps)
    // =====================================================
    if (!isReturningPatient && isComboFlow && !isFamilyFlow) {
      if (currentStep === 2) {
        return (
          <LocationScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true} 
            flow="combo"
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 3) {
        return (
          <ExamProviderScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true}
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 4) {
        return (
          <HygieneProviderScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            examProvider={bookingData.examProvider || ''} 
            isActive={true}
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 5) {
        return (
          <ComboSlotSelectionScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true}
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 6) {
        return (
          <PatientInfoScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isNewPatient={true} 
            appointmentPath="combo" 
            familyMembers={[]} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 7) {
        return (
          <VerificationMethodScreen 
            onContinue={nextStep} 
            onBack={prevStep} 
            phone={bookingData.phone || ''} 
            email={bookingData.email || ''} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 8) {
        return (
          <PhoneVerificationScreen 
            onContinue={nextStep} 
            onBack={prevStep} 
            phoneNumber={bookingData.verificationContact || bookingData.phone || ''} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 9) {
        return (
          <PaymentScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            bookingData={bookingData} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 10) {
        return (
          <ConfirmationScreen 
            bookingData={bookingData} 
            onClose={closeWidget} 
          />
        );
      }
    }

    // =====================================================
    // RETURNING PATIENT COMBO FLOW (10 steps)
    // =====================================================
    if (isReturningPatient && isComboFlow && !isFamilyFlow) {
      if (currentStep === 2) {
        return (
          <PatientDetailsEntryScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={closeWidget}
            isActive={true} 
            defaultVerificationMethod="sms" 
          />
        );
      }
      if (currentStep === 3) {
        return (
          <PatientLookupScreen 
            onContinue={nextStep}
            onBack={prevStep}
            patientData={{
              firstName: bookingData.firstName || '',
              lastName: bookingData.lastName || '',
              phone: bookingData.phone,
              email: bookingData.email,
              verificationMethod: bookingData.verificationMethod || 'sms'
            }}
            isActive={true}
          />
        );
      }
      if (currentStep === 4) {
        return (
          <PhoneVerificationScreen 
            onContinue={nextStep} 
            onBack={prevStep} 
            phoneNumber={bookingData.phone || bookingData.email || ''} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 5) {
        return (
          <LocationScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true} 
            flow="combo"
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 6) {
        return (
          <ReturningExamProviderScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true}
            usualProviderId="johnson"
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 7) {
        return (
          <ReturningHygieneProviderScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            examProvider={bookingData.examProvider || ''} 
            isActive={true}
            usualHygienistId="williams"
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 8) {
        return (
          <ComboSlotSelectionScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            isActive={true}
            bookingData={bookingData}
            isComboFlow={isComboFlow}
          />
        );
      }
      if (currentStep === 9) {
        return (
          <PaymentScreen 
            onContinue={nextStep} 
            onBack={prevStep}
            onClose={handleCloseClick}
            bookingData={bookingData} 
            isActive={true} 
          />
        );
      }
      if (currentStep === 10) {
        return (
          <ConfirmationScreen 
            bookingData={bookingData} 
            onClose={closeWidget} 
          />
        );
      }
    }

    // =====================================================
    // FAMILY FLOWS (10 steps)
    // =====================================================
    if (isFamilyFlow) {
      // NEW PATIENT FAMILY FLOW
      if (!isReturningPatient) {
        if (currentStep === 2) {
          return (
            <FamilySetupScreen 
              onContinue={nextStep} 
              onBack={prevStep} 
              onClose={handleCloseClick}
              isActive={true} 
            />
          );
        }
        if (currentStep === 3) {
          return (
            <LocationScreen 
              onContinue={nextStep} 
              onBack={prevStep}
              onClose={handleCloseClick}
              isActive={true} 
              flow="family"
              bookingData={bookingData}
              isComboFlow={isComboFlow}
            />
          );
        }
        if (currentStep === 4) {
          return (
            <FamilyProviderScreen 
              onContinue={nextStep} 
              onBack={prevStep} 
              onClose={handleCloseClick}
              isActive={true}
              appointmentType={bookingData.familyAppointmentType}
              patientCount={bookingData.familyPatientCount}
              location={bookingData.location}
              bookingData={bookingData}
            />
          );
        }
        if (currentStep === 5) {
          return (
            <FamilySlotSelectionScreen 
              onContinue={nextStep} 
              onBack={prevStep}
              onClose={handleCloseClick}
              isActive={true}
              appointmentType={bookingData.familyAppointmentType}
              patientCount={bookingData.familyPatientCount}
              location={bookingData.location}
              providerId={bookingData.familyProvider}
              bookingData={bookingData}
            />
          );
        }
        if (currentStep === 6) {
          return (
            <FamilyContactInfoScreen 
              onContinue={nextStep} 
              onBack={prevStep} 
              isActive={true}
              appointmentType={bookingData.familyAppointmentType}
              familyPatientCount={bookingData.familyPatientCount}
              selectedTimeSlots={bookingData.selectedTimeSlots || []}
              selectedDate={bookingData.selectedDate || ''}
              location={bookingData.location}
              providerId={bookingData.familyProvider}
              familyBookingFor={bookingData.familyBookingFor}
            />
          );
        }
        if (currentStep === 7) {
          return (
            <VerificationMethodScreen 
              onContinue={nextStep} 
              onBack={prevStep} 
              phone={bookingData.familyContactInfo?.primaryPatient?.phone || ''} 
              email={bookingData.familyContactInfo?.primaryPatient?.email || ''} 
              isActive={true} 
            />
          );
        }
        if (currentStep === 8) {
          return (
            <PhoneVerificationScreen 
              onContinue={nextStep} 
              onBack={prevStep} 
              phoneNumber={bookingData.verificationContact || bookingData.familyContactInfo?.primaryPatient?.phone || bookingData.familyContactInfo?.primaryPatient?.email || ''} 
              isActive={true} 
            />
          );
        }
        if (currentStep === 9) {
          return (
            <PaymentScreen 
              onContinue={nextStep} 
              onBack={prevStep}
              onClose={handleCloseClick}
              bookingData={bookingData} 
              isActive={true} 
            />
          );
        }
        if (currentStep === 10) {
          return (
            <FamilyConfirmationScreen 
              bookingData={bookingData} 
              onClose={closeWidget} 
            />
          );
        }
      }
      
      // RETURNING PATIENT FAMILY FLOW (10 steps)
      if (isReturningPatient) {
        if (currentStep === 2) {
          return (
            <PatientDetailsEntryScreen 
              onContinue={nextStep} 
              onBack={prevStep}
              onClose={closeWidget}
              isActive={true} 
              defaultVerificationMethod="sms" 
            />
          );
        }
        if (currentStep === 3) {
          // Combined Patient Lookup + Family Confirmation (if family exists)
          return (
            <PatientLookupScreen 
              onContinue={nextStep}
              onBack={prevStep}
              patientData={{
                firstName: bookingData.firstName || '',
                lastName: bookingData.lastName || '',
                phone: bookingData.phone,
                email: bookingData.email,
                verificationMethod: bookingData.verificationMethod || 'sms'
              }}
              isActive={true}
              hasFamilyMembers={true}
              familyMembers={[
                {
                  id: 'p1',
                  firstName: bookingData.firstName || 'John',
                  lastName: bookingData.lastName || 'Smith',
                  dateOfBirth: '1985-03-15',
                  gender: 'male',
                  relationship: 'primary',
                  email: bookingData.email || 'john.smith@email.com',
                  phone: bookingData.phone || '+44 7700 900000'
                },
                {
                  id: 'p2',
                  firstName: 'Sarah',
                  lastName: 'Smith',
                  dateOfBirth: '1987-07-22',
                  gender: 'female',
                  relationship: 'spouse'
                },
                {
                  id: 'p3',
                  firstName: 'Emma',
                  lastName: 'Smith',
                  dateOfBirth: '2015-05-10',
                  gender: 'female',
                  relationship: 'child'
                },
                {
                  id: 'p4',
                  firstName: 'Jack',
                  lastName: 'Smith',
                  dateOfBirth: '2017-11-03',
                  gender: 'male',
                  relationship: 'child'
                }
              ]}
            />
          );
        }
        if (currentStep === 4) {
          return (
            <PhoneVerificationScreen 
              onContinue={nextStep} 
              onBack={prevStep} 
              phoneNumber={bookingData.phone || bookingData.email || ''} 
              isActive={true} 
            />
          );
        }
        if (currentStep === 5) {
          return (
            <ReturningFamilySetupScreen 
              onContinue={nextStep} 
              onBack={prevStep} 
              onClose={handleCloseClick}
              isActive={true}
              familyMembers={bookingData.familyMembers || [
                {
                  id: 'p1',
                  firstName: bookingData.firstName || 'John',
                  lastName: bookingData.lastName || 'Smith',
                  dateOfBirth: '1985-03-15',
                  gender: 'male',
                  relationship: 'primary',
                  email: bookingData.email || 'john.smith@email.com',
                  phone: bookingData.phone || '+44 7700 900000'
                },
                {
                  id: 'p2',
                  firstName: 'Sarah',
                  lastName: 'Smith',
                  dateOfBirth: '1987-07-22',
                  gender: 'female',
                  relationship: 'spouse'
                },
                {
                  id: 'p3',
                  firstName: 'Emma',
                  lastName: 'Smith',
                  dateOfBirth: '2015-05-10',
                  gender: 'female',
                  relationship: 'child'
                },
                {
                  id: 'p4',
                  firstName: 'Jack',
                  lastName: 'Smith',
                  dateOfBirth: '2017-11-03',
                  gender: 'male',
                  relationship: 'child'
                }
              ]}
            />
          );
        }
        if (currentStep === 6) {
          return (
            <LocationScreen 
              onContinue={nextStep} 
              onBack={prevStep}
              onClose={handleCloseClick}
              isActive={true} 
              flow="family"
              bookingData={bookingData}
              isComboFlow={isComboFlow}
            />
          );
        }
        if (currentStep === 7) {
          return (
            <ReturningFamilyProviderScreen 
              onContinue={nextStep} 
              onBack={prevStep} 
              onClose={handleCloseClick}
              isActive={true}
              appointmentType={bookingData.familyAppointmentType}
              patientCount={bookingData.familyPatientCount}
              location={bookingData.location}
              bookingData={bookingData}
              usualProviderId="johnson"
              selectedPatients={bookingData.familyMembers || []}
            />
          );
        }
        if (currentStep === 8) {
          return (
            <FamilySlotSelectionScreen 
              onContinue={nextStep} 
              onBack={prevStep}
              onClose={handleCloseClick}
              isActive={true}
              appointmentType={bookingData.familyAppointmentType}
              patientCount={bookingData.familyPatientCount}
              location={bookingData.location}
              providerId={bookingData.familyProvider}
              bookingData={bookingData}
            />
          );
        }
        if (currentStep === 9) {
          return (
            <PaymentScreen 
              onContinue={nextStep} 
              onBack={prevStep}
              onClose={handleCloseClick}
              bookingData={bookingData} 
              isActive={true} 
            />
          );
        }
        if (currentStep === 10) {
          return (
            <ConfirmationScreen 
              bookingData={bookingData} 
              onClose={closeWidget} 
            />
          );
        }
      }
    }

    return null;
  };

  return (
    <>
      {/* Floating Button - Transforms into Close Button */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.button
            key="book-button"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-0 shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--booking-button-gold) 0%, var(--booking-button-gold-hover) 100%)',
              borderRadius: '100px',
            }}
          >
            <span className="pl-6 pr-4 py-4 text-white">Book Appointment</span>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 text-gray-800" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-in Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay - Greys out the background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100]"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.4)'
              }}
              onClick={() => handleCloseClick()}
            />

            {/* Right-side Panel - Stops above X button */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-2 left-2 right-2 bottom-2 md:top-4 md:right-4 md:bottom-4 md:left-auto md:w-[448px] z-[101] flex flex-col shadow-2xl bg-white rounded-2xl overflow-hidden"
            >
              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="h-full">
                  {renderStep()}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Close Confirmation Dialog */}
      <CloseConfirmationDialog
        isOpen={showCloseConfirm}
        onClose={() => setShowCloseConfirm(false)}
        onConfirm={closeWidget}
        currentStep={currentStep}
        totalSteps={totalSteps}
        completionPercentage={completionPercentage}
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}