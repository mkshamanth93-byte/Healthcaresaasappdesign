# 🎯 CareStack Online Appointments - Admin Dashboard

## 📁 Project Structure

```
/
├── App.tsx                          # Main entry with routing (DO NOT MODIFY WIDGET)
├── AdminApp.tsx                     # Admin dashboard entry point
├── components/
│   ├── widget/                      # 🔒 LOCKED - Booking widget (DO NOT TOUCH)
│   └── admin/                       # ✅ Admin dashboard components
│       ├── auth/
│       │   ├── LoginScreen.tsx
│       │   ├── SignupScreen.tsx
│       │   └── ForgotPasswordScreen.tsx
│       ├── layout/
│       │   ├── AdminLayout.tsx
│       │   ├── Sidebar.tsx
│       │   └── TopBar.tsx
│       └── dashboard/
│           └── DashboardHome.tsx
```

---

## 🚀 Getting Started

### **Access Admin Dashboard**

1. Navigate to `/admin` in your browser
2. You'll see the login screen
3. Enter any email/password (mock authentication)
4. You'll be redirected to the admin dashboard

### **Mock Credentials (For Testing)**

```
Email: admin@example.com
Password: password123
```

*Note: Authentication is currently mocked. Cursor will implement real API integration.*

---

## 🎨 Design System

### **Theme: DentalCRM Style**

- **Sidebar**: Dark slate (`slate-900` gradient)
- **Primary Accent**: Indigo/Blue gradient (`from-indigo-600 to-blue-700`)
- **Background**: Light slate (`slate-50`)
- **Cards**: White with subtle shadows
- **Typography**: Clean, modern, Tailwind defaults

### **Color Palette**

```css
/* Primary */
--indigo-600: #4F46E5
--blue-700: #1D4ED8

/* Dark Sidebar */
--slate-900: #0F172A
--slate-800: #1E293B

/* Background */
--slate-50: #F8FAFC

/* Text */
--slate-900: #0F172A (headings)
--slate-600: #475569 (body)
--slate-400: #94A3B8 (muted)
```

---

## 📋 Week 1 Checklist (Completed)

- ✅ AdminApp.tsx entry point
- ✅ LoginScreen with email/password
- ✅ SignupScreen with practice name
- ✅ ForgotPasswordScreen
- ✅ AdminLayout with sidebar + topbar
- ✅ Sidebar navigation with expandable menus
- ✅ TopBar with notifications and user menu
- ✅ DashboardHome with metrics and bookings
- ✅ Routing: `/` = Widget, `/admin` = Admin

---

## 🔄 Next Steps (Week 2: Onboarding)

### **Files to Create:**

```
/components/admin/onboarding/
  ├── OnboardingLayout.tsx
  ├── Step1CareStack.tsx
  ├── Step2Locations.tsx
  ├── Step3Providers.tsx
  ├── Step4Stripe.tsx
  ├── Step5Twilio.tsx
  ├── Step6Settings.tsx
  ├── Step7Procedures.tsx
  ├── Step8Pricing.tsx
  ├── Step9Defaults.tsx
  └── OnboardingComplete.tsx
```

### **Key Features:**

1. **Step 1**: CareStack API connection (mock OAuth)
2. **Step 2**: Location selection with practice vs location widget toggle
3. **Step 3**: Provider selection and enablement
4. **Step 4**: Stripe integration
5. **Step 5**: Twilio SMS setup
6. **Step 6**: Account/location level settings
7. **Step 7**: Category → Reason → Production Type mapping
8. **Step 8**: Deposit rules and pricing
9. **Step 9**: Default exam/hygiene procedures

---

## 📊 Mock Data Strategy

All components use **mock data** for now:

- `const mockBookings = [...]` - Sample booking data
- `const mockMetrics = [...]` - Dashboard stats
- `setTimeout()` - Simulates API calls (800ms delay)

**For Cursor Backend Integration:**
- Replace mock data with real API calls
- Replace `setTimeout` with actual `fetch()` or `axios`
- Add error handling and loading states

---

## 🎯 Navigation Structure

```
/admin                              # Redirect to login or dashboard
/admin/login                        # ✅ Login screen
/admin/signup                       # ✅ Signup screen
/admin/forgot-password              # ✅ Password reset

/admin/onboarding                   # 🔜 Week 2
  /admin/onboarding/carestack
  /admin/onboarding/locations
  ... (9 steps total)

/admin/dashboard                    # ✅ Main dashboard
/admin/bookings                     # 🔜 Week 3
/admin/patients                     # 🔜 Phase 4
/admin/settings                     # 🔜 Week 4
/admin/widget                       # 🔜 Week 5
/admin/analytics                    # 🔜 Week 5
```

---

## 🔒 Important Rules

### **DO NOT TOUCH:**

- ❌ `/components/widget/*` - Booking widget is LOCKED
- ❌ `/components/BookingWidget.tsx` - Main widget wrapper
- ❌ Any files related to the patient booking flow

### **SAFE TO MODIFY:**

- ✅ `/AdminApp.tsx`
- ✅ `/components/admin/*`
- ✅ `/App.tsx` (only for routing logic)

---

## 💡 Usage Example

### **Adding a New Admin Screen**

1. Create component in `/components/admin/[section]/`
2. Add route in `AdminApp.tsx`
3. Add navigation item in `Sidebar.tsx`
4. Use mock data for initial design
5. Hand off to Cursor for backend integration

### **Example: New "Reports" Screen**

```tsx
// 1. Create component
// /components/admin/reports/ReportsScreen.tsx
export function ReportsScreen() {
  const mockReports = [...]
  return <div>Reports here</div>
}

// 2. Add to AdminApp.tsx
import { ReportsScreen } from './components/admin/reports/ReportsScreen'

{currentView === 'reports' && <ReportsScreen />}

// 3. Add to Sidebar.tsx navigation array
{ name: 'Reports', href: '/admin/reports', icon: FileText }
```

---

## 🎨 Component Patterns

### **Card with Header**

```tsx
<Card>
  <div className="px-6 py-5 border-b border-slate-100">
    <h3>Title</h3>
    <p className="text-sm text-slate-500">Description</p>
  </div>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### **Metric Card**

```tsx
<Card>
  <CardContent className="p-6">
    <p className="text-xs uppercase text-slate-500">Label</p>
    <p className="text-3xl font-bold text-slate-900">$12,450</p>
    <p className="text-xs text-slate-500">Description</p>
  </CardContent>
</Card>
```

### **List Item with Hover**

```tsx
<div className="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer">
  {/* Content */}
</div>
```

---

## 📦 Dependencies

All UI components from shadcn/ui:
- Button
- Card
- Input
- Label
- Avatar
- Badge
- DropdownMenu
- ... (see /components/ui/)

Icons from lucide-react:
- Calendar, Users, Settings, etc.

---

## 🚀 Deployment Notes

### **Production Routing**

Current routing uses `window.location.pathname`:
- `/` → Damira Dental website + booking widget
- `/admin` → Admin dashboard

In production, replace with proper router (React Router, Next.js, etc.)

### **Environment Variables**

For Cursor to implement:
```
CARESTACK_API_KEY=...
STRIPE_PUBLISHABLE_KEY=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
```

---

## 📞 Support

For questions or issues:
1. Check this README
2. Review Guidelines.md for design system
3. Inspect existing components for patterns
4. Keep booking widget untouched!

---

**Last Updated**: Week 1 Complete ✅  
**Next Milestone**: Week 2 - Onboarding Flow 🔜
