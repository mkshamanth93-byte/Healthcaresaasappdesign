import { useState, useEffect } from 'react';
import { CheckCircle2, User, Smartphone, Mail, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { BottomCTA } from './BottomCTA';

interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  relationship: string;
  email?: string;
  phone?: string;
}

interface PatientLookupScreenProps {
  onContinue: (data?: any) => void;
  onBack: () => void;
  patientData: {
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    verificationMethod: 'sms' | 'email';
  };
  isActive: boolean;
  hasFamilyMembers?: boolean; // NEW: Flag to indicate if patient has family
  familyMembers?: FamilyMember[]; // NEW: Family member data
}

export function PatientLookupScreen({ 
  onContinue, 
  onBack, 
  patientData,
  isActive,
  hasFamilyMembers = false,
  familyMembers = []
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

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Get relationship display text
  const getRelationshipText = (relationship: string) => {
    if (relationship === 'primary') return 'Primary Account Holder';
    return relationship.charAt(0).toUpperCase() + relationship.slice(1);
  };

  // Mock patient record data (would come from API)
  const foundPatient = {
    firstName: patientData.firstName,
    lastName: patientData.lastName,
    maskedContact: patientData.verificationMethod === 'sms' 
      ? `(***) ***-${patientData.phone?.slice(-4) || '3609'}`
      : `***@${patientData.email?.split('@')[1] || 'email.com'}`,
    contactType: patientData.verificationMethod,
    lastVisit: 'March 15, 2024',
    preferredProvider: 'Dr. Johnson'
  };

  const handleContinue = () => {
    // Pass family data forward if it exists
    if (hasFamilyMembers && familyMembers.length > 0) {
      onContinue({ 
        familyConfirmed: true,
        familyMembers: familyMembers
      });
    } else {
      onContinue();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-32">
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
                <h2 className="text-lg text-gray-900">
                  {hasFamilyMembers ? 'Account Found!' : 'Record Found!'}
                </h2>
              </div>
              <p className="text-sm text-gray-500">
                {hasFamilyMembers 
                  ? `We found your account with ${familyMembers.length} family ${familyMembers.length === 1 ? 'member' : 'members'}. Please confirm this is the correct family before proceeding.`
                  : 'Please confirm this is your patient record'
                }
              </p>
            </div>

            {/* Patient Card - Primary Account Holder */}
            <Card 
              className="border-2 shadow-sm" 
              style={{ 
                borderColor: 'var(--booking-primary)',
                background: 'var(--booking-primary-light)'
              }}
            >
              <CardContent className="p-5 space-y-4">
                {/* Patient Name with Primary Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--booking-primary)' }}
                    >
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900">
                        {foundPatient.firstName} {foundPatient.lastName} {hasFamilyMembers && '(You)'}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {hasFamilyMembers ? 'Primary Account Holder' : 'Patient Record'}
                      </p>
                    </div>
                  </div>
                  {hasFamilyMembers && (
                    <Badge 
                      className="text-xs px-3 py-1"
                      style={{ 
                        background: 'var(--booking-primary)',
                        color: 'white',
                        border: 'none'
                      }}
                    >
                      Primary
                    </Badge>
                  )}
                </div>

                {/* Patient Details */}
                <div className="space-y-3 pt-3 border-t border-gray-200">
                  {hasFamilyMembers && (
                    <div className="flex items-start gap-3">
                      <div className="w-4 h-4 mt-0.5 text-gray-400">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">DOB: 15/03/1985 • Male</p>
                      </div>
                    </div>
                  )}
                  
                  {hasFamilyMembers && patientData.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 mt-0.5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm text-gray-900">{patientData.email}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    {foundPatient.contactType === 'sms' ? (
                      <Smartphone className="w-4 h-4 mt-0.5 text-gray-400" />
                    ) : (
                      <Mail className="w-4 h-4 mt-0.5 text-gray-400" />
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

                  {!hasFamilyMembers && (
                    <>
                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 mt-0.5 rounded-full bg-gray-400"></div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Last Visit</p>
                          <p className="text-sm text-gray-900">{foundPatient.lastVisit}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-4 h-4 mt-0.5 rounded-full bg-gray-400"></div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Preferred Provider</p>
                          <p className="text-sm text-gray-900">{foundPatient.preferredProvider}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Family Members Section - NEW! */}
            {hasFamilyMembers && familyMembers.length > 0 && (
              <div className="space-y-3">
                <div>
                  <h3 className="text-gray-900">Your Family Members</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {familyMembers.length} {familyMembers.length === 1 ? 'person' : 'people'} in this account
                  </p>
                </div>

                {/* Family Member Cards - Scrollable */}
                <div className="space-y-3">
                  {familyMembers.map((member) => {
                    const isPrimary = member.relationship === 'primary';
                    
                    // Skip primary as it's shown above
                    if (isPrimary) return null;
                    
                    return (
                      <Card 
                        key={member.id}
                        className="border-2"
                        style={{
                          borderColor: '#e5e7eb',
                          background: 'white'
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {/* Patient Icon */}
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: '#f3f4f6' }}
                            >
                              <User className="w-5 h-5 text-gray-600" />
                            </div>

                            {/* Patient Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm text-gray-900">
                                {member.firstName} {member.lastName}
                              </h4>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Relationship: {getRelationshipText(member.relationship)}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                DOB: {formatDate(member.dateOfBirth)} • <span className="capitalize">{member.gender}</span>
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Help Text */}
            {hasFamilyMembers ? (
              <Card className="border-2" style={{ borderColor: '#fef3c7', background: '#fffbeb' }}>
                <CardContent className="p-4">
                  <p className="text-xs text-gray-700">
                    <strong>Not your family?</strong> Please go back and verify your information, or contact the practice for assistance.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-600">
                  We'll send a verification code to <span className="text-gray-900">{foundPatient.maskedContact}</span> to confirm your identity.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom CTA - Only show when patient is found */}
      {patientFound && (
        <BottomCTA
          onContinue={handleContinue}
          onBack={onBack}
          continueText={hasFamilyMembers ? "Yes, This Is My Family" : "Yes, That's Me"}
          continueDisabled={false}
        />
      )}
    </div>
  );
}
