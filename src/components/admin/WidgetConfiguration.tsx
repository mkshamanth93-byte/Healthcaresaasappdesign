import { useState } from 'react';
import { Palette, Monitor, Smartphone, Tablet } from 'lucide-react';

export function WidgetConfiguration() {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedColorScheme, setSelectedColorScheme] = useState(0);
  const [buttonPosition, setButtonPosition] = useState('bottom-right');

  const colorSchemes = [
    { name: 'Purple Dream', primary: '#4C4DDC', secondary: '#6366F1' },
    { name: 'Ocean Blue', primary: '#0EA5E9', secondary: '#0284C7' },
    { name: 'Fresh Green', primary: '#10B981', secondary: '#059669' },
    { name: 'Coral Pink', primary: '#F43F5E', secondary: '#E11D48' },
  ];

  const positions = [
    { label: 'Bottom Right', value: 'bottom-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Top Left', value: 'top-left' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Widget Configuration</h1>
        <p className="text-gray-500">Customize how your booking widget looks and behaves</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Branding */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="flex items-center gap-2 text-lg text-gray-900 mb-4">
              <Palette className="w-5 h-5 text-[#4C4DDC]" />
              Branding
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-3">Color Scheme</label>
                <div className="grid grid-cols-2 gap-3">
                  {colorSchemes.map((scheme, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorScheme(idx)}
                      className={`p-4 border-2 rounded-xl hover:border-[#4C4DDC] transition-colors text-left ${
                        selectedColorScheme === idx ? 'border-[#4C4DDC] bg-purple-50' : 'border-gray-200'
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
            </div>
          </div>

          {/* Floating Button */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Floating Button</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  defaultValue="Book Appointment"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Button Position</label>
                <div className="grid grid-cols-2 gap-2">
                  {positions.map((pos) => (
                    <button
                      key={pos.value}
                      onClick={() => setButtonPosition(pos.value)}
                      className={`p-3 border-2 rounded-xl hover:border-[#4C4DDC] transition-colors ${
                        buttonPosition === pos.value ? 'border-[#4C4DDC] bg-purple-50' : 'border-gray-200'
                      }`}
                    >
                      <p className="text-sm text-gray-900">{pos.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Button Size</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC]">
                  <option>Small</option>
                  <option selected>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* Welcome Screen */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg text-gray-900 mb-4">Welcome Screen</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Welcome Headline</label>
                <input
                  type="text"
                  defaultValue="Book Your Appointment"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Welcome Message</label>
                <textarea
                  rows={3}
                  defaultValue="We're excited to see you! Select your appointment type to get started."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC]"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-[#4C4DDC] rounded" />
                  <span className="text-sm text-gray-700">Show trust badges</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5 text-[#4C4DDC] rounded" />
                  <span className="text-sm text-gray-700">Show practice photo</span>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full px-6 py-4 bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white rounded-xl hover:shadow-lg transition-all font-medium">
            Save Configuration
          </button>
        </div>

        {/* Live Preview */}
        <div className="lg:sticky lg:top-6 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-gray-900">Live Preview</h3>
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-2 rounded transition-colors ${
                    previewDevice === 'desktop' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`p-2 rounded transition-colors ${
                    previewDevice === 'tablet' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-2 rounded transition-colors ${
                    previewDevice === 'mobile' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Preview Container */}
            <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl overflow-hidden">
              <div className={`mx-auto transition-all ${
                previewDevice === 'mobile' ? 'max-w-[375px]' :
                previewDevice === 'tablet' ? 'max-w-[768px]' :
                'w-full'
              }`}>
                {/* Mock Website */}
                <div className="bg-white p-8 min-h-[500px] relative">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl mb-2">SmileCare Dental</h2>
                    <p className="text-gray-600">Your trusted dental care provider</p>
                  </div>

                  {/* Floating Button Preview */}
                  <button
                    className={`fixed flex items-center gap-2 px-6 py-3 text-white rounded-full shadow-lg hover:shadow-xl transition-all ${
                      buttonPosition === 'bottom-right' ? 'bottom-6 right-6' :
                      buttonPosition === 'bottom-left' ? 'bottom-6 left-6' :
                      buttonPosition === 'top-right' ? 'top-6 right-6' :
                      'top-6 left-6'
                    }`}
                    style={{ background: `linear-gradient(to right, ${colorSchemes[selectedColorScheme].primary}, ${colorSchemes[selectedColorScheme].secondary})` }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Book Appointment</span>
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              ✨ Updates in real-time as you make changes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
