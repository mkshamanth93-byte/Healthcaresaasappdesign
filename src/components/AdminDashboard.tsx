import { useState } from 'react';
import { AdminSidebar } from './admin/AdminSidebar';
import { AdminTopBar } from './admin/AdminTopBar';
import { DashboardHome } from './admin/DashboardHome';
import { BookingsManagement } from './admin/BookingsManagement';
import { PracticeSettings } from './admin/PracticeSettings';
import { ProvidersManagement } from './admin/ProvidersManagement';
import { AppointmentReasons } from './admin/AppointmentReasons';
import { WidgetConfiguration } from './admin/WidgetConfiguration';
import { WidgetInstallation } from './admin/WidgetInstallation';
import { AnalyticsDashboard } from './admin/AnalyticsDashboard';
import { Integrations } from './admin/Integrations';
import { OnboardingWizard } from './admin/OnboardingWizard';

export type AdminPage = 
  | 'dashboard' 
  | 'bookings' 
  | 'settings' 
  | 'providers' 
  | 'appointment-reasons'
  | 'widget-config'
  | 'widget-install'
  | 'analytics'
  | 'integrations';

export function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'bookings':
        return <BookingsManagement />;
      case 'settings':
        return <PracticeSettings />;
      case 'providers':
        return <ProvidersManagement />;
      case 'appointment-reasons':
        return <AppointmentReasons />;
      case 'widget-config':
        return <WidgetConfiguration />;
      case 'widget-install':
        return <WidgetInstallation />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'integrations':
        return <Integrations />;
      default:
        return <DashboardHome />;
    }
  };

  if (showOnboarding) {
    return <OnboardingWizard onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminTopBar onShowOnboarding={() => setShowOnboarding(true)} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
