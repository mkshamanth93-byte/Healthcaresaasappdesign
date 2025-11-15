import { useState } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'
import { MessageSquare, Check, AlertCircle, Loader2, Send, Bell } from 'lucide-react'
import { Alert, AlertDescription } from '../../ui/alert'
import { Switch } from '../../ui/switch'
import { Badge } from '../../ui/badge'

interface Step5TwilioProps {
  onComplete: (twilioData: {
    phoneNumber: string
    confirmationEnabled: boolean
    reminderEnabled: boolean
    cancellationEnabled: boolean
  }) => void
}

export function Step5Twilio({ onComplete }: Step5TwilioProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [testPhone, setTestPhone] = useState('')
  const [isSendingTest, setIsSendingTest] = useState(false)
  const [testSent, setTestSent] = useState(false)

  // Notification preferences
  const [confirmationEnabled, setConfirmationEnabled] = useState(true)
  const [reminderEnabled, setReminderEnabled] = useState(true)
  const [cancellationEnabled, setCancellationEnabled] = useState(true)

  const handleVerifyPhone = async () => {
    setIsVerifying(true)
    setVerificationStatus('idle')

    // Mock phone verification (Cursor will replace with real Twilio API)
    setTimeout(() => {
      if (phoneNumber.length >= 10) {
        setVerificationStatus('success')
      } else {
        setVerificationStatus('error')
      }
      setIsVerifying(false)
    }, 1500)
  }

  const handleSendTest = async () => {
    setIsSendingTest(true)
    setTestSent(false)

    // Mock SMS send (Cursor will replace with real Twilio API)
    setTimeout(() => {
      setTestSent(true)
      setIsSendingTest(false)
    }, 1000)
  }

  const handleContinue = () => {
    onComplete({
      phoneNumber,
      confirmationEnabled,
      reminderEnabled,
      cancellationEnabled,
    })
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              SMS Notifications
            </h2>
            <p className="text-sm text-slate-500">
              Set up automated text messages with Twilio
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
                <Bell className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                Automated Patient Communications
              </h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Instant booking confirmations</li>
                <li>• Appointment reminders (24h before)</li>
                <li>• Cancellation notifications</li>
                <li>• Two-way SMS conversations (coming soon)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phone Number Setup */}
      <div className="space-y-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm font-medium text-slate-700">
            Practice Phone Number
          </Label>
          <div className="flex gap-2">
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={verificationStatus === 'success'}
              className="h-12 text-base flex-1"
            />
            {verificationStatus !== 'success' && (
              <Button
                onClick={handleVerifyPhone}
                disabled={!phoneNumber || isVerifying}
                className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700"
              >
                {isVerifying ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Verify'
                )}
              </Button>
            )}
          </div>
          <p className="text-xs text-slate-500">
            This number will appear as the sender for all SMS notifications
          </p>
        </div>

        {/* Verification Status */}
        {verificationStatus === 'success' && (
          <Alert className="border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Phone number verified successfully! SMS notifications are ready.
            </AlertDescription>
          </Alert>
        )}

        {verificationStatus === 'error' && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Failed to verify phone number. Please check the format and try again.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Notification Preferences */}
      {verificationStatus === 'success' && (
        <>
          <Card className="mb-6 border-slate-200 bg-white">
            <CardContent className="p-5">
              <h4 className="text-sm font-semibold text-slate-900 mb-4">
                Notification Settings
              </h4>
              <div className="space-y-4">
                {/* Confirmation SMS */}
                <div className="flex items-start justify-between py-3 border-b border-slate-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Label htmlFor="confirmation" className="text-sm font-medium text-slate-900">
                        Booking Confirmations
                      </Label>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Recommended
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600">
                      Send instant SMS when patient books an appointment
                    </p>
                  </div>
                  <Switch
                    id="confirmation"
                    checked={confirmationEnabled}
                    onCheckedChange={setConfirmationEnabled}
                  />
                </div>

                {/* Reminder SMS */}
                <div className="flex items-start justify-between py-3 border-b border-slate-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Label htmlFor="reminder" className="text-sm font-medium text-slate-900">
                        Appointment Reminders
                      </Label>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Recommended
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600">
                      Send reminder 24 hours before appointment
                    </p>
                  </div>
                  <Switch
                    id="reminder"
                    checked={reminderEnabled}
                    onCheckedChange={setReminderEnabled}
                  />
                </div>

                {/* Cancellation SMS */}
                <div className="flex items-start justify-between py-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Label htmlFor="cancellation" className="text-sm font-medium text-slate-900">
                        Cancellation Notifications
                      </Label>
                    </div>
                    <p className="text-xs text-slate-600">
                      Notify patient when appointment is cancelled
                    </p>
                  </div>
                  <Switch
                    id="cancellation"
                    checked={cancellationEnabled}
                    onCheckedChange={setCancellationEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SMS Preview Examples */}
          <Card className="mb-6 border-slate-200 bg-slate-50">
            <CardContent className="p-5">
              <h4 className="text-sm font-semibold text-slate-900 mb-4">
                Example Messages
              </h4>
              <div className="space-y-3">
                {/* Confirmation Example */}
                {confirmationEnabled && (
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-semibold text-slate-700">Booking Confirmation</span>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-xs text-slate-700 font-mono">
                      Hi John! Your appointment is confirmed for Nov 16 at 2:00 PM with Dr. Sarah Johnson at Downtown Office. Reply CANCEL to cancel.
                    </div>
                  </div>
                )}

                {/* Reminder Example */}
                {reminderEnabled && (
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="h-4 w-4 text-indigo-600" />
                      <span className="text-xs font-semibold text-slate-700">24h Reminder</span>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-xs text-slate-700 font-mono">
                      Reminder: Your dental appointment is tomorrow at 2:00 PM with Dr. Sarah Johnson. See you soon!
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Test SMS */}
          <Card className="mb-6 border-indigo-200 bg-indigo-50/30">
            <CardContent className="p-5">
              <h4 className="text-sm font-semibold text-slate-900 mb-3">
                Send Test Message
              </h4>
              <p className="text-xs text-slate-600 mb-3">
                Send a test SMS to verify everything is working correctly
              </p>
              <div className="flex gap-2">
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  className="h-10 text-sm flex-1"
                />
                <Button
                  onClick={handleSendTest}
                  disabled={!testPhone || isSendingTest}
                  size="sm"
                  className="h-10 px-4 bg-indigo-600 hover:bg-indigo-700"
                >
                  {isSendingTest ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Test
                    </>
                  )}
                </Button>
              </div>
              {testSent && (
                <Alert className="mt-3 border-green-200 bg-green-50">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 text-xs">
                    Test message sent successfully! Check your phone.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Pricing Info */}
      <div className="pt-6 border-t border-slate-200">
        <h4 className="text-sm font-semibold text-slate-900 mb-3">
          SMS Pricing
        </h4>
        <div className="bg-slate-50 rounded-lg p-4 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-slate-600">SMS Messages (US)</span>
            <span className="font-medium text-slate-900">$0.0075 per message</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-slate-600">Estimated monthly cost (100 appointments)</span>
            <span className="font-medium text-slate-900">~$2.25/month</span>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            💡 SMS costs are billed separately by Twilio based on usage
          </p>
        </div>
      </div>

      {/* Continue Button */}
      {verificationStatus === 'success' && (
        <div className="mt-8 pt-6 border-t border-slate-200">
          <Button
            onClick={handleContinue}
            className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium"
          >
            Continue to Appointment Settings
          </Button>
        </div>
      )}
    </div>
  )
}
