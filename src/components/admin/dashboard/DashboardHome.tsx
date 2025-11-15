import { Card, CardContent } from '../../ui/card'
import { Button } from '../../ui/button'
import { Calendar, DollarSign, Users, TrendingUp, Plus, ChevronRight } from 'lucide-react'

export function DashboardHome() {
  // Mock metrics data
  const metrics = [
    {
      label: 'Total Bookings',
      value: '124',
      change: '+12.5%',
      trend: 'up',
      description: 'This month',
      icon: Calendar,
      color: 'indigo',
    },
    {
      label: 'Total Revenue',
      value: '$12,450',
      change: '+8.2%',
      trend: 'up',
      description: 'This month',
      icon: DollarSign,
      color: 'green',
    },
    {
      label: 'Active Patients',
      value: '342',
      change: '+5.7%',
      trend: 'up',
      description: 'Total active',
      icon: Users,
      color: 'blue',
    },
    {
      label: 'Conversion Rate',
      value: '68%',
      change: '+3.1%',
      trend: 'up',
      description: 'Widget to booking',
      icon: TrendingUp,
      color: 'purple',
    },
  ]

  const recentBookings = [
    {
      id: 'BOOK-12345',
      patient: 'Sarah Mitchell',
      type: 'New Patient Exam',
      date: 'Today',
      time: '2:00 PM',
      status: 'confirmed',
      amount: '$150',
    },
    {
      id: 'BOOK-12344',
      patient: 'James Chen',
      type: 'Cleaning',
      date: 'Today',
      time: '4:30 PM',
      status: 'confirmed',
      amount: '$120',
    },
    {
      id: 'BOOK-12343',
      patient: 'Emily Rodriguez',
      type: 'Recall Exam',
      date: 'Tomorrow',
      time: '10:00 AM',
      status: 'confirmed',
      amount: '$100',
    },
  ]

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {metrics.map((metric, i) => (
          <Card key={i} className="relative border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-3">
                    {metric.label}
                  </p>
                  <div className="flex items-baseline gap-3 mb-2">
                    <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                      metric.trend === 'up' 
                        ? 'bg-slate-100 text-slate-700' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{metric.description}</p>
                </div>
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br flex items-center justify-center ${
                  metric.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                  metric.color === 'green' ? 'from-green-500 to-green-600' :
                  metric.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  'from-purple-500 to-purple-600'
                }`}>
                  <metric.icon className="h-6 w-6 text-white" strokeWidth={2} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card className="border border-slate-200/60 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Recent Bookings</h3>
              <p className="text-sm text-slate-500 mt-0.5">Latest appointment bookings</p>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-sm h-8 text-xs font-medium"
            >
              View All
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
                <div className="h-10 w-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold flex-shrink-0">
                  {booking.patient.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-700 transition-colors">
                      {booking.patient}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold text-green-700 bg-green-50 uppercase tracking-wide flex-shrink-0">
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium">{booking.type}</span>
                    <span className="text-slate-300">·</span>
                    <span>{booking.date} at {booking.time}</span>
                    <span className="text-slate-300">·</span>
                    <span className="font-mono text-slate-400">{booking.id}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-base font-bold text-slate-900">{booking.amount}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50">
          <Button variant="link" className="text-indigo-600 hover:text-indigo-700 p-0 h-auto font-medium text-sm">
            View all bookings
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  )
}