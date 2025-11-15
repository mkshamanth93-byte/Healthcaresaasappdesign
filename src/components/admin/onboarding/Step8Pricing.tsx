import { useState } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { PoundSterling, Lock, Info } from 'lucide-react'
import { Badge } from '../../ui/badge'

interface PricingRule {
  reasonId: string
  reasonName: string
  categoryName: string
  totalPrice: number // NEW: Optional total price (0 = hidden in widget)
  depositAmount: number // Required deposit
}

interface Step8PricingProps {
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
  onComplete: (pricingRules: PricingRule[]) => void
}

export function Step8Pricing({ categories, onComplete }: Step8PricingProps) {
  // Initialize pricing rules for all enabled reasons
  const enabledReasons = categories.flatMap((cat) =>
    cat.reasons
      .filter((r) => r.enabled)
      .map((r) => ({
        reasonId: r.id,
        reasonName: r.name,
        categoryName: cat.name,
        totalPrice: 0, // NEW: Default to 0 (hidden)
        depositAmount: cat.name === 'Exam' ? 50 : cat.name === 'Hygiene' ? 25 : 75,
      }))
  )

  const [pricingRules, setPricingRules] = useState<PricingRule[]>(enabledReasons)

  const updatePricingRule = (reasonId: string, updates: Partial<PricingRule>) => {
    setPricingRules((prev) =>
      prev.map((rule) => (rule.reasonId === reasonId ? { ...rule, ...updates } : rule))
    )
  }

  const handleContinue = () => {
    onComplete(pricingRules)
  }

  const groupedByCategory = categories.map((cat) => ({
    ...cat,
    rules: pricingRules.filter((rule) => rule.categoryName === cat.name),
  }))

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
            <PoundSterling className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Pricing Configuration
            </h2>
            <p className="text-sm text-slate-500">
              Set prices and deposits for each appointment type
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
                Pricing & Deposit Requirements
              </h4>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• <strong>Total Price:</strong> Full cost of appointment (optional, leave empty to hide)</li>
                <li>• <strong>Deposit:</strong> Amount collected at booking (required)</li>
                <li>• Refunds are handled based on your cancellation policy (Step 6)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Badges */}
      <div className="flex gap-3 mb-6">
        <Badge variant="secondary" className="bg-green-100 text-green-700">
          Phase 1: Single Appointments ✓
        </Badge>
        <Badge variant="secondary" className="bg-slate-100 text-slate-500">
          <Lock className="h-3 w-3 mr-1" />
          Phase 3: Combo Pricing
        </Badge>
        <Badge variant="secondary" className="bg-slate-100 text-slate-500">
          <Lock className="h-3 w-3 mr-1" />
          Phase 4: Family Pricing
        </Badge>
      </div>

      {/* Pricing Rules by Category */}
      <div className="space-y-6 mb-8">
        {groupedByCategory.map((category) => {
          if (category.rules.length === 0) return null

          return (
            <Card key={category.id} className="border-slate-200 bg-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{category.icon}</span>
                  <h4 className="font-semibold text-slate-900">{category.name}</h4>
                  <Badge variant="outline" className="ml-auto">
                    {category.rules.length} appointment{category.rules.length !== 1 ? 's' : ''}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {category.rules.map((rule) => (
                    <div
                      key={rule.reasonId}
                      className="p-4 bg-slate-50 rounded-lg"
                    >
                      <div className="mb-3">
                        <p className="text-sm font-medium text-slate-900">{rule.reasonName}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Total Price */}
                        <div className="space-y-1">
                          <Label htmlFor={`total-${rule.reasonId}`} className="text-xs text-slate-600">
                            Total Price (Optional)
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                              £
                            </span>
                            <Input
                              id={`total-${rule.reasonId}`}
                              type="number"
                              value={rule.totalPrice || ''}
                              onChange={(e) =>
                                updatePricingRule(rule.reasonId, {
                                  totalPrice: parseFloat(e.target.value) || 0,
                                })
                              }
                              placeholder="0.00"
                              className="h-10 text-sm pl-7"
                              min="0"
                              step="1"
                            />
                          </div>
                          <p className="text-xs text-slate-500">
                            {rule.totalPrice > 0 ? 'Will show in widget' : 'Hidden (empty)'}
                          </p>
                        </div>

                        {/* Deposit Amount */}
                        <div className="space-y-1">
                          <Label htmlFor={`deposit-${rule.reasonId}`} className="text-xs text-slate-600">
                            Deposit Amount (Required)
                          </Label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                              £
                            </span>
                            <Input
                              id={`deposit-${rule.reasonId}`}
                              type="number"
                              value={rule.depositAmount}
                              onChange={(e) =>
                                updatePricingRule(rule.reasonId, {
                                  depositAmount: parseFloat(e.target.value) || 0,
                                })
                              }
                              className="h-10 text-sm pl-7"
                              min="0"
                              step="1"
                            />
                          </div>
                          <p className="text-xs text-slate-500">
                            Collected at booking
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary Card */}
      <Card className="mb-6 border-indigo-200 bg-indigo-50/30">
        <CardContent className="p-5">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">
            Pricing Summary
          </h4>
          <div className="space-y-2 text-sm">
            {pricingRules.map((rule) => (
              <div
                key={rule.reasonId}
                className="flex justify-between py-2 border-b border-indigo-100 last:border-0"
              >
                <span className="text-slate-600">{rule.reasonName}</span>
                <div className="text-right">
                  {rule.totalPrice > 0 && (
                    <div className="text-xs text-slate-500">
                      Total: £{rule.totalPrice.toFixed(2)}
                    </div>
                  )}
                  <div className="font-medium text-slate-900">
                    Deposit: £{rule.depositAmount.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">
            💡 You can override these amounts per location in Settings
          </p>
        </CardContent>
      </Card>

      {/* Future Phases */}
      <Card className="mb-6 border-slate-200 bg-slate-50">
        <CardContent className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <Lock className="h-5 w-5 text-slate-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                Coming Soon: Advanced Pricing
              </h4>
              <p className="text-xs text-slate-600 mb-3">
                Future phases will unlock additional pricing options
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Phase 3: Combo */}
            <div className="bg-white rounded-lg p-3 border border-slate-200 opacity-60">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Phase 3
                </Badge>
                <h5 className="text-sm font-semibold text-slate-900">Combo Appointment Pricing</h5>
              </div>
              <p className="text-xs text-slate-600">
                Set discounted deposit for exam + hygiene combos (e.g., £60 instead of £75)
              </p>
            </div>

            {/* Phase 4: Family */}
            <div className="bg-white rounded-lg p-3 border border-slate-200 opacity-60">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Phase 4
                </Badge>
                <h5 className="text-sm font-semibold text-slate-900">Family Appointment Pricing</h5>
              </div>
              <p className="text-xs text-slate-600">
                Set family discounts for multiple patients booking together (e.g., 2nd patient 20% off)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="mb-6 border-amber-200 bg-amber-50/50">
        <CardContent className="p-4">
          <p className="text-sm text-slate-700">
            <strong>💡 Pricing Tips:</strong>
          </p>
          <ul className="text-xs text-slate-600 mt-2 space-y-1 ml-4">
            <li>• New patient exams typically have higher deposits (£50-75)</li>
            <li>• Recall/cleaning appointments usually have lower deposits (£25-35)</li>
            <li>• Leave Total Price empty if you don't want to display pricing in the widget</li>
            <li>• Consider your no-show rate when setting deposit amounts</li>
          </ul>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="pt-6 border-t border-slate-200">
        <Button
          onClick={handleContinue}
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium"
        >
          Continue to Default Procedures
        </Button>
      </div>
    </div>
  )
}