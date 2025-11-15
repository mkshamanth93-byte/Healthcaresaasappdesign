# Damira Color Replacement Guide

## Systematic Replacements Needed

### Direct CSS Variable Replacements:
1. `#0071e3` → `var(--booking-primary)`
2. `#0077ED` → `var(--booking-primary)`
3. `#0052a3` → `var(--booking-primary-hover)`
4. `#eff6ff` → `var(--booking-primary-light)`
5. `#E6F0FF` → `var(--booking-primary-light)`

### Pattern Replacements:
- `bg-[#0071e3]` → Use inline style with `var(--booking-primary)`
- `border-[#0071e3]` → Use inline style with `var(--booking-primary)`
- `text-[#0071e3]` → Use inline style with `var(--booking-primary)`
- `fill-[#0071e3]` → Use inline style with `var(--booking-primary)`

## Files to Update (Priority Order):
1. ConfirmationScreen.tsx - 18 instances
2. PaymentScreen.tsx - 16 instances  
3. ProviderScreen.tsx - 14 instances
4. DateTimeScreen.tsx - 13 instances
5. PatientInfoScreen.tsx - 9 instances
6. LocationScreen.tsx - 5 instances
7. PhoneVerificationScreen.tsx - 4 instances
8. VerificationMethodScreen.tsx - 5 instances
9. PatientDetailsEntryScreen.tsx - 6 instances
10. ExamProviderScreen.tsx - 5 instances
11. ReturningExamProviderScreen.tsx - 5 instances
12. ComboDateTimeScreen.tsx - 9 instances
13. FamilySetupScreen.tsx - 5 instances
14. ComboProviderScreen.tsx - 5 instances
15. ReasonDetailScreen.tsx - 4 instances
16. PatientLookupScreen.tsx - 5 instances
