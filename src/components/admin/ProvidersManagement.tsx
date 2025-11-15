import { Plus, Star, MapPin } from 'lucide-react';

const providers = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    credentials: 'DDS, General Dentist',
    specialty: 'General Dentistry',
    initials: 'SJ',
    color: 'bg-blue-500',
    rating: 4.9,
    bookings: 234,
    locations: ['Downtown', 'Westside'],
    status: 'active',
  },
  {
    id: 2,
    name: 'Dr. Michael Roberts',
    credentials: 'DDS, Orthodontist',
    specialty: 'Orthodontics',
    initials: 'MR',
    color: 'bg-purple-500',
    rating: 4.8,
    bookings: 189,
    locations: ['Downtown'],
    status: 'active',
  },
  {
    id: 3,
    name: 'Emily Chen',
    credentials: 'RDH, Dental Hygienist',
    specialty: 'Dental Hygiene',
    initials: 'EC',
    color: 'bg-pink-500',
    rating: 5.0,
    bookings: 312,
    locations: ['Westside'],
    status: 'active',
  },
];

export function ProvidersManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Providers</h1>
          <p className="text-gray-500">Manage your team members and their schedules</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white rounded-xl hover:shadow-lg transition-all">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Provider</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <div key={provider.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-16 h-16 rounded-full ${provider.color} flex items-center justify-center text-white text-xl`}>
                {provider.initials}
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                {provider.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>

            <h3 className="text-lg text-gray-900 mb-1">{provider.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{provider.credentials}</p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-gray-600">{provider.rating} rating</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{provider.locations.join(', ')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-500">{provider.bookings} bookings</span>
              <button className="text-sm text-[#4C4DDC] hover:text-[#3a3bc7] font-medium">
                Edit Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
