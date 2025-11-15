import { useState, useRef, useEffect } from 'react';
import { Shield, RotateCcw } from 'lucide-react';
import { BottomCTA } from './BottomCTA';

interface PhoneVerificationScreenProps {
  onContinue: () => void;
  onBack: () => void;
  phoneNumber: string;
  isActive: boolean;
}

export function PhoneVerificationScreen({ 
  onContinue, 
  onBack, 
  phoneNumber,
  isActive 
}: PhoneVerificationScreenProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Start countdown when component mounts
  useEffect(() => {
    if (isActive) {
      setCountdown(30);
    }
  }, [isActive]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }
    
    setCode(newCode);
    
    // Focus the next empty input or last input
    const nextEmptyIndex = newCode.findIndex(c => !c);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsResending(false);
    setCountdown(30);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const isCodeComplete = code.every(digit => digit !== '');

  const handleContinue = () => {
    if (isCodeComplete) {
      // In production, verify the code with backend here
      onContinue();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-lg text-gray-900">Verify Your Phone</h2>
          <p className="text-sm text-gray-500">
            We sent a 6-digit code to <span className="text-gray-900">{phoneNumber}</span>
          </p>
        </div>

        {/* Verification Icon */}
        <div className="flex justify-center py-4">
          <div 
            className="w-20 h-20 rounded-full border-4 flex items-center justify-center"
            style={{ borderColor: 'var(--booking-primary)' }}
          >
            <Shield 
              className="w-10 h-10" 
              style={{ color: 'var(--booking-primary)' }}
              strokeWidth={2}
            />
          </div>
        </div>

        {/* Code Input */}
        <div className="space-y-4">
          <label className="block text-sm text-gray-700">
            Enter verification code
          </label>
          <div className="flex gap-2 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 text-center border-2 rounded-xl focus:outline-none transition-colors"
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  borderColor: digit ? 'var(--booking-primary)' : '#e5e7eb'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--booking-primary)';
                }}
                onBlur={(e) => {
                  if (!digit) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Resend Code */}
        <div className="flex items-center justify-center">
          {countdown > 0 ? (
            <p className="text-sm text-gray-500">
              Resend code in <span className="text-gray-900">{countdown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="flex items-center gap-2 text-sm transition-colors disabled:opacity-50"
              style={{ color: 'var(--booking-primary)' }}
              onMouseEnter={(e) => {
                if (!isResending) e.currentTarget.style.color = 'var(--booking-primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--booking-primary)';
              }}
            >
              <RotateCcw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <p className="text-sm text-gray-900">Didn't receive the code?</p>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Check your phone for text messages</li>
            <li>Make sure your phone number is correct</li>
            <li>Wait a minute before requesting a new code</li>
          </ul>
        </div>
      </div>

      {/* Bottom CTA */}
      <BottomCTA
        onContinue={handleContinue}
        onBack={onBack}
        continueText="Verify & Continue"
        continueDisabled={!isCodeComplete}
      />
    </div>
  );
}