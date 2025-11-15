import { Building, Clock, Bell, MapPin } from 'lucide-react';

export function PracticeSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl text-gray-900">Practice Settings</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <div className="flex gap-6 px-6">
            {['General', 'Locations', 'Business Hours', 'Notifications'].map((tab, idx) => (
              <button
                key={tab}
                className={`py-4 border-b-2 transition-colors ${
                  idx === 0 
                    ? 'border-[#4C4DDC] text-[#4C4DDC]' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Practice Name</label>
            <input
              type="text"
              defaultValue="SmileCare Dental Practice"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                defaultValue="(415) 555-0100"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="contact@smilecare.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Timezone</label>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC]">
              <option>Pacific Time (PT)</option>
              <option>Eastern Time (ET)</option>
              <option>Central Time (CT)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Practice Description</label>
            <textarea
              rows={4}
              defaultValue="At SmileCare Dental, we're committed to providing exceptional dental care in a comfortable, modern environment."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
              Cancel
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white rounded-xl hover:shadow-lg transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
