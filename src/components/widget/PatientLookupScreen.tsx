import { useState, useEffect } from 'react';
import { CheckCircle2, User, Smartphone, Mail } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { BottomCTA } from './BottomCTA';

interface PatientLookupScreenProps {
  onContinue: () => void;
  onBack: () => void;
  patientData: {
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    verificationMethod: 'sms' | 'email';
  };
  isActive: boolean;
}

export function PatientLookupScreen({ 
  onContinue, 
  onBack, 
  patientData,
  isActive 
}: PatientLookupScreenProps) {
  const [isSearching, setIsSearching] = useState(true);
  const [patientFound, setPatientFound] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Simulate API call to lookup patient
      setIsSearching(true);
      setTimeout(() => {
        setIsSearching(false);
        setPatientFound(true);
      }, 1500);
    }
  }, [isActive]);

  // Mock patient record data (would come from API)
  const foundPatient = {
    firstName: patientData.firstName,
    lastName: patientData.lastName,
    maskedContact: patientData.verificationMethod === 'sms' 
      ? `(***) ***-${patientData.phone?.slice(-4) || '****'}`
      : `***@${patientData.email?.split('@')[1] || 'email.com'}`,
    contactType: patientData.verificationMethod,
    lastVisit: 'March 15, 2024',
    preferredProvider: 'Dr. Johnson'
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {isSearching ? (
          // Loading State
          <>
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-gray-200"></div>
                <div 
                  className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 animate-spin"
                  style={{ 
                    borderTopColor: 'var(--booking-primary)',
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent'
                  }}
                ></div>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-lg text-gray-900">Searching Records...</h2>
                <p className="text-sm text-gray-500">
                  Looking up {patientData.firstName} {patientData.lastName}
                </p>
              </div>
            </div>
          </>
        ) : (
          // Patient Found State
          <>
            {/* Success Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <h2 className="text-lg text-gray-900">Record Found!</h2>
              </div>
              <p className="text-sm text-gray-500">
                Please confirm this is your patient record
              </p>
            </div>

            {/* Patient Card */}
            <Card 
              className="border-2 shadow-sm" 
              style={{ 
                borderColor: 'var(--booking-primary)',
                background: 'var(--booking-primary-light)'
              }}
            >
              <CardContent className="p-5 space-y-4">
                {/* Patient Name */}
                <div className="flex items-start gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--booking-primary)' }}
                  >
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900">
                      {foundPatient.firstName} {foundPatient.lastName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">Patient Record</p>
                  </div>
                </div>

                {/* Patient Details */}
                <div className="space-y-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    {foundPatient.contactType === 'sms' ? (
                      <Smartphone className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Mail className="w-4 h-4 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">
                        {foundPatient.contactType === 'sms' ? 'Phone' : 'Email'}
                      </p>
                      <p className="text-sm text-gray-900">
                        {foundPatient.maskedContact}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Last Visit</p>
                      <p className="text-sm text-gray-900">{foundPatient.lastVisit}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Preferred Provider</p>
                      <p className="text-sm text-gray-900">{foundPatient.preferredProvider}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Message */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-600">
                We'll send a verification code to <span className="text-gray-900">{foundPatient.maskedContact}</span> to confirm your identity.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA - Only show when patient is found */}
      {patientFound && (
        <BottomCTA
          onContinue={onContinue}
          onBack={onBack}
          continueText="Yes, That's Me"
          continueDisabled={false}
        />
      )}
    </div>
  );
}