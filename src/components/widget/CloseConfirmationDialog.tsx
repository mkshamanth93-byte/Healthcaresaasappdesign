import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CloseConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentStep: number;
  totalSteps: number;
  completionPercentage: number;
}

export function CloseConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  currentStep,
  totalSteps,
  completionPercentage,
}: CloseConfirmationDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999]"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden">
              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Header */}
                <div className="space-y-2">
                  <h3 className="text-xl text-gray-900">Leave booking?</h3>
                  <p className="text-sm text-gray-500">
                    You're {completionPercentage}% through your appointment booking
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Step {currentStep} of {totalSteps}</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(135deg, var(--booking-primary) 0%, var(--booking-primary-hover) 100%)' }}
                    />
                  </div>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-600">
                  Your progress will be lost if you leave now. Would you like to continue booking?
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 p-6 pt-0">
                <button
                  onClick={onConfirm}
                  className="px-4 py-3 text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Leave
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-3 text-sm text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, var(--booking-primary) 0%, var(--booking-primary-hover) 100%)' }}
                >
                  Continue Booking
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}