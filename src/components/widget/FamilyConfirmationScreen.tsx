import { useState } from 'react';
import { Users, User, ChevronRight, CheckCircle, X } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

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

interface FamilyConfirmationScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  familyMembers: FamilyMember[];
  primaryPatient: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone?: string;
    email?: string;
  };
}

export function FamilyConfirmationScreen({
  onContinue,
  onBack,
  onClose,
  isActive,
  familyMembers,
  primaryPatient
}: FamilyConfirmationScreenProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    
    // Auto-advance after brief delay
    setTimeout(() => {
      onContinue({
        familyConfirmed: true,
        familyMembers: familyMembers
      });
    }, 300);
  };

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

  return (
    <div className="flex flex-col h-full" style={{ background: '#f8f9fa' }}>
      {/* Header with Close Button */}
      <div 
        className="px-5 py-4 border-b flex items-center justify-between"
        style={{ background: 'white', borderColor: '#e5e7eb' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--booking-primary-light)' }}
          >
            <Users className="w-5 h-5" style={{ color: 'var(--booking-primary)' }} />
          </div>
          <div>
            <h2 className="text-gray-900">Confirm Family</h2>
            <p className="text-xs text-gray-500">Verify your family members</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 pb-6">
        
        {/* Confirmation Message */}
        <Card className="border-2" style={{ borderColor: '#e0e7ff', background: '#f0f4ff' }}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-900 mb-1">Account Found!</p>
                <p className="text-xs text-gray-600">
                  We found your account with {familyMembers.length} family {familyMembers.length === 1 ? 'member' : 'members'}. 
                  Please confirm this is the correct family before proceeding.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Members List */}
        <div className="space-y-3">
          <div>
            <h3 className="text-gray-900 mb-1">Your Family Members</h3>
            <p className="text-xs text-gray-500">
              {familyMembers.length} {familyMembers.length === 1 ? 'person' : 'people'} in this account
            </p>
          </div>

          <div className="space-y-3">
            {familyMembers.map((member, index) => {
              const isPrimary = member.relationship === 'primary';
              
              return (
                <Card 
                  key={member.id}
                  className="border-2"
                  style={{
                    borderColor: isPrimary ? 'var(--booking-primary)' : '#e5e7eb',
                    background: 'white'
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Patient Icon */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isPrimary ? 'var(--booking-primary)' : '#f3f4f6'
                        }}
                      >
                        <User className={`w-6 h-6 ${isPrimary ? 'text-white' : 'text-gray-600'}`} />
                      </div>

                      {/* Patient Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm text-gray-900 mb-1">
                          {member.firstName} {member.lastName}
                          {isPrimary && <span className="text-gray-500"> (You)</span>}
                        </h4>
                        
                        <div className="space-y-1">
                          <p className="text-xs text-gray-600">
                            <span className="text-gray-500">Relationship:</span> {getRelationshipText(member.relationship)}
                          </p>
                          <p className="text-xs text-gray-600">
                            <span className="text-gray-500">DOB:</span> {formatDate(member.dateOfBirth)} • <span className="capitalize">{member.gender}</span>
                          </p>
                          {isPrimary && member.email && (
                            <p className="text-xs text-gray-600">
                              <span className="text-gray-500">Email:</span> {member.email}
                            </p>
                          )}
                          {isPrimary && member.phone && (
                            <p className="text-xs text-gray-600">
                              <span className="text-gray-500">Phone:</span> {member.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Primary Badge */}
                      {isPrimary && (
                        <div 
                          className="px-3 py-1 rounded-full text-xs"
                          style={{ 
                            background: 'var(--booking-primary-light)',
                            color: 'var(--booking-primary)'
                          }}
                        >
                          Primary
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Help Text */}
        <Card className="border-2" style={{ borderColor: '#fef3c7', background: '#fffbeb' }}>
          <CardContent className="p-4">
            <p className="text-xs text-gray-700">
              <strong>Not your family?</strong> Please go back and verify your information, or contact the practice for assistance.
            </p>
          </CardContent>
        </Card>
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
          onClick={onBack}
          className="px-6 py-3.5 rounded-xl border-2 transition-all"
          style={{
            borderColor: '#e5e7eb',
            background: 'white',
            color: '#6b7280'
          }}
        >
          Go Back
        </button>
        
        <button
          onClick={handleConfirm}
          disabled={isConfirming}
          className="flex-1 px-6 py-3.5 rounded-xl transition-all shadow-sm disabled:opacity-50"
          style={{
            background: isConfirming 
              ? '#10b981'
              : 'linear-gradient(135deg, var(--booking-gradient-start) 0%, var(--booking-gradient-end) 100%)',
            color: 'white'
          }}
        >
          <span className="flex items-center justify-center gap-2">
            {isConfirming ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Confirmed!</span>
              </>
            ) : (
              <>
                <span>Yes, This Is My Family</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
