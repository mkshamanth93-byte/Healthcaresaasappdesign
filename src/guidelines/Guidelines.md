# UI Guidelines: Dashboard Layout and Architecture (DentalCRM)

This document defines the design, interaction, and component structure for the DentalCRM dashboard as implemented in the latest `App.tsx`.

---

## 🧱 Layout Structure

The Dashboard follows a **3-part structure**:

1. **Mobile Header (`lg:hidden`)**
   - Fixed at top for small screens.
   - Includes logo, title, and mobile menu toggle.
   - Toggle controlled via `mobileMenuOpen` state.

2. **Sidebar Navigation (Desktop & Mobile)**
   - Persistent on desktop, collapsible on mobile.
   - Uses `navigation` array to render links dynamically.
   - Supports badges (`premium`, `new`) and icon status.

3. **Main Content**
   - Contains:
     - Sticky header (with `RefinedUniversalSearch`, `OrgSwitcher`, `LocationSwitcher`, notifications, calendar, profile).
     - Scrollable main area:
       - Metrics Grid
       - Two-column layout:
         - Left: Priorities, Pipeline, Appointments
         - Right: AI Insights, Hot Deals, Monthly Goals

---

## ⚛️ Key Components

| Component                      | Description |
|-------------------------------|-------------|
| `RefinedUniversalSearch`      | Top search with type-selectable results. |
| `RefinedCalendarButton`       | Opens calendar drawer on click. |
| `RefinedCalendarDrawerFull`   | Full-page calendar modal. |
| `RefinedNotificationsBell`    | Notification badge + drawer trigger. |
| `RefinedNotificationsDrawer`  | Right drawer for viewing alerts. |
| `RefinedOrgSwitcher`          | Org select dropdown. |
| `RefinedLocationSwitcher`     | Location select dropdown. |
| `WhatsNewPanel`               | Shows new feature highlights. |

---

## 📊 State Variables

```tsx
const [activeNav, setActiveNav] = useState('/dashboard')
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [notificationsOpen, setNotificationsOpen] = useState(false)
const [calendarOpen, setCalendarOpen] = useState(false)


⸻

🔄 Interaction Logic
	•	Clicking on a nav item updates activeNav and closes mobile menu.
	•	Avatar menu uses DropdownMenu from UI primitives.
	•	RefinedCalendarDrawerFull and RefinedNotificationsDrawer visibility toggled by boolean states.
	•	AvatarFallback initials are derived from hardcoded name for now (e.g. DK).

⸻

📁 File & Directory Best Practices

All refined components should be located in /components and follow:
	•	refined-* naming for shared logic UI
	•	ui/ directory for styled reusable primitives (Button, Card, Badge, etc.)
	•	Follow file colocation: components should be grouped logically

⸻

💡 Developer Notes
	•	Keep all SVGs and icons clean, use lucide-react icons.
	•	Transition and hover animations are defined at tailwind level (e.g. group-hover, transition-all).
	•	Avoid deeply nested state unless lifting is necessary.
	•	Metrics are currently static, but ready to be connected to backend via props or context.

⸻

🗂️ Metrics and Insights Data (Mock)

The following props are populated with mock data:
	•	metrics: Total Revenue, Active Deals, etc.
	•	priorities: Task items with urgency and contact.
	•	insights: AI-driven recommendations.
	•	appointments, pipeline, hot deals: mock patient or deal cards.

Use this data structure for initial scaffolding of backend integration.

⸻

✅ TODO for Backend/Frontend Agents
	•	Replace mock metrics, priorities, insights with API-driven values.
	•	Modularize dashboard sections into their own files under /components/dashboard/.
	•	Add context/provider for global dashboard data refresh.
	•	Integrate with patient activity logs, deal states, and analytics.
