# 🎨 Damira Dental Branding System

## Current Theme: Purple & Gold

### Color Variables (Located in `/styles/globals.css`)

```css
--booking-primary: #7A2C7F;           /* Damira Purple - Main brand color */
--booking-primary-hover: #5F1E63;     /* Darker purple for hovers */
--booking-primary-light: #F3E8F4;     /* Light purple for backgrounds */

--booking-secondary: #C9A961;         /* Gold - For hygienist in combo */
--booking-secondary-hover: #9B7E4A;   /* Darker gold for hovers */
--booking-secondary-light: #F5EFE0;   /* Light gold for backgrounds */
```

## 🔄 How to Change Branding Colors

### Quick Rebrand (5 minutes):

1. **Open `/styles/globals.css`**
2. **Find the `:root` section** (around line 43)
3. **Update these 6 color values:**
   - `--booking-primary`: Your main brand color
   - `--booking-primary-hover`: Slightly darker shade
   - `--booking-primary-light`: Very light tint for backgrounds
   - `--booking-secondary`: Your secondary/accent color
   - `--booking-secondary-hover`: Slightly darker shade  
   - `--booking-secondary-light`: Very light tint for backgrounds

4. **Save the file** - All colors update automatically!

### Example: Switching to Blue & Orange

```css
/* In /styles/globals.css */
:root {
  --booking-primary: #0066CC;        /* Blue */
  --booking-primary-hover: #0052A3;  
  --booking-primary-light: #E6F2FF;  
  
  --booking-secondary: #FF6B35;      /* Orange */
  --booking-secondary-hover: #E55A2B;
  --booking-secondary-light: #FFE8E0;
}
```

## 📍 Where Colors Are Used

### Purple (Primary) - Used For:
- ✅ Selected locations
- ✅ Selected providers (single/exam)
- ✅ Selected dates and time slots
- ✅ Form input focus states
- ✅ Primary CTA buttons
- ✅ Checkmarks and selected indicators
- ✅ Links and accent text
- ✅ Progress indicators
- ✅ Icon backgrounds
- ✅ Loading spinners

### Gold (Secondary) - Used For:
- ✅ Hygienist selection in Combo flow
- ✅ Hygienist time slots in Combo flow
- ✅ Hygienist appointment cards in confirmation

## 🏗️ Technical Architecture

### CSS Variables Approach
All colors use CSS variables (`var(--booking-primary)`) instead of hardcoded hex values. This means:
- ✅ Change colors in ONE place
- ✅ Instant updates across entire app
- ✅ No code recompilation needed
- ✅ Easy A/B testing of color schemes

### Inline Styles Pattern
Most color styling uses inline React styles:
```tsx
style={{ background: 'var(--booking-primary)' }}
style={{ color: 'var(--booking-primary)' }}
style={{ borderColor: 'var(--booking-primary)' }}
```

This ensures CSS variable values are used dynamically.

## 📦 Components Using Brand Colors

### Fully Branded (Purple/Gold system):
- ✅ LocationScreen
- ✅ ProviderScreen  
- ✅ ComboProviderScreen (Purple for Exam, Gold for Hygienist)
- ✅ VerificationMethodScreen
- ✅ PatientLookupScreen
- ✅ BottomCTA (Continue buttons)
- ✅ CloseConfirmationDialog
- ✅ ConfirmationScreen

### Partially Branded (Need updates):
- ⚠️ DateTimeScreen - Selected dates and time slots
- ⚠️ ComboDateTimeScreen - Dual color system for slots
- ⚠️ PatientInfoScreen - Form inputs, links
- ⚠️ PaymentScreen - Selected payment methods
- ⚠️ ReasonDetailScreen - Procedure badges and selected states
- ⚠️ PhoneVerificationScreen - Input focus states
- ⚠️ PatientDetailsEntryScreen - SMS/Email toggle

## 🎯 Future Improvements

To make branding even easier:

1. **Create theme presets**:
   ```ts
   const DAMIRA_THEME = { primary: '#7A2C7F', secondary: '#C9A961' };
   const BLUE_THEME = { primary: '#0066CC', secondary: '#FF6B35' };
   ```

2. **Admin theme switcher**: Allow practice managers to select colors via UI

3. **Logo upload**: Let practices upload their own logo to replace generic icon

4. **Font customization**: Allow custom fonts via CSS variables

## 📝 Maintenance Notes

- All main interactive elements now use CSS variables
- Some legacy hardcoded colors (#0071e3, #E6F0FF, etc.) may still exist in less-critical components
- When adding new components, always use `var(--booking-primary)` pattern
- Test color changes with WCAG contrast checker to ensure accessibility

---

**Last Updated**: Damira Dental rebrand with Purple & Gold theme  
**Maintainer**: Design System Team
