import { Button } from '../../ui/button'
import { Avatar, AvatarFallback } from '../../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Bell, Settings, LogOut, Menu } from 'lucide-react'
import { Badge } from '../../ui/badge'

interface TopBarProps {
  user: { email: string; name: string } | null
  onLogout: () => void
  onMenuClick?: () => void
}

export function TopBar({ user, onLogout, onMenuClick }: TopBarProps) {
  // Mock notification count
  const notificationCount = 3

  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            {onMenuClick && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-slate-100"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            
            {/* Search placeholder - will be implemented later */}
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg min-w-[300px]">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm text-slate-400">Search bookings, patients...</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-6">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative h-9 w-9 p-0 hover:bg-slate-100"
            >
              <Bell className="h-5 w-5 text-slate-600" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-bold"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>

            <div className="h-6 w-px bg-slate-200 mx-1" />

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative h-9 w-9 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-700 hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 cursor-pointer"
                  aria-label="User menu"
                >
                  <Avatar className="h-full w-full">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white text-[13px] font-semibold">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AU'}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem className="flex items-center justify-start gap-2 p-2 cursor-pointer">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-sm">{user?.name || 'Admin User'}</p>
                    <p className="text-xs text-slate-500">{user?.email || 'admin@example.com'}</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span className="text-sm">Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer focus:bg-red-50 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="text-sm">Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
