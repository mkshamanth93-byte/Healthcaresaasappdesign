import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

interface AdminLayoutProps {
  children: React.ReactNode
  user: { email: string; name: string } | null
  onLogout: () => void
}

export function AdminLayout({ children, user, onLogout }: AdminLayoutProps) {
  const [activeNav, setActiveNav] = useState('/admin/dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={(href) => {
          setActiveNav(href)
          // In production, this would trigger routing
          console.log('Navigate to:', href)
        }}
        user={user}
        onLogout={onLogout}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar 
          user={user} 
          onLogout={onLogout}
          onMenuClick={() => setMobileMenuOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto min-h-0 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  )
}
