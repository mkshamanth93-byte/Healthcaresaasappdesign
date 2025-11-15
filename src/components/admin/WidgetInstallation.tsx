import { Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function WidgetInstallation() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('wordpress');

  const embedCode = `<script src="https://cdn.carestack.com/widget.js" data-practice-id="your-practice-id"></script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Widget Installation</h1>
        <p className="text-gray-500">Add the booking widget to your website</p>
      </div>

      {/* Step 1: Embed Code */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4C4DDC] to-[#6366F1] text-white flex items-center justify-center font-medium">
            1
          </div>
          <h2 className="text-xl text-gray-900">Copy Your Embed Code</h2>
        </div>

        <div className="relative">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
            <code>{embedCode}</code>
          </pre>
          <button
            onClick={copyCode}
            className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            {copiedCode ? (
              <>
                <Check className="w-4 h-4" />
                <span className="text-sm">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy Code</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>💡 Lightweight & Fast:</strong> Only 14KB - won't slow down your site
          </p>
        </div>
      </div>

      {/* Step 2: Platform Instructions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4C4DDC] to-[#6366F1] text-white flex items-center justify-center font-medium">
            2
          </div>
          <h2 className="text-xl text-gray-900">Choose Your Platform</h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {[
            { id: 'wordpress', name: 'WordPress' },
            { id: 'wix', name: 'Wix' },
            { id: 'squarespace', name: 'Squarespace' },
            { id: 'html', name: 'Custom HTML' },
            { id: 'gtm', name: 'Google Tag Manager' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#4C4DDC] text-[#4C4DDC]'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'wordpress' && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4C4DDC] text-white flex items-center justify-center text-sm">1</div>
              <div>
                <p className="text-gray-900 mb-1">Log in to your WordPress admin dashboard</p>
                <p className="text-sm text-gray-500">Go to yoursite.com/wp-admin</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4C4DDC] text-white flex items-center justify-center text-sm">2</div>
              <div>
                <p className="text-gray-900 mb-1">Navigate to Appearance → Theme Editor</p>
                <p className="text-sm text-gray-500">Or use a plugin like "Insert Headers and Footers"</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4C4DDC] text-white flex items-center justify-center text-sm">3</div>
              <div>
                <p className="text-gray-900 mb-1">Paste the embed code before the closing &lt;/body&gt; tag</p>
                <p className="text-sm text-gray-500">In footer.php or using the plugin's footer scripts section</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4C4DDC] text-white flex items-center justify-center text-sm">4</div>
              <div>
                <p className="text-gray-900 mb-1">Save changes and visit your website</p>
                <p className="text-sm text-gray-500">The booking button should appear immediately</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'html' && (
          <div className="space-y-4">
            <p className="text-gray-600">For custom HTML websites, paste the embed code just before the closing &lt;/body&gt; tag in your HTML file.</p>
            <div className="p-4 bg-gray-50 rounded-xl">
              <code className="text-sm text-gray-700">
                {`...\n  <script src="https://cdn.carestack.com/widget.js" data-practice-id="your-practice-id"></script>\n</body>\n</html>`}
              </code>
            </div>
          </div>
        )}
      </div>

      {/* Step 3: Test */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4C4DDC] to-[#6366F1] text-white flex items-center justify-center font-medium">
            3
          </div>
          <h2 className="text-xl text-gray-900">Test Your Widget</h2>
        </div>

        <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-xl mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🧪</div>
            <div>
              <p className="text-gray-900 font-medium">Test Mode</p>
              <p className="text-sm text-gray-600">Bookings won't create real appointments</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#4C4DDC] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4C4DDC]"></div>
          </label>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors">
          <ExternalLink className="w-5 h-5" />
          <span>Open Test Page</span>
        </button>
      </div>

      {/* Step 4: Go Live */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl text-gray-900 mb-2">Ready to Go Live?</h2>
        <p className="text-gray-600 mb-6">Turn off test mode and start accepting real bookings!</p>
        <button className="px-8 py-4 bg-gradient-to-r from-[#4C4DDC] to-[#6366F1] text-white rounded-xl hover:shadow-lg transition-all font-medium">
          Activate Live Mode
        </button>
      </div>
    </div>
  );
}