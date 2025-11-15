import { useState } from 'react'
import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'
import { Stethoscope, Plus, Trash2, ChevronDown, ChevronRight, GripVertical, Edit2 } from 'lucide-react'
import { Switch } from '../../ui/switch'
import { Badge } from '../../ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

interface ProductionType {
  id: string
  code: string
  name: string
}

interface Reason {
  id: string
  name: string
  description: string
  detailedInstructions: string
  duration: number
  productionTypes: string[] // IDs of selected production types
  enabled: boolean
}

interface Category {
  id: string
  name: string
  description: string
  icon: string
  reasons: Reason[]
  expanded: boolean
}

interface Step7ProceduresProps {
  onComplete: (categories: Category[]) => void
}

// Mock CareStack production types (Cursor will replace with real API)
const mockProductionTypes: ProductionType[] = [
  { id: 'pt-1', code: 'D0150', name: 'Comprehensive Oral Evaluation' },
  { id: 'pt-2', code: 'D0120', name: 'Periodic Oral Evaluation' },
  { id: 'pt-3', code: 'D0140', name: 'Limited Oral Evaluation' },
  { id: 'pt-4', code: 'D1110', name: 'Prophylaxis - Adult' },
  { id: 'pt-5', code: 'D1120', name: 'Prophylaxis - Child' },
  { id: 'pt-6', code: 'D2150', name: 'Amalgam - Two Surfaces' },
  { id: 'pt-7', code: 'D2160', name: 'Amalgam - Three Surfaces' },
  { id: 'pt-8', code: 'D2740', name: 'Crown - Porcelain/Ceramic' },
  { id: 'pt-9', code: 'D3310', name: 'Root Canal - Anterior' },
  { id: 'pt-10', code: 'D9110', name: 'Emergency Palliative Treatment' },
]

