import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import { CheckCircle2, ArrowRight, ExternalLink, Settings, Calendar, Code } from 'lucide-react'
import { Badge } from '../../ui/badge'

interface OnboardingCompleteProps {
  onGoToDashboard: () => void
}

export function OnboardingComplete({ onGoToDashboard }: OnboardingCompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="relative z-10 w-full max-w-3xl">
        <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20">
          <CardContent className="p-12 text-center">
            {/* Success Icon */}
            <div className="mb-6 inline-flex">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 animate-pulse">
                <CheckCircle2 className="h-12 w-12 text-white" strokeWidth={2.5} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              🎉 Setup Complete!
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Your online booking system is ready to accept appointments
            </p>

            {/* Checklist */}
            <Card className="mb-8 border-green-200 bg-green-50/50 text-left">
              <CardContent className="p-6">
                <h3 className="text-base font-semibold text-slate-900 mb-4 text-center">
                  What You've Configured
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>CareStack integration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Locations & widget setup</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Provider availability</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Stripe payments</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>SMS notifications</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Booking rules & policies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Procedure mapping</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>Deposit pricing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="mb-8 text-left">
              <h3 className="text-base font-semibold text-slate-900 mb-4 text-center">
                Quick Start Guide
              </h3>
              <div className="space-y-3">
                <Card className="border-indigo-200 bg-indigo-50/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <Code className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-900 mb-1">
                          1. Get Your Widget Code
                        </h4>
                        <p className="text-xs text-slate-600">
                          Visit Settings → Widget → Installation to get your embed code
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200 bg-indigo-50/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <Settings className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-900 mb-1">
                          2. Customize Your Widget
                        </h4>
                        <p className="text-xs text-slate-600">
                          Match your brand colors and add your logo in Settings → Appearance
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200 bg-indigo-50/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-slate-900 mb-1">
                          3. Test a Booking
                        </h4>
                        <p className="text-xs text-slate-600">
                          Make a test booking to ensure everything works correctly
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Phase Badge */}
            <div className="mb-6 flex justify-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                ✓ Phase 1: Single Appointments
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Coming: Phase 3 & 4
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={onGoToDashboard}
                size="lg"
                className="w-full h-14 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-semibold text-base shadow-lg shadow-indigo-500/20"
              >
                Go to Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 h-12 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                  onClick={() => window.open('/help', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Help Center
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 h-12 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Demo Call
                </Button>
              </div>
            </div>

            {/* Support */}
            <p className="text-xs text-slate-500 mt-6">
              Need help? Email us at{' '}
              <a href="mailto:support@yourapp.com" className="text-indigo-600 hover:underline">
                support@yourapp.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
