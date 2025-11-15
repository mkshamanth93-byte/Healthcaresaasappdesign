import { ChevronRight, ChevronLeft, Lock } from 'lucide-react';

interface BottomCTAProps {
  onContinue: () => void;
  onBack?: () => void;
  continueText?: string;
  continueDisabled?: boolean;
  showLockIcon?: boolean;
  depositAmount?: number;
}

export function BottomCTA({ 
  onContinue, 
  onBack, 
  continueText = 'Continue to Next Steps',
  continueDisabled = false,
  showLockIcon = false,
  depositAmount
}: BottomCTAProps) {
  return (
    <div className="flex-shrink-0 px-5 py-5">
      <div className="flex items-center gap-3">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-3 rounded-2xl text-gray-700 hover:bg-white/60 transition-all border border-white/40 bg-white/90"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        
        {/* Continue Button */}
        <button
          onClick={onContinue}
          disabled={continueDisabled}
          className={`flex-1 px-6 py-3 rounded-2xl transition-all ${
            continueDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'text-white shadow-sm'
          }`}
          style={{
            background: continueDisabled ? undefined : 'linear-gradient(135deg, var(--booking-primary) 0%, var(--booking-primary-hover) 100%)'
          }}
        >
          <span className="flex items-center justify-center gap-2">
            {showLockIcon && <Lock className="w-5 h-5" />}
            <span>{depositAmount ? `Pay £${depositAmount}` : continueText}</span>
            {!showLockIcon && <ChevronRight className="w-5 h-5" />}
          </span>
        </button>
      </div>
    </div>
  );
}