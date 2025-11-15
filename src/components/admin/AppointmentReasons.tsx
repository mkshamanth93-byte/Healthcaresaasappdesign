import { Plus, Clock, DollarSign } from 'lucide-react';

const appointmentReasons = [
  {
    id: 1,
    name: 'Teeth Cleaning',
    category: 'Hygiene',
    duration: '60 min',
    deposit: '£50',
    providers: 3,
    status: 'active',
    bookingCount: 45,
  },
  {
    id: 2,
    name: 'Dental Exam',
    category: 'Exam & Prevention',
    duration: '45 min',
    deposit: '£75',
    providers: 2,
    status: 'active',
    bookingCount: 32,
  },
  {
    id: 3,
    name: 'Teeth Whitening',
    category: 'Cosmetic',
    duration: '90 min',
    deposit: '£150',
    providers: 2,
    status: 'active',
    bookingCount: 18,
  },
  {
    id: 4,
    name: 'Emergency Visit',
    category: 'Emergency',
    duration: '30 min',
    deposit: '£100',
    providers: 2,
    status: 'active',
    bookingCount: 12,
  },
  {
    id: 5,
    name: 'Root Canal',
    category: 'Restorative',
    duration: '120 min',
    deposit: '£200',
    providers: 1,
    status: 'active',
    bookingCount: 8,
  },
  {
    id: 6,
    name: 'Orthodontic Consultation',
    category: 'Orthodontics',
    duration: '45 min',
    deposit: '£0',
    providers: 1,
    status: 'active',
    bookingCount: 15,
  },
];

const categories = [
  { name: 'All', count: 6 },
  { name: 'Exam & Prevention', count: 1 },
  { name: 'Hygiene', count: 1 },
  { name: 'Emergency', count: 1 },
  { name: 'Cosmetic', count: 1 },
  { name: 'Restorative', count: 1 },
  { name: 'Orthodontics', count: 1 },
];

export function AppointmentReasons() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Appointment Reasons</h1>
          <p className="text-gray-500">Configure the types of appointments patients can book</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white rounded-xl hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Appointment Type</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((category, idx) => (
            <button
              key={category.name}
              className={`px-4 py-2 rounded-lg transition-all ${
                idx === 0
                  ? 'bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Appointment Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointmentReasons.map((type) => (
          <div key={type.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{type.icon}</div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#4C4DDC] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4C4DDC]"></div>
              </label>
            </div>

            <h3 className="text-lg text-gray-900 mb-1">{type.name}</h3>
            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full mb-4">
              {type.category}
            </span>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{type.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span>{type.deposit} deposit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-gray-400">👥</span>
                <span>{type.providers} providers</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button className="flex-1 px-4 py-2 text-sm text-[#4C4DDC] hover:bg-purple-50 rounded-lg transition-colors">
                Edit
              </button>
              <button className="flex-1 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}