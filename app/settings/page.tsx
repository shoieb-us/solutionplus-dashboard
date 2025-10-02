'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-1">Manage your account and system preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <nav className="space-y-1">
                {[
                  { id: 'general', name: 'General', icon: '⚙️' },
                  { id: 'notifications', name: 'Notifications', icon: '🔔' },
                  { id: 'security', name: 'Security', icon: '🔒' },
                  { id: 'integrations', name: 'Integrations', icon: '🔌' },
                  { id: 'billing', name: 'Billing', icon: '💳' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">General Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        defaultValue="InvoiceFlow Inc."
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue="admin@invoiceflow.com"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Time Zone</label>
                      <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>UTC (GMT+0:00)</option>
                        <option>EST (GMT-5:00)</option>
                        <option>PST (GMT-8:00)</option>
                        <option>GST (GMT+4:00)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                      <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>English</option>
                        <option>Arabic</option>
                        <option>French</option>
                      </select>
                    </div>

                    <div className="pt-4">
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { title: 'Email Notifications', description: 'Receive email updates for important events' },
                      { title: 'Processing Alerts', description: 'Get notified when invoice processing completes' },
                      { title: 'Error Notifications', description: 'Receive alerts for failed validations' },
                      { title: 'Weekly Summary', description: 'Get a weekly summary of processing activity' },
                      { title: 'Vendor Updates', description: 'Receive notifications about vendor changes' },
                    ].map((notif, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900">{notif.title}</p>
                          <p className="text-sm text-slate-600 mt-1">{notif.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Current Password"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-semibold text-slate-900 mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900">Enable 2FA</p>
                          <p className="text-sm text-slate-600 mt-1">Add an extra layer of security to your account</p>
                        </div>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Integrations</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'MongoDB', icon: '🗄️', status: 'connected', color: 'green' },
                      { name: 'Azure Blob', icon: '☁️', status: 'connected', color: 'green' },
                      { name: 'Fusion ERM', icon: '⚡', status: 'disconnected', color: 'slate' },
                      { name: 'Slack', icon: '💬', status: 'disconnected', color: 'slate' },
                    ].map((integration, idx) => (
                      <div key={idx} className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl">{integration.icon}</span>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            integration.status === 'connected'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-2">{integration.name}</h3>
                        <button className={`w-full px-4 py-2 rounded-lg transition-colors ${
                          integration.status === 'connected'
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}>
                          {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Billing & Subscription</h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm opacity-90">Current Plan</p>
                          <p className="text-2xl font-bold">Enterprise</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm opacity-90">Monthly</p>
                          <p className="text-2xl font-bold">$299</p>
                        </div>
                      </div>
                      <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                        Upgrade Plan
                      </button>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-4">Payment Method</h3>
                      <div className="p-4 bg-slate-50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                            VISA
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">•••• •••• •••• 4242</p>
                            <p className="text-sm text-slate-600">Expires 12/25</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Update</button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-4">Billing History</h3>
                      <div className="space-y-2">
                        {[
                          { date: 'May 1, 2024', amount: '$299', status: 'Paid' },
                          { date: 'Apr 1, 2024', amount: '$299', status: 'Paid' },
                          { date: 'Mar 1, 2024', amount: '$299', status: 'Paid' },
                        ].map((invoice, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <span className="text-sm text-slate-600">{invoice.date}</span>
                            <span className="text-sm font-medium text-slate-900">{invoice.amount}</span>
                            <span className="text-sm text-green-600">{invoice.status}</span>
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Download</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
