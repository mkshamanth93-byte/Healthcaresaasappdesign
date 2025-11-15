import { useState } from 'react'
import { Button } from '../../ui/button'
import { Avatar, AvatarFallback } from '../../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import {
  Calendar,
  LayoutDashboard,
  Settings,
  Palette,
  BarChart3,
  Users,
  MapPin,
  FileText,
  CreditCard,
  Plug,
  Map,
  X,
  LogOut,
} from 'lucide-react'

interface SidebarProps {
  activeNav: string
  onNavChange: (href: string) => void
  user: { email: string; name: string } | null
  onLogout: () => void
  mobileMenuOpen?: boolean
  onCloseMobile?: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Patients', href: '/admin/patients', icon: Users, badge: 'Phase 4', badgeVariant: 'future' },
  { 
    name: 'Settings', 
    href: '/admin/settings', 
    icon: Settings,
    submenu: [
      { name: 'Practice Info', href: '/admin/settings/practice', icon: FileText },
      { name: 'Locations', href: '/admin/settings/locations', icon: MapPin },
      { name: 'Providers', href: '/admin/settings/providers', icon: Users },
      { name: 'Appointment Types', href: '/admin/settings/appointment-types', icon: Calendar },
      { name: 'Workflows', href: '/admin/settings/workflows', icon: Map },
      { name: 'Payment & Billing', href: '/admin/settings/payment', icon: CreditCard },
      { name: 'Integrations', href: '/admin/settings/integrations', icon: Plug },
    ]
  },
  { name: 'Widget', href: '/admin/widget', icon: Palette },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

export function Sidebar({ activeNav, onNavChange, user, onLogout, mobileMenuOpen, onCloseMobile }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['/admin/settings'])

  const toggleSubmenu = (href: string) => {
    setExpandedMenus(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    )
  }

  const handleNavClick = (href: string, hasSubmenu?: boolean) => {
    if (hasSubmenu) {
      toggleSubmenu(href)
    } else {
      onNavChange(href)
      if (onCloseMobile) onCloseMobile()
    }
  }

  return (
    <div className={`
      w-64 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-r border-slate-800/50 flex flex-col flex-shrink-0 shadow-2xl shadow-slate-950/20
      lg:relative lg:translate-x-0
      fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
      ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Logo Area */}
      <div className="h-16 px-6 flex items-center border-b border-slate-800/50 bg-gradient-to-r from-slate-800/30 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Calendar className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-[15px] font-semibold text-white tracking-tight">
              Online Appointments
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Admin</p>
          </div>
        </div>
        {onCloseMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCloseMobile}
            className="lg:hidden ml-auto p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = activeNav === item.href || activeNav.startsWith(item.href + '/')
            const hasBadge = (item as any).badge
            const badgeVariant = (item as any).badgeVariant
            const hasSubmenu = (item as any).submenu
            const isExpanded = expandedMenus.includes(item.href)
            
            return (
              <div key={item.name}>
                <button
                  onClick={() => handleNavClick(item.href, hasSubmenu)}
                  className={`
                    w-full relative flex items-center justify-between px-3 py-2.5 text-[13.5px] font-medium rounded-lg transition-all duration-200 group
                    ${isActive && !hasSubmenu
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }
                  `}
                >
                  {isActive && !hasSubmenu && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-600/20 rounded-lg blur-md" />
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    <item.icon 
                      className={`h-[17px] w-[17px] transition-colors ${
                        isActive && !hasSubmenu ? 'text-white drop-shadow-md' : 'text-slate-400 group-hover:text-white'
                      }`} 
                      strokeWidth={2} 
                    />
                    <span className="tracking-tight">{item.name}</span>
                  </div>
                  {hasBadge && (
                    <span className={`
                      relative z-10 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider
                      ${badgeVariant === 'future' 
                        ? 'bg-slate-700/60 text-slate-300 border border-slate-600/40'
                        : 'bg-slate-700 text-slate-300'}
                    `}>
                      {(item as any).badge}
                    </span>
                  )}
                  {hasSubmenu && (
                    <svg 
                      className={`h-4 w-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <div className="mt-1 ml-6 space-y-1">
                    {(item as any).submenu.map((subItem: any) => {
                      const isSubActive = activeNav === subItem.href
                      return (
                        <button
                          key={subItem.name}
                          onClick={() => handleNavClick(subItem.href)}
                          className={`
                            w-full flex items-center gap-2 px-3 py-2 text-[12.5px] font-medium rounded-lg transition-all duration-200
                            ${isSubActive
                              ? 'bg-slate-800 text-white'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                            }
                          `}
                        >
                          <subItem.icon className="h-[15px] w-[15px]" strokeWidth={2} />
                          <span className="tracking-tight">{subItem.name}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-slate-800/50 bg-gradient-to-r from-slate-800/30 to-transparent backdrop-blur-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/60 transition-all duration-200 group cursor-pointer">
              <Avatar className="h-8 w-8 ring-2 ring-slate-700 group-hover:ring-indigo-500/50 transition-all shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white text-[12px] font-semibold">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'AU'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-[13px] font-medium text-white truncate">{user?.name || 'Admin User'}</p>
                <p className="text-[11px] text-slate-400">Admin</p>
              </div>
              <svg className="h-4 w-4 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" side="top">
            <DropdownMenuItem className="flex items-center justify-start gap-2 p-2 cursor-pointer">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium text-sm">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-slate-500">{user?.email || 'admin@example.com'}</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onNavChange('/admin/settings')}>
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
  )
}
