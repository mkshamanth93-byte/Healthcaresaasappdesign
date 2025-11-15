import { useState } from 'react';
import { Calendar as CalendarIcon, List, Download, Search, Filter } from 'lucide-react';

export function BookingsManagement() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const mockBookings = [
    {
      id: 1,
      patient: { name: 'Sarah Mitchell', initials: 'SM', color: 'bg-blue-500' },
      type: 'Teeth Cleaning',
      provider: 'Dr. Sarah Johnson',
      dateTime: 'Nov 15, 2024 - 2:00 PM',
      location: 'Downtown Office',
      status: 'confirmed',
      paymentStatus: 'paid',
      deposit: '£50',
    },
    {
      id: 2,
      patient: { name: 'Michael Chen', initials: 'MC', color: 'bg-purple-500' },
      type: 'Dental Exam',
      provider: 'Dr. Michael Roberts',
      dateTime: 'Nov 15, 2024 - 3:30 PM',
      location: 'Downtown Office',
      status: 'pending',
      paymentStatus: 'paid',
      deposit: '£75',
    },
    {
      id: 3,
      patient: { name: 'Emily Rodriguez', initials: 'ER', color: 'bg-pink-500' },
      type: 'Teeth Whitening',
      provider: 'Dr. Sarah Johnson',
      dateTime: 'Nov 16, 2024 - 10:00 AM',
      location: 'Westside Office',
      status: 'confirmed',
      paymentStatus: 'paid',
      deposit: '£150',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Bookings Management</h1>
          <p className="text-gray-500">View and manage all appointments</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white rounded-xl hover:shadow-lg hover:shadow-[#4C4DDC]/30 transition-all">
          <Download className="w-5 h-5" />
          <span className="font-medium">Export</span>
        </button>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name or confirmation number..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4C4DDC] focus:border-transparent"
            />
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                viewMode === 'list' 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium">List</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                viewMode === 'calendar' 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Calendar</span>
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Status</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <CalendarIcon className="w-4 h-4" />
            <span className="text-sm">Date Range</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <span className="text-sm">Location</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
            <span className="text-sm">Provider</span>
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Appointment</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${booking.patient.color} flex items-center justify-center text-white`}>
                        {booking.patient.initials}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{booking.patient.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{booking.type}</p>
                    <p className="text-xs text-gray-500">{booking.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{booking.provider}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{booking.dateTime}</p>
                    <p className="text-xs text-gray-500">#{booking.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                      Paid {booking.deposit}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-[#4C4DDC] hover:text-[#3a3bc7] font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}