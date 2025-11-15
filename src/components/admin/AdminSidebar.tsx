import { 
  Home, 
  Calendar, 
  Settings, 
  Users, 
  ClipboardList, 
  Palette, 
  Code, 
  BarChart3, 
  Plug,
  HelpCircle,
  User
} from 'lucide-react';
import type { AdminPage } from '../AdminDashboard';

interface AdminSidebarProps {
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
}

export function AdminSidebar({ currentPage, onNavigate }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'settings', icon: Settings, label: 'Practice Settings' },
    { id: 'providers', icon: Users, label: 'Providers' },
    { id: 'appointment-reasons', icon: ClipboardList, label: 'Appointment Reasons' },
    { id: 'widget-config', icon: Palette, label: 'Widget Configuration' },
    { id: 'widget-install', icon: Code, label: 'Widget Installation' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'integrations', icon: Plug, label: 'Integrations' },
  ] as const;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4C4DDC] to-[#6366F1] flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg text-gray-900">CareStack</h1>
            <p className="text-xs text-gray-500">Online Appointments</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as AdminPage)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white shadow-lg shadow-[#4C4DDC]/20'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Help & Support</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all">
          <User className="w-5 h-5" />
          <span className="font-medium">Account Settings</span>
        </button>
      </div>
    </aside>
  );
}
