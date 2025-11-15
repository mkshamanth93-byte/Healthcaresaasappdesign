import { Search, Bell, Settings as SettingsIcon } from 'lucide-react';

interface AdminTopBarProps {
  onShowOnboarding: () => void;
}

export function AdminTopBar({ onShowOnboarding }: AdminTopBarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings, patients..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4C4DDC] focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Demo: Show Onboarding Button */}
        <button
          onClick={onShowOnboarding}
          className="px-4 py-2 text-sm text-[#4C4DDC] hover:bg-purple-50 rounded-lg transition-colors"
        >
          View Onboarding
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings */}
        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
          <SettingsIcon className="w-5 h-5" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 pl-3 pr-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4C4DDC] to-[#6366F1] flex items-center justify-center text-white text-sm">
            DJ
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-900">Dr. Johnson</p>
            <p className="text-xs text-gray-500">Practice Owner</p>
          </div>
        </button>
      </div>
    </header>
  );
}
