import { useState } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { CreditCard, Check, AlertCircle, Loader2, ExternalLink, Shield, Eye, EyeOff } from 'lucide-react'
import { Alert, AlertDescription } from '../../ui/alert'
import { Switch } from '../../ui/switch'

interface Step4StripeProps {
  onComplete: (stripeData: { 
    publishableKey: string
    secretKey: string
    accountId?: string
    testMode: boolean 
  }) => void
}

export function Step4Stripe({ onComplete }: Step4StripeProps) {
  const [publishableKey, setPublishableKey] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [accountId, setAccountId] = useState('')
  const [showSecretKey, setShowSecretKey] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [testMode, setTestMode] = useState(true)

  const handleVerifyKeys = async () => {
    setIsVerifying(true)
    setVerificationStatus('idle')

    // Mock Stripe API verification (Cursor will replace with real Stripe API)
    setTimeout(() => {
      if (publishableKey.length > 10 && secretKey.length > 10) {
        setVerificationStatus('success')
      } else {
        setVerificationStatus('error')
      }
      setIsVerifying(false)
    }, 1500)
  }

  const handleContinue = () => {
    onComplete({
      publishableKey,
      secretKey,
      accountId: accountId || undefined,
      testMode,
    })
  }

  const isFormValid = publishableKey && secretKey

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Connect Stripe
            </h2>
            <p className="text-sm text-slate-500">
              Accept payments and collect deposits
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
                <Shield className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                Secure Payment Processing
              </h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Collect deposits for appointments</li>
                <li>• PCI-compliant payment handling by Stripe</li>
                <li>• Automatic refunds for cancellations (optional)</li>
                <li>• Support for multiple payment methods</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys Input */}
      <div className="space-y-6 mb-6">
        {/* Test Mode Toggle */}
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="testMode" className="text-sm font-medium text-slate-900">
                  Test Mode
                </Label>
                <p className="text-xs text-slate-600">
                  Use Stripe test keys for development and testing
                </p>
              </div>
              <Switch
                id="testMode"
                checked={testMode}
                onCheckedChange={setTestMode}
              />
            </div>
            {testMode && (
              <Alert className="mt-3 border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800 text-xs">
                  Test mode is enabled. Use test keys starting with <code>pk_test_</code> and <code>sk_test_</code>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Publishable Key */}
        <div className="space-y-2">
          <Label htmlFor="publishableKey" className="text-sm font-medium text-slate-700">
            Publishable Key {testMode && <span className="text-amber-600">(Test)</span>}
          </Label>
          <Input
            id="publishableKey"
            type="text"
            placeholder={testMode ? "pk_test_..." : "pk_live_..."}
            value={publishableKey}
            onChange={(e) => setPublishableKey(e.target.value)}
            disabled={verificationStatus === 'success'}
            className="h-12 text-base font-mono"
          />
          <p className="text-xs text-slate-500">
            Your Stripe publishable key (safe to use in frontend code)
          </p>
        </div>

        {/* Secret Key */}
        <div className="space-y-2">
          <Label htmlFor="secretKey" className="text-sm font-medium text-slate-700">
            Secret Key {testMode && <span className="text-amber-600">(Test)</span>}
          </Label>
          <div className="relative">
            <Input
              id="secretKey"
              type={showSecretKey ? "text" : "password"}
              placeholder={testMode ? "sk_test_..." : "sk_live_..."}
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              disabled={verificationStatus === 'success'}
              className="h-12 text-base font-mono pr-10"
            />
            <button
              type="button"
              onClick={() => setShowSecretKey(!showSecretKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showSecretKey ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Your Stripe secret key (keep this secure, never share publicly)
          </p>
        </div>

        {/* Account ID (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="accountId" className="text-sm font-medium text-slate-700">
            Account ID <span className="text-slate-400">(Optional)</span>
          </Label>
          <Input
            id="accountId"
            type="text"
            placeholder="acct_..."
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            disabled={verificationStatus === 'success'}
            className="h-12 text-base font-mono"
          />
          <p className="text-xs text-slate-500">
            Your Stripe account ID (optional, found in Account Settings)
          </p>
        </div>

        {/* Verify Button */}
        {verificationStatus !== 'success' && (
          <Button
            onClick={handleVerifyKeys}
            disabled={!isFormValid || isVerifying}
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium"
          >
            {isVerifying ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Verifying Keys...
              </>
            ) : (
              'Verify Stripe Keys'
            )}
          </Button>
        )}

        {/* Verification Status */}
        {verificationStatus === 'success' && (
          <Alert className="border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Stripe keys verified successfully! {accountId && `Account ID: ${accountId}`}
            </AlertDescription>
          </Alert>
        )}

        {verificationStatus === 'error' && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Failed to verify Stripe keys. Please check your keys and try again.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* How to Get Keys */}
      <div className="pt-6 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">
          How to get your Stripe API keys
        </h4>
        <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
          <li>Log in to your Stripe Dashboard</li>
          <li>Click "Developers" in the top navigation</li>
          <li>Click "API keys" in the sidebar</li>
          <li>
            {testMode ? (
              <>Toggle to <strong>Test mode</strong> (you'll see test keys)</>
            ) : (
              <>Toggle to <strong>Live mode</strong> (you'll see live keys)</>
            )}
          </li>
          <li>Copy the Publishable key and Secret key</li>
          <li>Paste them above and click "Verify Stripe Keys"</li>
        </ol>
        <Button 
          variant="link" 
          className="mt-3 p-0 h-auto text-indigo-600"
          onClick={() => window.open('https://dashboard.stripe.com/apikeys', '_blank')}
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Open Stripe Dashboard →
        </Button>
      </div>

      {/* Why Stripe */}
      <div className="pt-6 border-t border-slate-200 mt-6">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">
          Why Stripe?
        </h4>
        <ul className="text-sm text-slate-600 space-y-2">
          <li className="flex gap-2">
            <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
            <span>Industry-leading security and PCI compliance</span>
          </li>
          <li className="flex gap-2">
            <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
            <span>Competitive rates: 2.9% + 30¢ per transaction</span>
          </li>
          <li className="flex gap-2">
            <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
            <span>Automatic payouts to your bank account</span>
          </li>
          <li className="flex gap-2">
            <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
            <span>Support for cards, Apple Pay, Google Pay, and more</span>
          </li>
        </ul>
      </div>

      {/* Continue Button */}
      {verificationStatus === 'success' && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <Button
            onClick={handleContinue}
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium"
          >
            Continue to SMS Setup
          </Button>
        </div>
      )}
    </div>
  )
}