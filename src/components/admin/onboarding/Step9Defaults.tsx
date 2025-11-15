import { useState } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Label } from '../../ui/label'
import { CheckCircle2, Lock, Info } from 'lucide-react'
import { Badge } from '../../ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

interface Step9DefaultsProps {
  categories: Array<{
    id: string
    name: string
    icon: string
    reasons: Array<{
      id: string
      name: string
      enabled: boolean
    }>
  }>
  onComplete: (defaults: { defaultExam: string; defaultHygiene: string }) => void
}

export function Step9Defaults({ categories, onComplete }: Step9DefaultsProps) {
  const examCategory = categories.find((cat) => cat.name === 'Exam')
  const hygieneCategory = categories.find((cat) => cat.name === 'Hygiene')

  const examReasons = examCategory?.reasons.filter((r) => r.enabled) || []
  const hygieneReasons = hygieneCategory?.reasons.filter((r) => r.enabled) || []

  const [defaultExam, setDefaultExam] = useState(examReasons[0]?.id || '')
  const [defaultHygiene, setDefaultHygiene] = useState(hygieneReasons[0]?.id || '')

  const handleComplete = () => {
    onComplete({ defaultExam, defaultHygiene })
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Default Procedures
            </h2>
            <p className="text-sm text-slate-500">
              Set default appointment types for combo bookings
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
                Combo Appointments (Phase 3)
              </h4>
              <p className="text-xs text-slate-600 mb-2">
                When Phase 3 launches, patients will be able to book Exam + Hygiene combo appointments. These defaults determine which specific procedures are included.
              </p>
              <p className="text-xs text-slate-600">
                Example: "New Patient Complete Visit" = Default Exam + Default Hygiene
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Badge */}
      <div className="flex gap-3 mb-6">
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          Phase 1: Single Appointments ✓
        </Badge>
        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
          <Lock className="h-3 w-3 mr-1" />
          Phase 3: Combo Appointments (Uses these defaults)
        </Badge>
      </div>

      {/* Default Selections */}
      <div className="space-y-6 mb-8">
        {/* Default Exam */}
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🔍</span>
              <h4 className="font-semibold text-slate-900">Default Exam Procedure</h4>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultExam" className="text-sm text-slate-700">
                Select the exam procedure to include in combo appointments
              </Label>
              {examReasons.length > 0 ? (
                <Select value={defaultExam} onValueChange={setDefaultExam}>
                  <SelectTrigger id="defaultExam" className="h-11">
                    <SelectValue placeholder="Select default exam..." />
                  </SelectTrigger>
                  <SelectContent>
                    {examReasons.map((reason) => (
                      <SelectItem key={reason.id} value={reason.id}>
                        {reason.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-amber-600 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  ⚠️ No exam procedures enabled. Go back to Step 7 to enable at least one exam procedure.
                </div>
              )}
              <p className="text-xs text-slate-500">
                This will be the default exam for "Complete Visit" combo appointments
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Default Hygiene */}
        <Card className="border-slate-200 bg-white">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🦷</span>
              <h4 className="font-semibold text-slate-900">Default Hygiene Procedure</h4>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultHygiene" className="text-sm text-slate-700">
                Select the hygiene procedure to include in combo appointments
              </Label>
              {hygieneReasons.length > 0 ? (
                <Select value={defaultHygiene} onValueChange={setDefaultHygiene}>
                  <SelectTrigger id="defaultHygiene" className="h-11">
                    <SelectValue placeholder="Select default hygiene..." />
                  </SelectTrigger>
                  <SelectContent>
                    {hygieneReasons.map((reason) => (
                      <SelectItem key={reason.id} value={reason.id}>
                        {reason.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm text-amber-600 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  ⚠️ No hygiene procedures enabled. Go back to Step 7 to enable at least one hygiene procedure.
                </div>
              )}
              <p className="text-xs text-slate-500">
                This will be the default hygiene for "Complete Visit" combo appointments
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Card */}
      {defaultExam && defaultHygiene && (
        <Card className="mb-6 border-purple-200 bg-purple-50/30">
          <CardContent className="p-5">
            <div className="flex items-start gap-3 mb-3">
              <Lock className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">
                  Phase 3 Preview: Complete Visit Appointment
                </h4>
                <p className="text-xs text-slate-600 mb-3">
                  When combo appointments launch, here's what patients will see:
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
                <h5 className="font-semibold text-slate-900">New Patient Complete Visit</h5>
                <Badge variant="outline" className="ml-auto bg-purple-50 text-purple-700 border-purple-200">
                  Combo
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="text-base">🔍</span>
                  <span>{examReasons.find((r) => r.id === defaultExam)?.name}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="text-base">🦷</span>
                  <span>{hygieneReasons.find((r) => r.id === defaultHygiene)?.name}</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3 italic">
                "Book both your exam and cleaning in one convenient appointment!"
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customization Note */}
      <Card className="mb-6 border-amber-200 bg-amber-50/50">
        <CardContent className="p-4">
          <p className="text-sm text-slate-700">
            <strong>💡 Customization:</strong>
          </p>
          <p className="text-xs text-slate-600 mt-1">
            When Phase 3 launches, you'll be able to create multiple combo appointment types with different combinations of procedures. These defaults are just the starting point.
          </p>
        </CardContent>
      </Card>

      {/* Complete Button */}
      <div className="pt-6 border-t border-slate-200">
        <Button
          onClick={handleComplete}
          disabled={!defaultExam || !defaultHygiene}
          className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-medium shadow-lg shadow-green-500/20"
        >
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Complete Setup
        </Button>
        {(!defaultExam || !defaultHygiene) && (
          <p className="text-sm text-red-600 text-center mt-2">
            Please select both default procedures to complete setup
          </p>
        )}
      </div>
    </div>
  )
}
