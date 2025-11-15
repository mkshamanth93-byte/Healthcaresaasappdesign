import { useState } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Label } from '../../ui/label'
import { MapPin, Check, ExternalLink, Globe } from 'lucide-react'
import { Switch } from '../../ui/switch'
import { Badge } from '../../ui/badge'

interface Location {
  id: string
  name: string
  address: string
  enabled: boolean
  allowNHS: boolean // NEW: Allow NHS appointments
}

interface Step2LocationsProps {
  onComplete: (locations: Location[], widgetType: 'practice' | 'location-specific' | 'both') => void
}

export function Step2Locations({ onComplete }: Step2LocationsProps) {
  // Mock locations from CareStack (Cursor will replace with real API)
  const [locations, setLocations] = useState<Location[]>([
    {
      id: 'loc-1',
      name: 'Downtown Office',
      address: '123 Main St, Boston, MA 02101',
      enabled: true,
      allowNHS: true, // NEW: Allow NHS appointments
    },
    {
      id: 'loc-2',
      name: 'Westside Office',
      address: '456 West Ave, Boston, MA 02102',
      enabled: true,
      allowNHS: false, // NEW: Allow NHS appointments
    },
    {
      id: 'loc-3',
      name: 'Eastside Office',
      address: '789 East Blvd, Boston, MA 02103',
      enabled: false,
      allowNHS: true, // NEW: Allow NHS appointments
    },
  ])

  const [widgetType, setWidgetType] = useState<'practice' | 'location-specific' | 'both'>('practice')

  const toggleLocation = (locationId: string) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === locationId ? { ...loc, enabled: !loc.enabled } : loc
      )
    )
  }

  const toggleNHS = (locationId: string) => {
    setLocations((prev) =>
      prev.map((loc) =>
        loc.id === locationId ? { ...loc, allowNHS: !loc.allowNHS } : loc
      )
    )
  }

  const handleContinue = () => {
    onComplete(locations, widgetType)
  }

  const enabledCount = locations.filter((loc) => loc.enabled).length

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
            <MapPin className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Select Locations
            </h2>
            <p className="text-sm text-slate-500">
              Choose which locations accept online appointments
            </p>
          </div>
        </div>
      </div>

      {/* Synced Locations Info */}
      <Card className="mb-6 border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">
                {locations.length} locations synced from CareStack
              </p>
              <p className="text-xs text-slate-600">
                {enabledCount} location{enabledCount !== 1 ? 's' : ''} enabled for online booking
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Locations List */}
      <div className="space-y-4 mb-8">
        <Label className="text-sm font-medium text-slate-700">
          Enable/Disable Locations
        </Label>
        {locations.map((location) => (
          <Card
            key={location.id}
            className={`border-2 transition-all ${
              location.enabled
                ? 'border-indigo-200 bg-indigo-50/30'
                : 'border-slate-200 bg-white'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-base font-semibold text-slate-900">
                      {location.name}
                    </h4>
                    {location.enabled && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Enabled
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{location.address}</p>
                </div>
                <div className="flex-shrink-0">
                  <Switch
                    checked={location.enabled}
                    onCheckedChange={() => toggleLocation(location.id)}
                  />
                </div>
              </div>
              
              {/* NHS Toggle */}
              {location.enabled && (
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor={`nhs-${location.id}`} className="text-sm font-medium text-slate-900 cursor-pointer">
                        Allow NHS - Exams
                      </Label>
                      <p className="text-xs text-slate-600">
                        Enable NHS-funded exams at this location
                      </p>
                    </div>
                    <Switch
                      id={`nhs-${location.id}`}
                      checked={location.allowNHS}
                      onCheckedChange={() => toggleNHS(location.id)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Widget Configuration - CRITICAL SECTION */}
      <div className="pt-6 border-t border-slate-200">
        <Label className="text-base font-semibold text-slate-900 mb-4 block">
          Widget Configuration
        </Label>
        <p className="text-sm text-slate-600 mb-6">
          Choose how patients will access your booking widget
        </p>

        <div className="space-y-4">
          {/* Option 1: Practice-Level Widget */}
          <Card
            onClick={() => setWidgetType('practice')}
            className={`cursor-pointer border-2 transition-all ${
              widgetType === 'practice'
                ? 'border-indigo-600 bg-indigo-50/30 shadow-md'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    widgetType === 'practice'
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-slate-300'
                  }`}
                >
                  {widgetType === 'practice' && (
                    <div className="h-2 w-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-5 w-5 text-indigo-600" />
                    <h4 className="font-semibold text-slate-900">
                      Practice-Level Widget
                    </h4>
                    <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                      Recommended
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    One widget for all locations. Patient selects location during booking.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ExternalLink className="h-3 w-3" />
                    <code className="bg-slate-100 px-2 py-1 rounded">
                      widget.yourapp.com/damira-dental
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Option 2: Location-Specific Widgets */}
          <Card
            onClick={() => setWidgetType('location-specific')}
            className={`cursor-pointer border-2 transition-all ${
              widgetType === 'location-specific'
                ? 'border-indigo-600 bg-indigo-50/30 shadow-md'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    widgetType === 'location-specific'
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-slate-300'
                  }`}
                >
                  {widgetType === 'location-specific' && (
                    <div className="h-2 w-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-indigo-600" />
                    <h4 className="font-semibold text-slate-900">
                      Location-Specific Widgets
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Separate widget per location. Patient skips location selection step.
                  </p>
                  <div className="space-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-3 w-3" />
                      <code className="bg-slate-100 px-2 py-1 rounded">
                        widget.yourapp.com/damira-dental/downtown
                      </code>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-3 w-3" />
                      <code className="bg-slate-100 px-2 py-1 rounded">
                        widget.yourapp.com/damira-dental/westside
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Option 3: Both */}
          <Card
            onClick={() => setWidgetType('both')}
            className={`cursor-pointer border-2 transition-all ${
              widgetType === 'both'
                ? 'border-indigo-600 bg-indigo-50/30 shadow-md'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    widgetType === 'both'
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-slate-300'
                  }`}
                >
                  {widgetType === 'both' && (
                    <div className="h-2 w-2 bg-white rounded-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-5 w-5 text-indigo-600" />
                    <h4 className="font-semibold text-slate-900">
                      Enable Both Options
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Maximum flexibility. Use practice-level OR location-specific widgets.
                  </p>
                  <p className="text-xs text-slate-500">
                    Best for practices with multiple marketing channels
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <Button
          onClick={handleContinue}
          disabled={enabledCount === 0}
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium"
        >
          Continue with {enabledCount} Location{enabledCount !== 1 ? 's' : ''}
        </Button>
        {enabledCount === 0 && (
          <p className="text-sm text-red-600 text-center mt-2">
            Please enable at least one location to continue
          </p>
        )}
      </div>
    </div>
  )
}