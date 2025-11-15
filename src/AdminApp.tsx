import { useState } from 'react'
import { LoginScreen } from './components/admin/auth/LoginScreen'
import { SignupScreen } from './components/admin/auth/SignupScreen'
import { ForgotPasswordScreen } from './components/admin/auth/ForgotPasswordScreen'
import { AdminLayout } from './components/admin/layout/AdminLayout'
import { DashboardHome } from './components/admin/dashboard/DashboardHome'
import { OnboardingLayout } from './components/admin/onboarding/OnboardingLayout'
import { Step1CareStack } from './components/admin/onboarding/Step1CareStack'
import { Step2Locations } from './components/admin/onboarding/Step2Locations'
import { Step3Providers } from './components/admin/onboarding/Step3Providers'
import { Step4Stripe } from './components/admin/onboarding/Step4Stripe'
import { Step5OTP } from './components/admin/onboarding/Step5OTP'
import { Step6Settings } from './components/admin/onboarding/Step6Settings'
import { Step7Procedures } from './components/admin/onboarding/Step7Procedures'
import { Step8Pricing } from './components/admin/onboarding/Step8Pricing'
import { Step9Defaults } from './components/admin/onboarding/Step9Defaults'
import { OnboardingComplete } from './components/admin/onboarding/OnboardingComplete'

type AdminView = 'login' | 'signup' | 'forgot-password' | 'onboarding' | 'onboarding-complete' | 'dashboard'

interface AdminAppProps {
  onBackToSite?: () => void
}

interface OnboardingData {
  apiKey?: string
  locations?: any[]
  widgetType?: 'practice' | 'location-specific' | 'both'
  providers?: any[]
}

export default function AdminApp({ onBackToSite }: AdminAppProps) {
  const [currentView, setCurrentView] = useState<AdminView>('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({})

  // Mock authentication handlers (Cursor will replace with real API)
  const handleLogin = (email: string, password: string) => {
    console.log('Login:', email, password)
    // Mock successful login
    setUser({ email, name: 'Admin User' })
    setIsAuthenticated(true)
    setCurrentView('dashboard')
  }

  const handleSignup = (name: string, email: string, password: string, practiceName: string) => {
    console.log('Signup:', name, email, password, practiceName)
    // Mock successful signup - go to onboarding
    setUser({ email, name })
    setIsAuthenticated(true)
    setCurrentView('onboarding')
    setOnboardingStep(1)
  }

  const handleForgotPassword = (email: string) => {
    console.log('Forgot password:', email)
    // Mock password reset
    alert('Password reset link sent to ' + email)
    setCurrentView('login')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setCurrentView('login')
    // Optionally go back to main site
    if (onBackToSite) onBackToSite()
  }

  // Onboarding handlers
  const handleStep1Complete = (data: { apiKey: string; practiceEmail: string }) => {
    setOnboardingData({ ...onboardingData, ...data })
    setOnboardingStep(2)
  }

  const handleStep2Complete = (locations: any[], widgetType: 'practice' | 'location-specific' | 'both') => {
    setOnboardingData({ ...onboardingData, locations, widgetType })
    setOnboardingStep(3)
  }

  const handleStep3Complete = (providers: any[]) => {
    setOnboardingData({ ...onboardingData, providers })
    setOnboardingStep(4)
  }

  const handleStep4Complete = (stripeData: any) => {
    setOnboardingData({ ...onboardingData, stripeData })
    setOnboardingStep(5)
  }

  const handleStep5Complete = (otpData: any) => {
    setOnboardingData({ ...onboardingData, otpData })
    setOnboardingStep(6)
  }

  const handleStep6Complete = (settingsData: any) => {
    setOnboardingData({ ...onboardingData, settingsData })
    setOnboardingStep(7)
  }

  const handleStep7Complete = (proceduresData: any) => {
    setOnboardingData({ ...onboardingData, proceduresData })
    setOnboardingStep(8)
  }

  const handleStep8Complete = (pricingData: any) => {
    setOnboardingData({ ...onboardingData, pricingData })
    setOnboardingStep(9)
  }

  const handleStep9Complete = (defaultsData: any) => {
    setOnboardingData({ ...onboardingData, defaultsData })
    // For now, complete onboarding and go to dashboard
    setCurrentView('onboarding-complete')
  }

  const handleOnboardingBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1)
    }
  }

  const handleOnboardingSkip = () => {
    // Skip to dashboard
    setCurrentView('dashboard')
  }

  // Render authentication screens
  if (!isAuthenticated) {
    return (
      <>
        {currentView === 'login' && (
          <LoginScreen
            onLogin={handleLogin}
            onSignup={() => setCurrentView('signup')}
            onForgotPassword={() => setCurrentView('forgot-password')}
          />
        )}
        {currentView === 'signup' && (
          <SignupScreen
            onSignup={handleSignup}
            onLogin={() => setCurrentView('login')}
          />
        )}
        {currentView === 'forgot-password' && (
          <ForgotPasswordScreen
            onSubmit={handleForgotPassword}
            onBack={() => setCurrentView('login')}
          />
        )}
      </>
    )
  }

  // Render main admin dashboard
  return (
    <>
      {currentView === 'onboarding' ? (
        <OnboardingLayout
          currentStep={onboardingStep}
          totalSteps={9}
          onBack={handleOnboardingBack}
          onSkip={handleOnboardingSkip}
          showSkip={true}
        >
          {onboardingStep === 1 && <Step1CareStack onComplete={handleStep1Complete} />}
          {onboardingStep === 2 && (
            <Step2Locations 
              onComplete={handleStep2Complete}
            />
          )}
          {onboardingStep === 3 && (
            <Step3Providers 
              locations={onboardingData.locations || []}
              onComplete={handleStep3Complete}
            />
          )}
          {onboardingStep === 4 && (
            <Step4Stripe 
              onComplete={handleStep4Complete}
            />
          )}
          {onboardingStep === 5 && (
            <Step5OTP 
              onComplete={handleStep5Complete}
            />
          )}
          {onboardingStep === 6 && (
            <Step6Settings 
              onComplete={handleStep6Complete}
            />
          )}
          {onboardingStep === 7 && (
            <Step7Procedures 
              onComplete={handleStep7Complete}
            />
          )}
          {onboardingStep === 8 && (
            <Step8Pricing 
              categories={onboardingData.proceduresData || []}
              onComplete={handleStep8Complete}
            />
          )}
          {onboardingStep === 9 && (
            <Step9Defaults 
              categories={onboardingData.proceduresData || []}
              onComplete={handleStep9Complete}
            />
          )}
        </OnboardingLayout>
      ) : currentView === 'onboarding-complete' ? (
        <OnboardingComplete
          onGoToDashboard={() => setCurrentView('dashboard')}
        />
      ) : (
        <AdminLayout user={user} onLogout={handleLogout}>
          {currentView === 'dashboard' && <DashboardHome />}
        </AdminLayout>
      )}
    </>
  )
}