export function Step7Procedures({ onComplete }: Step7ProceduresProps) {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'cat-1',
      name: 'Exam',
      description: 'Comprehensive dental examinations and assessments',
      icon: '🔍',
      expanded: true,
      reasons: [
        {
          id: 'r-1',
          name: 'New Patient Exam',
          description: 'Complete evaluation for first-time patients',
          detailedInstructions: 'Includes full mouth examination, X-rays, and treatment planning',
          duration: 60,
          productionTypes: ['pt-1'],
          enabled: true,
        },
        {
          id: 'r-2',
          name: 'Emergency Exam',
          description: 'Urgent dental problem assessment',
          detailedInstructions: 'Focused examination to address immediate dental concerns',
          duration: 30,
          productionTypes: ['pt-3', 'pt-10'],
          enabled: true,
        },
      ],
    },
    {
      id: 'cat-2',
      name: 'Hygiene',
      description: 'Professional cleaning and preventive care',
      icon: '🦷',
      expanded: true,
      reasons: [
        {
          id: 'r-3',
          name: 'Adult Cleaning (Recall)',
          description: 'Regular cleaning for existing patients',
          detailedInstructions: 'Includes scaling, polishing, and oral hygiene guidance',
          duration: 45,
          productionTypes: ['pt-2', 'pt-4'],
          enabled: true,
        },
        {
          id: 'r-4',
          name: 'Child Cleaning',
          description: 'Gentle cleaning for pediatric patients',
          detailedInstructions: 'Age-appropriate cleaning and fluoride treatment',
          duration: 30,
          productionTypes: ['pt-5'],
          enabled: true,
        },
      ],
    },
    {
      id: 'cat-3',
      name: 'Treatment',
      description: 'Restorative and cosmetic dental procedures',
      icon: '⚕️',
      expanded: false,
      reasons: [
        {
          id: 'r-5',
          name: 'Filling',
          description: 'Cavity repair and restoration',
          detailedInstructions: 'Composite or amalgam filling for decayed teeth',
          duration: 60,
          productionTypes: ['pt-6', 'pt-7'],
          enabled: true,
        },
        {
          id: 'r-6',
          name: 'Crown',
          description: 'Tooth cap placement',
          detailedInstructions: 'Custom crown preparation and fitting',
          duration: 90,
          productionTypes: ['pt-8'],
          enabled: false,
        },
      ],
    },
  ])

  const [editingCategory, setEditingCategory] = useState<string | null>(null)

  const toggleCategoryExpanded = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
      )
    )
  }

  const addCategory = () => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: 'New Category',
      description: 'Category description',
      icon: '📋',
      reasons: [],
      expanded: true,
    }
    setCategories((prev) => [...prev, newCategory])
  }

  const updateCategory = (categoryId: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, ...updates } : cat))
    )
  }

  const deleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
    }
  }

  const addReason = (categoryId: string) => {
    const newReason: Reason = {
      id: `r-${Date.now()}`,
      name: 'New Reason',
      description: 'Brief description',
      detailedInstructions: 'What is included in this appointment',
      duration: 30,
      productionTypes: [],
      enabled: true,
    }

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, reasons: [...cat.reasons, newReason] }
          : cat
      )
    )
  }

  const deleteReason = (categoryId: string, reasonId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, reasons: cat.reasons.filter((r) => r.id !== reasonId) }
          : cat
      )
    )
  }

  const updateReason = (
    categoryId: string,
    reasonId: string,
    updates: Partial<Reason>
  ) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              reasons: cat.reasons.map((r) =>
                r.id === reasonId ? { ...r, ...updates } : r
              ),
            }
          : cat
      )
    )
  }

  const toggleReasonEnabled = (categoryId: string, reasonId: string) => {
    updateReason(categoryId, reasonId, {
      enabled: !categories
        .find((c) => c.id === categoryId)
        ?.reasons.find((r) => r.id === reasonId)?.enabled,
    })
  }

  const toggleProductionType = (categoryId: string, reasonId: string, ptId: string) => {
    const reason = categories
      .find((c) => c.id === categoryId)
      ?.reasons.find((r) => r.id === reasonId)
    
    if (!reason) return

    const newProductionTypes = reason.productionTypes.includes(ptId)
      ? reason.productionTypes.filter((id) => id !== ptId)
      : [...reason.productionTypes, ptId]

    updateReason(categoryId, reasonId, { productionTypes: newProductionTypes })
  }

  const handleContinue = () => {
    onComplete(categories)
  }

  const totalReasons = categories.reduce((acc, cat) => acc + cat.reasons.length, 0)
  const enabledReasons = categories.reduce(
    (acc, cat) => acc + cat.reasons.filter((r) => r.enabled).length,
    0
  )

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Procedure Mapping
            </h2>
            <p className="text-sm text-slate-500">
              Configure appointment types and CareStack production codes
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
                <Stethoscope className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">
                Appointment Type Hierarchy
              </h4>
              <p className="text-xs text-slate-600 mb-2">
                <strong>Category → Reason → CareStack Production Type</strong>
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Categories group similar appointment types (Exam, Hygiene, Treatment)</li>
                <li>• Reasons are specific appointment types patients can book</li>
                <li>• Production types sync with CareStack billing codes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="mb-6 border-green-200 bg-green-50/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {enabledReasons} of {totalReasons} appointment types enabled
              </p>
              <p className="text-xs text-slate-600">
                Patients will see {enabledReasons} options in the booking widget
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {categories.length} Categories
              </Badge>
              <Button
                onClick={addCategory}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Category
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories & Reasons */}
      <div className="space-y-4 mb-8">
        {categories.map((category) => (
          <Card key={category.id} className="border-slate-200 bg-white">
            <CardContent className="p-0">
              {/* Category Header */}
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    onClick={() => toggleCategoryExpanded(category.id)}
                    className="cursor-pointer"
                  >
                    {category.expanded ? (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    {editingCategory === category.id ? (
                      <Input
                        value={category.name}
                        onChange={(e) =>
                          updateCategory(category.id, { name: e.target.value })
                        }
                        onBlur={() => setEditingCategory(null)}
                        autoFocus
                        className="h-8 text-base font-semibold"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-900">{category.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingCategory(category.id)}
                          className="h-6 w-6 p-0"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    <p className="text-xs text-slate-500">
                      {category.reasons.filter((r) => r.enabled).length} of{' '}
                      {category.reasons.length} enabled
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addReason(category.id)}
                      className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Reason
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteCategory(category.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Category Description */}
                <Textarea
                  value={category.description}
                  onChange={(e) =>
                    updateCategory(category.id, { description: e.target.value })
                  }
                  placeholder="Category description (shown in booking widget)"
                  className="text-sm resize-none"
                  rows={2}
                  maxLength={150}
                />
                <p className="text-xs text-slate-500 mt-1">
                  {category.description.length}/150 characters
                </p>
              </div>

              {/* Reasons List */}
              {category.expanded && (
                <div className="bg-slate-50/50">
                  {category.reasons.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">
                      No reasons yet. Click "Add Reason" to create one.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-200">
                      {category.reasons.map((reason) => (
                        <div
                          key={reason.id}
                          className={`p-4 ${!reason.enabled ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <GripVertical className="h-5 w-5 text-slate-300 mt-2 cursor-move" />
                            <div className="flex-1 space-y-3">
                              {/* Reason Name & Duration */}
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <Label className="text-xs text-slate-600">Reason Name</Label>
                                  <Input
                                    value={reason.name}
                                    onChange={(e) =>
                                      updateReason(category.id, reason.id, {
                                        name: e.target.value,
                                      })
                                    }
                                    className="h-9 text-sm"
                                    disabled={!reason.enabled}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs text-slate-600">
                                    Duration (mins)
                                  </Label>
                                  <Select
                                    value={reason.duration.toString()}
                                    onValueChange={(value) =>
                                      updateReason(category.id, reason.id, {
                                        duration: parseInt(value),
                                      })
                                    }
                                    disabled={!reason.enabled}
                                  >
                                    <SelectTrigger className="h-9 text-sm">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="15">15 minutes</SelectItem>
                                      <SelectItem value="30">30 minutes</SelectItem>
                                      <SelectItem value="45">45 minutes</SelectItem>
                                      <SelectItem value="60">60 minutes</SelectItem>
                                      <SelectItem value="90">90 minutes</SelectItem>
                                      <SelectItem value="120">120 minutes</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {/* Description */}
                              <div className="space-y-1">
                                <Label className="text-xs text-slate-600">
                                  Description (shown in booking widget)
                                </Label>
                                <Input
                                  value={reason.description}
                                  onChange={(e) =>
                                    updateReason(category.id, reason.id, {
                                      description: e.target.value,
                                    })
                                  }
                                  placeholder="Brief description for patients"
                                  className="h-9 text-sm"
                                  disabled={!reason.enabled}
                                  maxLength={80}
                                />
                              </div>

                              {/* Detailed Instructions */}
                              <div className="space-y-1">
                                <Label className="text-xs text-slate-600">
                                  Detailed Instructions (what's included)
                                </Label>
                                <Textarea
                                  value={reason.detailedInstructions}
                                  onChange={(e) =>
                                    updateReason(category.id, reason.id, {
                                      detailedInstructions: e.target.value,
                                    })
                                  }
                                  placeholder="What is included in this appointment?"
                                  className="text-sm resize-none"
                                  rows={2}
                                  disabled={!reason.enabled}
                                  maxLength={200}
                                />
                              </div>

                              {/* Production Types Multi-Select */}
                              <div className="space-y-2">
                                <Label className="text-xs text-slate-600">
                                  CareStack Production Types (Multi-Select)
                                </Label>
                                <div className="border border-slate-200 rounded-lg p-3 bg-white">
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {reason.productionTypes.map((ptId) => {
                                      const pt = mockProductionTypes.find((p) => p.id === ptId)
                                      return pt ? (
                                        <Badge
                                          key={ptId}
                                          variant="outline"
                                          className="bg-indigo-50 text-indigo-700 border-indigo-200"
                                        >
                                          {pt.code} - {pt.name}
                                          <button
                                            onClick={() =>
                                              toggleProductionType(category.id, reason.id, ptId)
                                            }
                                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                                            disabled={!reason.enabled}
                                          >
                                            ×
                                          </button>
                                        </Badge>
                                      ) : null
                                    })}
                                    {reason.productionTypes.length === 0 && (
                                      <span className="text-xs text-slate-500">
                                        No production types selected
                                      </span>
                                    )}
                                  </div>
                                  
                                  <Select
                                    onValueChange={(value) =>
                                      toggleProductionType(category.id, reason.id, value)
                                    }
                                    disabled={!reason.enabled}
                                  >
                                    <SelectTrigger className="h-8 text-xs">
                                      <SelectValue placeholder="+ Add production type..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {mockProductionTypes.map((pt) => (
                                        <SelectItem key={pt.id} value={pt.id}>
                                          {pt.code} - {pt.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                {reason.productionTypes.length === 0 && (
                                  <p className="text-xs text-amber-600">
                                    ⚠️ At least one production type is recommended
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={reason.enabled}
                                onCheckedChange={() =>
                                  toggleReasonEnabled(category.id, reason.id)
                                }
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteReason(category.id, reason.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Button */}
      <div className="pt-6 border-t border-slate-200">
        <Button
          onClick={handleContinue}
          disabled={enabledReasons === 0}
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-medium"
        >
          Continue to Pricing Configuration
        </Button>
        {enabledReasons === 0 && (
          <p className="text-sm text-red-600 text-center mt-2">
            Please enable at least one appointment type to continue
          </p>
        )}
      </div>
    </div>
  )
}
