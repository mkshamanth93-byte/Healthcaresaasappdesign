import { useState } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'
import { Settings, Clock, Calendar, AlertCircle, Info } from 'lucide-react'
import { Switch } from '../../ui/switch'
import { Badge } from '../../ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

interface Step6SettingsProps {
  onComplete: (settings: {
    leadTimeHours: number
    sameDayBooking: boolean
    bufferTimeMins: number
    cancellationHours: number
    cancellationPolicy: string
  }) => void
}

export function Step6Settings({ onComplete }: Step6SettingsProps) {
  const [leadTimeHours, setLeadTimeHours] = useState(24)
  const [sameDayBooking, setSameDayBooking] = useState(false)
  const [bufferTimeMins, setBufferTimeMins] = useState(15)
  const [cancellationHours, setCancellationHours] = useState(24)
  const [cancellationPolicy, setCancellationPolicy] = useState(
    'Full refund if cancelled 24 hours before appointment. No refund for late cancellations.'
  )

  const handleContinue = () => {
    onComplete({
      leadTimeHours,
      sameDayBooking,
      bufferTimeMins,
      cancellationHours,
      cancellationPolicy,
    })
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
            <Settings className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Appointment Settings
            </h2>
            <p className="text-sm text-slate-500">
              Configure booking rules and policies
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
                <Info className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                Account-Level Defaults
              </h4>
              <p className="text-xs text-slate-600">
                These settings apply to all locations. You can override them per location later in Settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Booking Lead Time */}
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-slate-900 mb-1">
                  Booking Lead Time
                </h4>
                <p className="text-sm text-slate-600">
                  Minimum hours in advance for booking appointments
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leadTime" className="text-sm font-medium text-slate-700">
                    Lead Time (hours)
                  </Label>
                  <Select
                    value={leadTimeHours.toString()}
                    onValueChange={(value) => setLeadTimeHours(parseInt(value))}
                  >
                    <SelectTrigger id="leadTime" className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="12">12 hours</SelectItem>
                      <SelectItem value="24">24 hours (Recommended)</SelectItem>
                      <SelectItem value="48">48 hours</SelectItem>
                      <SelectItem value="72">72 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bufferTime" className="text-sm font-medium text-slate-700">
                    Buffer Time (mins)
                  </Label>
                  <Select
                    value={bufferTimeMins.toString()}
                    onValueChange={(value) => setBufferTimeMins(parseInt(value))}
                  >
                    <SelectTrigger id="bufferTime" className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No buffer</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="10">10 minutes</SelectItem>
                      <SelectItem value="15">15 minutes (Recommended)</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  Patients cannot book appointments starting within {leadTimeHours} hours from now. Buffer time adds {bufferTimeMins} minutes between consecutive appointments.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Same-Day Booking */}
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-slate-900 mb-1">
                    Same-Day Booking
                  </h4>
                  <p className="text-sm text-slate-600 mb-2">
                    Allow patients to book appointments on the same day
                  </p>
                  {sameDayBooking && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Enabled
                    </Badge>
                  )}
                </div>
              </div>
              <Switch
                checked={sameDayBooking}
                onCheckedChange={setSameDayBooking}
              />
            </div>

            {sameDayBooking && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600">
                  Same-day appointments must still respect the {leadTimeHours}-hour lead time. For example, if it's 9:00 AM and lead time is 24 hours, the earliest available slot is tomorrow at 9:00 AM.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cancellation Policy */}
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-slate-900 mb-1">
                  Cancellation Policy
                </h4>
                <p className="text-sm text-slate-600">
                  Define refund rules for patient cancellations
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cancellationHours" className="text-sm font-medium text-slate-700">
                  Refund Threshold (hours before appointment)
                </Label>
                <Select
                  value={cancellationHours.toString()}
                  onValueChange={(value) => setCancellationHours(parseInt(value))}
                >
                  <SelectTrigger id="cancellationHours" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 hours</SelectItem>
                    <SelectItem value="24">24 hours (Recommended)</SelectItem>
                    <SelectItem value="48">48 hours</SelectItem>
                    <SelectItem value="72">72 hours</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500">
                  Full refund if cancelled at least {cancellationHours} hours before appointment
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="policy" className="text-sm font-medium text-slate-700">
                  Cancellation Policy Text
                </Label>
                <Textarea
                  id="policy"
                  value={cancellationPolicy}
                  onChange={(e) => setCancellationPolicy(e.target.value)}
                  rows={4}
                  className="text-sm"
                  placeholder="Enter your cancellation policy..."
                />
                <p className="text-xs text-slate-500">
                  This will be shown to patients during the booking process
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Summary */}
        <Card className="border-indigo-200 bg-indigo-50/30">
          <CardContent className="p-5">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Settings Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-indigo-100">
                <span className="text-slate-600">Booking Lead Time</span>
                <span className="font-medium text-slate-900">{leadTimeHours} hours</span>
              </div>
              <div className="flex justify-between py-2 border-b border-indigo-100">
                <span className="text-slate-600">Buffer Time</span>
                <span className="font-medium text-slate-900">{bufferTimeMins} minutes</span>
              </div>
              <div className="flex justify-between py-2 border-b border-indigo-100">
                <span className="text-slate-600">Same-Day Booking</span>
                <span className="font-medium text-slate-900">
                  {sameDayBooking ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Refund Threshold</span>
                <span className="font-medium text-slate-900">{cancellationHours} hours notice</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              💡 You can customize these settings per location in Settings → Locations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Continue Button */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <Button
          onClick={handleContinue}
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium"
        >
          Continue to Procedure Mapping
        </Button>
        <p className="text-xs text-slate-500 text-center mt-3">
          Next: Map appointment types to CareStack production codes
        </p>
      </div>
    </div>
  )
}
