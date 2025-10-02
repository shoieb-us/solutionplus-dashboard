'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reports = [
    { id: 1, name: 'Monthly Invoice Summary', date: '2024-05-01', size: '2.4 MB', type: 'PDF', status: 'ready' },
    { id: 2, name: 'Vendor Compliance Report', date: '2024-05-01', size: '1.8 MB', type: 'PDF', status: 'ready' },
    { id: 3, name: 'Processing Analytics Q1', date: '2024-04-01', size: '3.2 MB', type: 'PDF', status: 'ready' },
    { id: 4, name: 'Financial Summary April', date: '2024-04-30', size: '1.5 MB', type: 'Excel', status: 'ready' },
    { id: 5, name: 'Audit Trail Report', date: '2024-04-28', size: '4.1 MB', type: 'PDF', status: 'ready' },
    { id: 6, name: 'Exception Analysis', date: '2024-04-25', size: '0.9 MB', type: 'PDF', status: 'generating' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-600 mt-1">Generate and download detailed reports</p>
        </div>

        {/* Report Templates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Invoice Summary</h3>
            <p className="text-sm opacity-90 mb-4">Comprehensive invoice processing report</p>
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
              Generate Report
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white cursor-pointer hover:from-green-600 hover:to-green-700 transition-all shadow-lg">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Compliance Report</h3>
            <p className="text-sm opacity-90 mb-4">Vendor compliance and audit trail</p>
            <button className="px-4 py-2 bg-white text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
              Generate Report
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Analytics Dashboard</h3>
            <p className="text-sm opacity-90 mb-4">Performance metrics and trends</p>
            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
              Generate Report
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {['daily', 'weekly', 'monthly', 'quarterly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 shadow-lg">
              + Custom Report
            </button>
          </div>
        </div>

        {/* Generated Reports */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Generated Reports</h2>
          </div>
          
          <div className="divide-y divide-slate-200">
            {reports.map((report) => (
              <div key={report.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      report.type === 'PDF' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      <span className="text-2xl">{report.type === 'PDF' ? '📄' : '📊'}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{report.name}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-xs text-slate-500">{report.date}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">{report.size}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">{report.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {report.status === 'generating' ? (
                      <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                        Generating...
                      </span>
                    ) : (
                      <>
                        <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium">
                          Preview
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Download
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Scheduled Reports</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">+ Add Schedule</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Monthly Invoice Summary', frequency: 'First day of month', recipients: 3 },
              { name: 'Weekly Performance Report', frequency: 'Every Monday', recipients: 5 },
              { name: 'Quarterly Audit Report', frequency: 'End of quarter', recipients: 2 }
            ].map((schedule, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">{schedule.name}</p>
                  <p className="text-sm text-slate-600 mt-1">{schedule.frequency} • {schedule.recipients} recipients</p>
                </div>
                <button className="text-slate-600 hover:text-slate-900 text-sm">Edit</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
