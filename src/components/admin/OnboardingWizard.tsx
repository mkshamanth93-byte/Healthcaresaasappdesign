import { useState } from 'react';
import { Check, X, Upload, MapPin, Calendar, Users, Palette, Sparkles } from 'lucide-react';

interface OnboardingWizardProps {
  onComplete: () => void;
}

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show success animation
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  step < currentStep 
                    ? 'bg-[#4C4DDC] border-[#4C4DDC] text-white' 
                    : step === currentStep
                    ? 'bg-white border-[#4C4DDC] text-[#4C4DDC]'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 5 && (
                  <div className={`w-16 h-1 mx-2 ${step < currentStep ? 'bg-[#4C4DDC]' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">Step {currentStep} of {totalSteps}</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <button
            onClick={onComplete}
            className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {currentStep === 1 && <Step1ConnectCareStack />}
          {currentStep === 2 && <Step2PracticeInfo />}
          {currentStep === 3 && <Step3AppointmentTypes />}
          {currentStep === 4 && <Step4Providers />}
          {currentStep === 5 && <Step5Branding />}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white rounded-xl hover:shadow-lg hover:shadow-[#4C4DDC]/30 transition-all font-medium"
            >
              {currentStep === totalSteps ? 'Complete Setup 🎉' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step1ConnectCareStack() {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#4C4DDC] to-[#6366F1] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl text-gray-900 mb-2">Connect to CareStack</h2>
        <p className="text-gray-600">Link your practice management system to sync appointments and patient data</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-700 mb-2">CareStack API Key</label>
          <input
            type="text"
            placeholder="Enter your API key"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC] focus:border-transparent"
          />
          <p className="mt-2 text-sm text-gray-500">
            Find your API key in CareStack → Settings → Integrations → API Access
          </p>
        </div>

        <button className="w-full px-6 py-3 border-2 border-[#4C4DDC] text-[#4C4DDC] rounded-xl hover:bg-purple-50 transition-colors font-medium">
          Test Connection
        </button>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Check out our{' '}
            <a href="#" className="underline">step-by-step guide</a> on finding your API key.
          </p>
        </div>
      </div>
    </div>
  );
}

function Step2PracticeInfo() {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#4C4DDC] to-[#6366F1] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl text-gray-900 mb-2">Practice Information</h2>
        <p className="text-gray-600">Tell us about your practice and locations</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Practice Logo</label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
              Upload Logo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Practice Name</label>
            <input
              type="text"
              placeholder="SmileCare Dental"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              placeholder="(415) 555-0100"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Email</label>
          <input
            type="email"
            placeholder="contact@smilecare.com"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Locations</label>
          <div className="space-y-3">
            {['Downtown Office', 'Westside Office'].map((location, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-[#4C4DDC] rounded" />
                <div className="flex-1">
                  <p className="text-gray-900">{location}</p>
                  <p className="text-sm text-gray-500">Enable for online booking</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3AppointmentTypes() {
  const appointmentTypes = [
    { name: 'Teeth Cleaning', duration: '60 min', deposit: '£50', category: 'Hygiene' },
    { name: 'Dental Exam', duration: '45 min', deposit: '£75', category: 'Exam' },
    { name: 'Emergency Visit', duration: '30 min', deposit: '£100', category: 'Emergency' },
    { name: 'Teeth Whitening', duration: '90 min', deposit: '£150', category: 'Cosmetic' },
    { name: 'Root Canal', duration: '120 min', deposit: '£200', category: 'Restorative' },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#4C4DDC] to-[#6366F1] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl text-gray-900 mb-2">Appointment Types</h2>
        <p className="text-gray-600">Select which procedures patients can book online</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {appointmentTypes.map((type, idx) => (
          <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-[#4C4DDC] rounded" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-gray-900">{type.name}</p>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">{type.category}</span>
              </div>
              <p className="text-sm text-gray-500">{type.duration} • {type.deposit} deposit</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-6 py-3 border-2 border-dashed border-gray-300 text-gray-600 hover:border-[#4C4DDC] hover:text-[#4C4DDC] rounded-xl transition-colors">
        + Add Custom Appointment Type
      </button>
    </div>
  );
}

function Step4Providers() {
  const providers = [
    { name: 'Dr. Sarah Johnson', specialty: 'General Dentist', initials: 'SJ', color: 'bg-blue-500' },
    { name: 'Dr. Michael Roberts', specialty: 'Orthodontist', initials: 'MR', color: 'bg-purple-500' },
    { name: 'Emily Chen', specialty: 'Dental Hygienist', initials: 'EC', color: 'bg-pink-500' },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#4C4DDC] to-[#6366F1] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl text-gray-900 mb-2">Provider Setup</h2>
        <p className="text-gray-600">Enable your team members for online booking</p>
      </div>

      <div className="space-y-4">
        {providers.map((provider, idx) => (
          <div key={idx} className="flex items-center gap-4 p-6 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            <input type="checkbox" defaultChecked className="w-5 h-5 text-[#4C4DDC] rounded" />
            <div className={`w-14 h-14 rounded-full ${provider.color} flex items-center justify-center text-white text-lg`}>
              {provider.initials}
            </div>
            <div className="flex-1">
              <p className="text-lg text-gray-900">{provider.name}</p>
              <p className="text-sm text-gray-500">{provider.specialty}</p>
            </div>
            <button className="px-4 py-2 text-sm text-[#4C4DDC] hover:bg-white rounded-lg transition-colors">
              Add Photo & Bio
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step5Branding() {
  const colorSchemes = [
    { name: 'Purple Dream', primary: '#4C4DDC', secondary: '#6366F1' },
    { name: 'Ocean Blue', primary: '#0EA5E9', secondary: '#0284C7' },
    { name: 'Fresh Green', primary: '#10B981', secondary: '#059669' },
    { name: 'Coral Pink', primary: '#F43F5E', secondary: '#E11D48' },
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#4C4DDC] to-[#6366F1] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl text-gray-900 mb-2">Widget Branding</h2>
        <p className="text-gray-600">Customize how the booking widget looks on your website</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-700 mb-3">Choose a Color Scheme</label>
          <div className="grid grid-cols-2 gap-3">
            {colorSchemes.map((scheme, idx) => (
              <button
                key={idx}
                className={`p-4 border-2 rounded-xl hover:border-[#4C4DDC] transition-colors text-left ${
                  idx === 0 ? 'border-[#4C4DDC] bg-purple-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full" style={{ background: scheme.primary }}></div>
                  <div className="w-6 h-6 rounded-full" style={{ background: scheme.secondary }}></div>
                </div>
                <p className="text-sm text-gray-900">{scheme.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Welcome Message</label>
          <textarea
            defaultValue="We're excited to see you! Select your appointment type to get started."
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-3">Button Position</label>
          <div className="grid grid-cols-2 gap-3">
            {['Bottom Right', 'Bottom Left', 'Top Right', 'Top Left'].map((position, idx) => (
              <button
                key={idx}
                className={`p-3 border-2 rounded-xl hover:border-[#4C4DDC] transition-colors ${
                  idx === 0 ? 'border-[#4C4DDC] bg-purple-50' : 'border-gray-200'
                }`}
              >
                <p className="text-sm text-gray-900">{position}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200">
          <p className="text-sm text-purple-900 mb-2">✨ Preview</p>
          <p className="text-xs text-purple-700">You'll see a live preview of your widget on the next screen!</p>
        </div>
      </div>
    </div>
  );
}