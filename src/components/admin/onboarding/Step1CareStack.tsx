import { useState } from 'react'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import { Plug, Check, AlertCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from '../../ui/alert'

interface Step1CareStackProps {
  onComplete: (data: { apiKey: string; practiceEmail: string }) => void
}

export function Step1CareStack({ onComplete }: Step1CareStackProps) {
  const [apiKey, setApiKey] = useState('')
  const [practiceEmail, setPracticeEmail] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleConnect = async () => {
    setIsConnecting(true)
    setConnectionStatus('idle')

    // Mock API connection (Cursor will replace with real API)
    setTimeout(() => {
      if (apiKey.length > 10 && practiceEmail.includes('@')) {
        setConnectionStatus('success')
        setIsConnecting(false)
        // Auto-proceed after successful connection
        setTimeout(() => onComplete({ apiKey, practiceEmail }), 1000)
      } else {
        setConnectionStatus('error')
        setIsConnecting(false)
      }
    }, 1500)
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
            <Plug className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Connect CareStack
            </h2>
            <p className="text-sm text-slate-500">
              Link your CareStack account to sync data
            </p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <Card className="mb-6 border-indigo-200 bg-indigo-50/50">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Plug className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                What we'll sync
              </h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Locations and operating hours</li>
                <li>• Providers and their specialties</li>
                <li>• Appointment types and production codes</li>
                <li>• Patient information (for returning patients)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Key Input */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="apiKey" className="text-sm font-medium text-slate-700">
            CareStack API Key
          </Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Enter your CareStack API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={isConnecting || connectionStatus === 'success'}
            className="h-12 text-base"
          />
          <p className="text-xs text-slate-500">
            Find your API key in CareStack Settings → Integrations → API Access
          </p>
        </div>

        {/* Practice Email Input */}
        <div className="space-y-2">
          <Label htmlFor="practiceEmail" className="text-sm font-medium text-slate-700">
            Practice Email
          </Label>
          <Input
            id="practiceEmail"
            type="email"
            placeholder="Enter your practice email"
            value={practiceEmail}
            onChange={(e) => setPracticeEmail(e.target.value)}
            disabled={isConnecting || connectionStatus === 'success'}
            className="h-12 text-base"
          />
          <p className="text-xs text-slate-500">
            This email will be used to verify your practice
          </p>
        </div>

        {/* Connection Status */}
        {connectionStatus === 'success' && (
          <Alert className="border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Successfully connected to CareStack! Syncing your data...
            </AlertDescription>
          </Alert>
        )}

        {connectionStatus === 'error' && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Failed to connect. Please check your API key and try again.
            </AlertDescription>
          </Alert>
        )}

        {/* Test Connection Button */}
        <Button
          onClick={handleConnect}
          disabled={!apiKey || !practiceEmail || isConnecting || connectionStatus === 'success'}
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium"
        >
          {isConnecting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Connecting to CareStack...
            </>
          ) : connectionStatus === 'success' ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Connected Successfully
            </>
          ) : (
            'Test Connection'
          )}
        </Button>

        {/* Help Text */}
        <div className="pt-6 border-t border-slate-200">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">
            Need help getting your API key?
          </h4>
          <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
            <li>Log in to your CareStack account</li>
            <li>Navigate to Settings → Integrations</li>
            <li>Click on "API Access" or "Developer Settings"</li>
            <li>Generate a new API key if needed</li>
            <li>Copy and paste the key above</li>
          </ol>
          <Button variant="link" className="mt-3 p-0 h-auto text-indigo-600">
            View detailed instructions →
          </Button>
        </div>
      </div>
    </div>
  )
}