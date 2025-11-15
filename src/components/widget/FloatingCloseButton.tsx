import { X } from 'lucide-react';

interface FloatingCloseButtonProps {
  onClose: () => void;
}

export function FloatingCloseButton({ onClose }: FloatingCloseButtonProps) {
  return (
    <div className="absolute top-4 right-5 z-50">
      <button
        onClick={onClose}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
        aria-label="Close"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
