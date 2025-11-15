import { useState } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Label } from '../../ui/label'
import { Users, Check, Star } from 'lucide-react'
import { Switch } from '../../ui/switch'
import { Badge } from '../../ui/badge'
import { Avatar, AvatarFallback } from '../../ui/avatar'

interface Provider {
  id: string
  name: string
  credentials: string
  specialty: string
  rating?: number
  reviewCount?: number
  enabled: boolean
  locations: string[]
}

interface Step3ProvidersProps {
  locations: Array<{ id: string; name: string; enabled: boolean }>
  onComplete: (providers: Provider[]) => void
}

export function Step3Providers({ locations, onComplete }: Step3ProvidersProps) {
  // Mock providers from CareStack (Cursor will replace with real API)
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: 'prov-1',
      name: 'Dr. Sarah Johnson',
      credentials: 'DDS',
      specialty: 'General Dentistry',
      rating: 4.9,
      reviewCount: 127,
      enabled: true,
      locations: ['loc-1', 'loc-2'],
    },
    {
      id: 'prov-2',
      name: 'Dr. Michael Chen',
      credentials: 'DMD',
      specialty: 'Orthodontics',
      rating: 4.8,
      reviewCount: 89,
      enabled: true,
      locations: ['loc-1'],
    },
    {
      id: 'prov-3',
      name: 'Dr. Emily Rodriguez',
      credentials: 'DDS',
      specialty: 'Pediatric Dentistry',
      rating: 5.0,
      reviewCount: 203,
      enabled: true,
      locations: ['loc-2', 'loc-3'],
    },
    {
      id: 'prov-4',
      name: 'Sarah Williams',
      credentials: 'RDH',
      specialty: 'Dental Hygiene',
      rating: 4.7,
      reviewCount: 56,
      enabled: true,
      locations: ['loc-1', 'loc-2'],
    },
    {
      id: 'prov-5',
      name: 'Dr. James Brown',
      credentials: 'DDS, MS',
      specialty: 'Endodontics',
      rating: 4.9,
      reviewCount: 145,
      enabled: false,
      locations: ['loc-3'],
    },
  ])

  const toggleProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((prov) =>
        prov.id === providerId ? { ...prov, enabled: !prov.enabled } : prov
      )
    )
  }

  const handleContinue = () => {
    onComplete(providers)
  }

  const enabledCount = providers.filter((prov) => prov.enabled).length
  const enabledLocations = locations.filter((loc) => loc.enabled)

  const getLocationNames = (locationIds: string[]) => {
    return locationIds
      .map((id) => {
        const location = locations.find((loc) => loc.id === id)
        return location?.name
      })
      .filter(Boolean)
      .join(', ')
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
            <Users className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Select Providers
            </h2>
            <p className="text-sm text-slate-500">
              Choose which providers accept online appointments
            </p>
          </div>
        </div>
      </div>

      {/* Synced Providers Info */}
      <Card className="mb-6 border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">
                {providers.length} providers synced from CareStack
              </p>
              <p className="text-xs text-slate-600">
                {enabledCount} provider{enabledCount !== 1 ? 's' : ''} enabled for online booking
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Providers List */}
      <div className="space-y-4 mb-8">
        <Label className="text-sm font-medium text-slate-700">
          Enable/Disable Providers
        </Label>
        {providers.map((provider) => {
          const isAvailableInEnabledLocations = provider.locations.some((locId) =>
            enabledLocations.find((loc) => loc.id === locId)
          )

          return (
            <Card
              key={provider.id}
              className={`border-2 transition-all ${
                provider.enabled
                  ? 'border-indigo-200 bg-indigo-50/30'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-slate-200">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white font-semibold">
                      {provider.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-semibold text-slate-900">
                        {provider.name}
                      </h4>
                      <span className="text-sm text-slate-500">{provider.credentials}</span>
                      {provider.enabled && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Enabled
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{provider.specialty}</p>
                    {provider.rating && (
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-slate-700">{provider.rating}</span>
                        </div>
                        <span>·</span>
                        <span>{provider.reviewCount} reviews</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                        {getLocationNames(provider.locations) || 'No locations'}
                      </Badge>
                      {!isAvailableInEnabledLocations && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Not in enabled locations
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Switch
                      checked={provider.enabled}
                      onCheckedChange={() => toggleProvider(provider.id)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Info Card */}
      <Card className="mb-6 border-indigo-200 bg-indigo-50/50">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Users className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                Provider Settings
              </h4>
              <p className="text-xs text-slate-600 mb-2">
                You can customize each provider's availability, appointment types, and locations later in Settings.
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Set custom working hours per provider</li>
                <li>• Assign specific appointment types</li>
                <li>• Configure provider-specific pricing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="pt-6 border-t border-slate-200">
        <Button
          onClick={handleContinue}
          disabled={enabledCount === 0}
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium"
        >
          Continue with {enabledCount} Provider{enabledCount !== 1 ? 's' : ''}
        </Button>
        {enabledCount === 0 && (
          <p className="text-sm text-red-600 text-center mt-2">
            Please enable at least one provider to continue
          </p>
        )}
      </div>
    </div>
  )
}
