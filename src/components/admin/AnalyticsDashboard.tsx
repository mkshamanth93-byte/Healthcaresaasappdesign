import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const bookingsByType = [
  { name: 'Teeth Cleaning', value: 145 },
  { name: 'Dental Exam', value: 98 },
  { name: 'Teeth Whitening', value: 67 },
  { name: 'Emergency', value: 42 },
  { name: 'Root Canal', value: 28 },
];

const deviceData = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 42 },
  { name: 'Tablet', value: 13 },
];

const COLORS = ['#4C4DDC', '#6366F1', '#8B5CF6', '#A78BFA', '#C4B5FD'];
const DEVICE_COLORS = ['#4C4DDC', '#10B981', '#F59E0B'];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-500">Track your booking widget performance</p>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl text-gray-900 mb-6">Conversion Funnel</h2>
        
        <div className="space-y-4">
          {[
            { label: 'Widget Opened', value: 1250, percentage: 100, color: 'bg-blue-500' },
            { label: 'Appointment Type Selected', value: 980, percentage: 78, color: 'bg-purple-500' },
            { label: 'Date Selected', value: 856, percentage: 68, color: 'bg-pink-500' },
            { label: 'Info Entered', value: 723, percentage: 58, color: 'bg-orange-500' },
            { label: 'Payment Completed', value: 612, percentage: 49, color: 'bg-green-500' },
            { label: 'Confirmed Booking', value: 597, percentage: 48, color: 'bg-emerald-500' },
          ].map((step, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">{step.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900 font-medium">{step.value}</span>
                  <span className="text-sm text-gray-500">({step.percentage}%)</span>
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${step.color} transition-all duration-500`}
                  style={{ width: `${step.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overall Conversion Rate</p>
              <p className="text-3xl text-gray-900">47.8%</p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-lg">+8.3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Appointment Types */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl text-gray-900 mb-6">Popular Appointment Types</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4C4DDC" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl text-gray-900 mb-6">Device Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Patient Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">New Patients</p>
              <p className="text-2xl text-gray-900">234</p>
            </div>
          </div>
          <p className="text-sm text-green-600">↑ 12% from last month</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Booking Lead Time</p>
              <p className="text-2xl text-gray-900">4.2 days</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Most book 3-7 days ahead</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl text-gray-900">$28,450</p>
            </div>
          </div>
          <p className="text-sm text-green-600">↑ 18% from last month</p>
        </div>
      </div>
    </div>
  );
}
