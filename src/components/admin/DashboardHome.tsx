import { Plus, TrendingUp, TrendingDown, Calendar, DollarSign, Percent, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const chartData = [
  { date: 'Mon', opens: 45, started: 32, completed: 24 },
  { date: 'Tue', opens: 52, started: 38, completed: 28 },
  { date: 'Wed', opens: 48, started: 35, completed: 26 },
  { date: 'Thu', opens: 61, started: 45, completed: 34 },
  { date: 'Fri', opens: 55, started: 41, completed: 31 },
  { date: 'Sat', opens: 38, started: 28, completed: 21 },
  { date: 'Sun', opens: 29, started: 21, completed: 16 },
];

const upcomingAppointments = [
  {
    id: 1,
    patient: { name: 'Sarah Mitchell', initials: 'SM', color: 'bg-blue-500' },
    type: 'Teeth Cleaning',
    provider: 'Dr. Sarah Johnson',
    dateTime: 'Today, 2:00 PM',
    location: 'Downtown Office',
    status: 'confirmed',
  },
  {
    id: 2,
    patient: { name: 'Michael Chen', initials: 'MC', color: 'bg-purple-500' },
    type: 'Dental Exam',
    provider: 'Dr. Michael Roberts',
    dateTime: 'Today, 3:30 PM',
    location: 'Downtown Office',
    status: 'confirmed',
  },
  {
    id: 3,
    patient: { name: 'Emily Rodriguez', initials: 'ER', color: 'bg-pink-500' },
    type: 'Teeth Whitening',
    provider: 'Dr. Sarah Johnson',
    dateTime: 'Today, 4:45 PM',
    location: 'Westside Office',
    status: 'pending',
  },
  {
    id: 4,
    patient: { name: 'James Wilson', initials: 'JW', color: 'bg-green-500' },
    type: 'Emergency Visit',
    provider: 'Dr. Michael Roberts',
    dateTime: 'Tomorrow, 9:00 AM',
    location: 'Downtown Office',
    status: 'confirmed',
  },
];

const recentActivity = [
  { id: 1, text: 'New booking from Jane Smith', time: '5 minutes ago', type: 'booking' },
  { id: 2, text: 'Payment received: £50', time: '1 hour ago', type: 'payment' },
  { id: 3, text: "Dr. Johnson's schedule updated", time: '3 hours ago', type: 'update' },
  { id: 4, text: 'Appointment cancelled by Tom Brown', time: '5 hours ago', type: 'cancellation' },
];

export function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 mb-2">Welcome back, Dr. Johnson!</h1>
          <p className="text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white rounded-xl hover:shadow-lg hover:shadow-[#4C4DDC]/30 transition-all">
          <Plus className="w-5 h-5" />
          <span className="font-medium">New Booking</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Calendar}
          iconColor="bg-blue-500"
          title="Today's Bookings"
          value="12"
          trend={{ value: '+15%', isPositive: true }}
          subtitle="vs yesterday"
        />
        <MetricCard
          icon={Calendar}
          iconColor="bg-purple-500"
          title="This Week"
          value="48"
          trend={{ value: '+8%', isPositive: true }}
          subtitle="vs last week"
        />
        <MetricCard
          icon={Percent}
          iconColor="bg-green-500"
          title="Conversion Rate"
          value="63%"
          trend={{ value: '+5%', isPositive: true }}
          subtitle="vs last week"
        />
        <MetricCard
          icon={DollarSign}
          iconColor="bg-orange-500"
          title="Revenue (Deposits)"
          value="£7,200"
          trend={{ value: '+12%', isPositive: true }}
          subtitle="vs last week"
        />
      </div>

      {/* Widget Performance Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl text-gray-900 mb-1">Widget Performance</h2>
            <p className="text-sm text-gray-500">Last 7 days</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#4C4DDC]"></div>
              <span className="text-sm text-gray-600">Widget Opens</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#6366F1]"></div>
              <span className="text-sm text-gray-600">Bookings Started</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
              <span className="text-sm text-gray-600">Bookings Completed</span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line type="monotone" dataKey="opens" stroke="#4C4DDC" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="started" stroke="#6366F1" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overall Conversion Rate</p>
              <p className="text-3xl text-gray-900">63.2%</p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-lg">+5.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-gray-900">Upcoming Appointments</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white rounded-lg">
                Today
              </button>
              <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                This Week
              </button>
              <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                This Month
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-full ${appointment.patient.color} flex items-center justify-center text-white flex-shrink-0`}>
                  {appointment.patient.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 truncate">{appointment.patient.name}</p>
                  <p className="text-sm text-gray-500">{appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{appointment.dateTime}</p>
                  <p className="text-sm text-gray-500">{appointment.provider}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                  <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white rounded-lg transition-all">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'booking' ? 'bg-blue-100' :
                  activity.type === 'payment' ? 'bg-green-100' :
                  activity.type === 'update' ? 'bg-purple-100' :
                  'bg-red-100'
                }`}>
                  {activity.type === 'booking' && <Calendar className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'payment' && <DollarSign className="w-4 h-4 text-green-600" />}
                  {activity.type === 'update' && <Clock className="w-4 h-4 text-purple-600" />}
                  {activity.type === 'cancellation' && <Calendar className="w-4 h-4 text-red-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  value: string;
  trend: {
    value: string;
    isPositive: boolean;
  };
  subtitle: string;
}

function MetricCard({ icon: Icon, iconColor, title, value, trend, subtitle }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${iconColor} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{trend.value}</span>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-3xl text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}