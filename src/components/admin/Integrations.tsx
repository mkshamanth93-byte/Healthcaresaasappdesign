import { Check, X, ExternalLink } from 'lucide-react';

const integrations = [
  {
    id: 'carestack',
    name: 'CareStack PMS',
    description: 'Sync appointments and patient data with your practice management system',
    status: 'connected',
    logo: '🦷',
    lastSync: '5 minutes ago',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Accept deposits and payments securely',
    status: 'connected',
    logo: '💳',
    account: 'acct_1234567890',
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Track widget events and user behavior',
    status: 'setup-required',
    logo: '📊',
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Sync patient email lists for marketing campaigns',
    status: 'setup-required',
    logo: '✉️',
  },
];

export function Integrations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Integrations</h1>
        <p className="text-gray-500">Connect external services to enhance your booking system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{integration.logo}</div>
                <div>
                  <h3 className="text-lg text-gray-900">{integration.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{integration.description}</p>
                </div>
              </div>
              {integration.status === 'connected' ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  <Check className="w-4 h-4" />
                  <span>Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  <X className="w-4 h-4" />
                  <span>Not Connected</span>
                </div>
              )}
            </div>

            {integration.status === 'connected' && (
              <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                {integration.lastSync && (
                  <p className="text-sm text-gray-600">
                    <strong>Last sync:</strong> {integration.lastSync}
                  </p>
                )}
                {integration.account && (
                  <p className="text-sm text-gray-600">
                    <strong>Account:</strong> {integration.account}
                  </p>
                )}
              </div>
            )}

            <div className="flex gap-2">
              {integration.status === 'connected' ? (
                <>
                  <button className="flex-1 px-4 py-2 text-sm text-[#4C4DDC] hover:bg-purple-50 rounded-lg transition-colors">
                    Configure
                  </button>
                  <button className="flex-1 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Test Connection
                  </button>
                  <button className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    Disconnect
                  </button>
                </>
              ) : (
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white rounded-lg hover:shadow-lg transition-all font-medium">
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CareStack Integration Details */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 p-6">
        <h3 className="text-lg text-gray-900 mb-4">🦷 CareStack Integration Active</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4">
            <p className="text-2xl text-gray-900 mb-1">1,247</p>
            <p className="text-sm text-gray-600">Patients Synced</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-2xl text-gray-900 mb-1">597</p>
            <p className="text-sm text-gray-600">Appointments Created</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-2xl text-gray-900 mb-1">98.3%</p>
            <p className="text-sm text-gray-600">Sync Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
