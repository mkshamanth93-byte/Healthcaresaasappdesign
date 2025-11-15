// Damira Dental Theme Colors
// This utility provides centralized color theming for the booking widget

export const themeColors = {
  // Primary brand colors
  primary: 'var(--booking-primary)', // #7A2C7F
  primaryHover: 'var(--booking-primary-hover)', // #5F1E63  
  primaryLight: 'var(--booking-primary-light)', // #F3E8F4
  
  // Legacy support - maps old blue colors to new purple
  legacy: {
    blue: 'var(--booking-primary)',
    blueHover: 'var(--booking-primary-hover)',
    blueLight: 'var(--booking-primary-light)',
  }
};

// Utility classes for inline styles
export const getThemeStyle = {
  // Background styles
  bgPrimary: { background: 'var(--booking-primary)' },
  bgPrimaryLight: { background: 'var(--booking-primary-light)' },
  bgPrimaryHover: { background: 'var(--booking-primary-hover)' },
  
  // Border styles
  borderPrimary: { borderColor: 'var(--booking-primary)' },
  border2Primary: { borderColor: 'var(--booking-primary)', borderWidth: '2px' },
  
  // Text styles
  textPrimary: { color: 'var(--booking-primary)' },
  
  // Combined styles
  selectedCard: {
    borderColor: 'var(--booking-primary)',
    background: 'var(--booking-primary-light)',
    borderWidth: '2px'
  },
  
  focusInput: {
    borderColor: 'var(--booking-primary)',
    outlineColor: 'var(--booking-primary)'
  }
};
