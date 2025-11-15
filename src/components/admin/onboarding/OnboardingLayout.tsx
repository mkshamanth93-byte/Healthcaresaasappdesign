import { ReactNode } from 'react'
import { Button } from '../../ui/button'
import { Calendar, Check, ArrowLeft, ArrowRight } from 'lucide-react'

interface OnboardingLayoutProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
  onNext?: () => void
  onBack?: () => void
  onSkip?: () => void
  nextLabel?: string
  nextDisabled?: boolean
  showSkip?: boolean
}

const steps = [
  { number: 1, title: 'CareStack', description: 'Connect your account' },
  { number: 2, title: 'Locations', description: 'Select locations' },
  { number: 3, title: 'Providers', description: 'Choose providers' },
  { number: 4, title: 'Stripe', description: 'Payment setup' },
  { number: 5, title: 'Twilio', description: 'SMS notifications' },
  { number: 6, title: 'Settings', description: 'Appointment rules' },
  { number: 7, title: 'Procedures', description: 'Map procedures' },
  { number: 8, title: 'Pricing', description: 'Set deposits' },
  { number: 9, title: 'Defaults', description: 'Final setup' },
]

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSkip,
  nextLabel = 'Continue',
  nextDisabled = false,
  showSkip = true,
}: OnboardingLayoutProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      {/* Top Bar */}
      <div className="relative z-10 bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Calendar className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-white font-semibold">Setup Your Practice</h1>
              <p className="text-xs text-slate-400">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
          </div>
          {showSkip && onSkip && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Skip for now
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 bg-slate-900/30 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-5xl mx-auto px-6 py-6">
          {/* Visual Steps */}
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, idx) => {
              const isCompleted = step.number < currentStep
              const isCurrent = step.number === currentStep
              const isUpcoming = step.number > currentStep

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                        ${isCompleted
                          ? 'bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-lg shadow-indigo-500/20'
                          : isCurrent
                          ? 'bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/20'
                          : 'bg-slate-800 text-slate-500 border-2 border-slate-700'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" strokeWidth={3} />
                      ) : (
                        step.number
                      )}
                    </div>
                    <p
                      className={`
                        mt-2 text-xs font-medium transition-colors hidden md:block
                        ${isCurrent ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-500'}
                      `}
                    >
                      {step.title}
                    </p>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`
                        h-0.5 flex-1 mx-2 transition-all duration-300
                        ${isCompleted ? 'bg-gradient-to-r from-indigo-600 to-blue-700' : 'bg-slate-700'}
                      `}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-blue-700 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 min-h-[500px]">
            {children}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="relative z-10 bg-slate-900/50 backdrop-blur-xl border-t border-slate-700/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            {onBack && currentStep > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-400">
              {currentStep} of {totalSteps} completed
            </p>
            {onNext && (
              <Button
                onClick={onNext}
                disabled={nextDisabled}
                className="bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium shadow-lg shadow-indigo-500/20"
              >
                {nextLabel}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
