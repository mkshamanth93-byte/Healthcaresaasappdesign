import { useState } from 'react';
import { Smartphone, Mail, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { BottomCTA } from './BottomCTA';

interface VerificationMethodScreenProps {
  onContinue: (data: any) => void;
  onBack: () => void;
  phone: string;
  email: string;
  isActive: boolean;
}

export function VerificationMethodScreen({ 
  onContinue, 
  onBack, 
  phone,
  email,
  isActive 
}: VerificationMethodScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<'sms' | 'email' | null>(null);

  const handleContinue = () => {
    if (selectedMethod) {
      onContinue({ 
        verificationMethod: selectedMethod,
        verificationContact: selectedMethod === 'sms' ? phone : email
      });
    }
  };

  const verificationOptions = [
    {
      id: 'sms' as const,
      title: 'Text Message (SMS)',
      description: 'Get verification code via SMS',
      contact: phone,
      icon: Smartphone,
    },
    {
      id: 'email' as const,
      title: 'Email',
      description: 'Get verification code via email',
      contact: email,
      icon: Mail,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--booking-primary-light)' }}>
              <ShieldCheck className="w-5 h-5" style={{ color: 'var(--booking-primary)' }} />
            </div>
          </div>
          <h2 className="text-lg text-gray-900">Verify Your Identity</h2>
          <p className="text-sm text-gray-500">
            Choose how you'd like to receive your verification code
          </p>
        </div>

        {/* Verification Method Options */}
        <div className="space-y-3">
          {verificationOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedMethod === option.id;
            return (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all border-2 ${
                  isSelected
                    ? 'shadow-md'
                    : 'hover:shadow-sm'
                }`}
                style={{
                  borderColor: isSelected ? 'var(--booking-primary)' : '#e5e7eb',
                  background: isSelected ? 'var(--booking-primary-light)' : 'white'
                }}
                onClick={() => setSelectedMethod(option.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isSelected ? 'var(--booking-primary)' : '#f3f4f6'
                      }}
                    >
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-gray-900 mb-0.5">{option.title}</h3>
                      <p className="text-xs text-gray-500 mb-1">{option.description}</p>
                      <p className="text-sm text-gray-900 truncate">{option.contact}</p>
                    </div>
                    {isSelected && (
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--booking-primary)' }}
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Message */}
        <div className="bg-blue-50 rounded-xl p-4 space-y-1">
          <p className="text-sm text-gray-900">🔒 Secure Verification</p>
          <p className="text-xs text-gray-600">
            We'll send a 6-digit code to confirm your contact information
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <BottomCTA
        onContinue={handleContinue}
        onBack={onBack}
        continueText="Send Code"
        continueDisabled={!selectedMethod}
      />
    </div>
  );
}