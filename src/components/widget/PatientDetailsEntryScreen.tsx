import { useState } from 'react';
import { UserSearch, Smartphone, Mail } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { BottomCTA } from './BottomCTA';
import { FloatingCloseButton } from './FloatingCloseButton';

interface PatientDetailsEntryScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  onClose: () => void;
  isActive: boolean;
  defaultVerificationMethod?: 'sms' | 'email'; // From admin settings
}

export function PatientDetailsEntryScreen({ 
  onContinue, 
  onBack,
  onClose,
  isActive,
  defaultVerificationMethod = 'sms'
}: PatientDetailsEntryScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'sms' | 'email'>(defaultVerificationMethod);

  const handleContinue = () => {
    const data = {
      firstName,
      lastName,
      verificationMethod,
      ...(verificationMethod === 'sms' ? { phone } : { email })
    };
    onContinue(data);
  };

  const isValid = firstName.trim() && 
                  lastName.trim() && 
                  (verificationMethod === 'sms' 
                    ? phone.trim().length >= 10 
                    : email.trim() && email.includes('@'));

  return (
    <div className="flex flex-col h-full relative">
      {/* Floating Close Button */}
      <FloatingCloseButton onClose={onClose} />
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'var(--booking-primary-light)' }}
            >
              <UserSearch 
                className="w-5 h-5" 
                style={{ color: 'var(--booking-primary)' }}
              />
            </div>
            <Badge 
              variant="secondary" 
              className="text-xs px-2 py-0.5"
              style={{ background: 'var(--booking-accent)', color: 'white', border: 'none' }}
            >
              Returning Patient
            </Badge>
          </div>
          <h2 className="text-lg text-gray-900">Welcome Back!</h2>
          <p className="text-sm text-gray-500">
            Let's find your patient record to make booking faster
          </p>
        </div>

        {/* Patient Info Card */}
        <Card className="border-2" style={{ borderColor: '#e5e7eb' }}>
          <CardContent className="p-5 space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm"
                  style={{
                    borderColor: firstName ? 'var(--booking-primary)' : '#e5e7eb'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--booking-primary)'}
                  onBlur={(e) => {
                    if (!firstName) e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm"
                  style={{
                    borderColor: lastName ? 'var(--booking-primary)' : '#e5e7eb'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--booking-primary)'}
                  onBlur={(e) => {
                    if (!lastName) e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>
            </div>

            {/* Verification Method Toggle */}
            <div className="space-y-3">
              <label className="block text-sm text-gray-700">
                Verify with
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setVerificationMethod('sms')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm"
                  style={{
                    background: verificationMethod === 'sms' ? 'white' : 'transparent',
                    color: verificationMethod === 'sms' ? 'var(--booking-primary)' : '#6b7280',
                    boxShadow: verificationMethod === 'sms' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <Smartphone className="w-4 h-4" />
                  SMS
                </button>
                <button
                  type="button"
                  onClick={() => setVerificationMethod('email')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all text-sm"
                  style={{
                    background: verificationMethod === 'email' ? 'white' : 'transparent',
                    color: verificationMethod === 'email' ? 'var(--booking-primary)' : '#6b7280',
                    boxShadow: verificationMethod === 'email' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              </div>
            </div>

            {/* Contact Field - Based on Verification Method */}
            {verificationMethod === 'sms' ? (
              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm"
                  style={{
                    borderColor: phone ? 'var(--booking-primary)' : '#e5e7eb'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--booking-primary)'}
                  onBlur={(e) => {
                    if (!phone) e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.smith@email.com"
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm"
                  style={{
                    borderColor: email ? 'var(--booking-primary)' : '#e5e7eb'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--booking-primary)'}
                  onBlur={(e) => {
                    if (!email) e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="rounded-xl p-4 space-y-1" style={{ background: 'var(--booking-primary-light)' }}>
          <p className="text-sm text-gray-900">💡 Quick Tip</p>
          <p className="text-xs text-gray-600">
            Make sure to use the same contact info from your previous visits
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <BottomCTA
        onContinue={handleContinue}
        onBack={onBack}
        continueText="Find My Record"
        continueDisabled={!isValid}
      />
    </div>
  );
}