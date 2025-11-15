import { useState } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Shield, Check, AlertCircle, Loader2, Mail, MessageSquare } from 'lucide-react'
import { Alert, AlertDescription } from '../../ui/alert'
import { Badge } from '../../ui/badge'

type OTPMethod = 'sms' | 'email' | 'both'

interface Step5OTPProps {
  onComplete: (otpData: {
    method: OTPMethod
    twilioPhone?: string
    sendgridApiKey?: string
  }) => void
}

export function Step5OTP({ onComplete }: Step5OTPProps) {
  const [otpMethod, setOTPMethod] = useState<OTPMethod>('both')
  
  // Twilio (SMS)
  const [twilioPhone, setTwilioPhone] = useState('')
  const [isTwilioVerifying, setIsTwilioVerifying] = useState(false)
  const [twilioStatus, setTwilioStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  // SendGrid (Email)
  const [sendgridApiKey, setSendgridApiKey] = useState('')
  const [isSendGridVerifying, setIsSendGridVerifying] = useState(false)
  const [sendgridStatus, setSendgridStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleVerifyTwilio = async () => {
    setIsTwilioVerifying(true)
    setTwilioStatus('idle')

    // Mock Twilio verification (Cursor will replace with real API)
    setTimeout(() => {
      if (twilioPhone.length >= 10) {
        setTwilioStatus('success')
      } else {
        setTwilioStatus('error')
      }
      setIsTwilioVerifying(false)
    }, 1500)
  }

  const handleVerifySendGrid = async () => {
    setIsSendGridVerifying(true)
    setSendgridStatus('idle')

    // Mock SendGrid verification (Cursor will replace with real API)
    setTimeout(() => {
      if (sendgridApiKey.length > 10) {
        setSendgridStatus('success')
      } else {
        setSendgridStatus('error')
      }
      setIsSendGridVerifying(false)
    }, 1500)
  }

  const handleContinue = () => {
    onComplete({
      method: otpMethod,
      twilioPhone: otpMethod !== 'email' ? twilioPhone : undefined,
      sendgridApiKey: otpMethod !== 'sms' ? sendgridApiKey : undefined,
    })
  }

  const canContinue = 
    (otpMethod === 'sms' && twilioStatus === 'success') ||
    (otpMethod === 'email' && sendgridStatus === 'success') ||
    (otpMethod === 'both' && twilioStatus === 'success' && sendgridStatus === 'success')

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              OTP Verification Setup
            </h2>
            <p className="text-sm text-slate-500">
              Configure one-time password verification for patients
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
                Patient Identity Verification
              </h4>
              <p className="text-xs text-slate-600 mb-2">
                Patients will receive a one-time password (OTP) to verify their identity during booking
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Prevents spam bookings and no-shows</li>
                <li>• Confirms patient contact information</li>
                <li>• Required for secure payment processing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* OTP Method Selection */}
      <div className="mb-6">
        <Label className="text-base font-semibold text-slate-900 mb-4 block">
          OTP Delivery Method
        </Label>
        <p className="text-sm text-slate-600 mb-4">
          Choose how patients will receive their verification code
        </p>

        <div className="grid grid-cols-3 gap-3">
          {/* SMS Only */}
          <Card
            onClick={() => setOTPMethod('sms')}
            className={`cursor-pointer border-2 transition-all ${
              otpMethod === 'sms'
                ? 'border-indigo-600 bg-indigo-50/30 shadow-md'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <CardContent className="p-4 text-center">
              <MessageSquare className={`h-8 w-8 mx-auto mb-2 ${
                otpMethod === 'sms' ? 'text-indigo-600' : 'text-slate-400'
              }`} />
              <h4 className="font-semibold text-slate-900 text-sm mb-1">SMS Only</h4>
              <p className="text-xs text-slate-600">Text message</p>
            </CardContent>
          </Card>

          {/* Email Only */}
          <Card
            onClick={() => setOTPMethod('email')}
            className={`cursor-pointer border-2 transition-all ${
              otpMethod === 'email'
                ? 'border-indigo-600 bg-indigo-50/30 shadow-md'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <CardContent className="p-4 text-center">
              <Mail className={`h-8 w-8 mx-auto mb-2 ${
                otpMethod === 'email' ? 'text-indigo-600' : 'text-slate-400'
              }`} />
              <h4 className="font-semibold text-slate-900 text-sm mb-1">Email Only</h4>
              <p className="text-xs text-slate-600">Email message</p>
            </CardContent>
          </Card>

          {/* Both */}
          <Card
            onClick={() => setOTPMethod('both')}
            className={`cursor-pointer border-2 transition-all ${
              otpMethod === 'both'
                ? 'border-indigo-600 bg-indigo-50/30 shadow-md'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <MessageSquare className={`h-6 w-6 ${
                  otpMethod === 'both' ? 'text-indigo-600' : 'text-slate-400'
                }`} />
                <Mail className={`h-6 w-6 ${
                  otpMethod === 'both' ? 'text-indigo-600' : 'text-slate-400'
                }`} />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm mb-1">Both</h4>
              <p className="text-xs text-slate-600">
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  Recommended
                </Badge>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Twilio SMS Setup */}
      {(otpMethod === 'sms' || otpMethod === 'both') && (
        <Card className="mb-6 border-slate-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              <h4 className="font-semibold text-slate-900">Twilio SMS Configuration</h4>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twilioPhone" className="text-sm font-medium text-slate-700">
                  Twilio Phone Number
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="twilioPhone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={twilioPhone}
                    onChange={(e) => setTwilioPhone(e.target.value)}
                    disabled={twilioStatus === 'success'}
                    className="h-11 text-base flex-1"
                  />
                  {twilioStatus !== 'success' && (
                    <Button
                      onClick={handleVerifyTwilio}
                      disabled={!twilioPhone || isTwilioVerifying}
                      className="h-11 px-5 bg-indigo-600 hover:bg-indigo-700"
                    >
                      {isTwilioVerifying ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        'Verify'
                      )}
                    </Button>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Your Twilio phone number that will send OTP codes
                </p>
              </div>

              {twilioStatus === 'success' && (
                <Alert className="border-green-200 bg-green-50">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Twilio phone number verified successfully!
                  </AlertDescription>
                </Alert>
              )}

              {twilioStatus === 'error' && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Failed to verify Twilio phone number. Please check and try again.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SendGrid Email Setup */}
      {(otpMethod === 'email' || otpMethod === 'both') && (
        <Card className="mb-6 border-slate-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="h-5 w-5 text-indigo-600" />
              <h4 className="font-semibold text-slate-900">SendGrid Email Configuration</h4>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sendgridApiKey" className="text-sm font-medium text-slate-700">
                  SendGrid API Key
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="sendgridApiKey"
                    type="password"
                    placeholder="SG.xxxxxxxxxxxxxxxxxxxxx"
                    value={sendgridApiKey}
                    onChange={(e) => setSendgridApiKey(e.target.value)}
                    disabled={sendgridStatus === 'success'}
                    className="h-11 text-base flex-1 font-mono"
                  />
                  {sendgridStatus !== 'success' && (
                    <Button
                      onClick={handleVerifySendGrid}
                      disabled={!sendgridApiKey || isSendGridVerifying}
                      className="h-11 px-5 bg-indigo-600 hover:bg-indigo-700"
                    >
                      {isSendGridVerifying ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        'Verify'
                      )}
                    </Button>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Your SendGrid API key for sending OTP emails
                </p>
              </div>

              {sendgridStatus === 'success' && (
                <Alert className="border-green-200 bg-green-50">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    SendGrid API key verified successfully!
                  </AlertDescription>
                </Alert>
              )}

              {sendgridStatus === 'error' && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Failed to verify SendGrid API key. Please check and try again.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Example OTP Message */}
      {canContinue && (
        <Card className="mb-6 border-indigo-200 bg-indigo-50/30">
          <CardContent className="p-5">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Example OTP Message
            </h4>
            {(otpMethod === 'sms' || otpMethod === 'both') && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-indigo-600" />
                  <span className="text-xs font-semibold text-slate-700">SMS</span>
                </div>
                <div className="bg-white rounded-lg p-3 text-xs text-slate-700 font-mono border border-indigo-200">
                  Your verification code for Damira Dental is: 123456. Valid for 10 minutes.
                </div>
              </div>
            )}
            {(otpMethod === 'email' || otpMethod === 'both') && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-indigo-600" />
                  <span className="text-xs font-semibold text-slate-700">Email</span>
                </div>
                <div className="bg-white rounded-lg p-3 text-xs text-slate-700 border border-indigo-200">
                  <p className="font-semibold mb-1">Subject: Your Verification Code</p>
                  <p>Your verification code is: <strong className="text-lg">123456</strong></p>
                  <p className="text-slate-500 mt-1">This code will expire in 10 minutes.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <div className="pt-6 border-t border-slate-200">
        <Button
          onClick={handleContinue}
          disabled={!canContinue}
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium"
        >
          Continue to Appointment Settings
        </Button>
        {!canContinue && (
          <p className="text-sm text-red-600 text-center mt-2">
            Please verify all selected OTP methods to continue
          </p>
        )}
      </div>
    </div>
  )
}
