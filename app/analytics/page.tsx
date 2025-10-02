'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  const monthlyData = [
    { month: 'Jan', processed: 2850, amount: 342000, success: 2720 },
    { month: 'Feb', processed: 3120, amount: 385000, success: 2974 },
    { month: 'Mar', processed: 3445, amount: 421000, success: 3290 },
    { month: 'Apr', processed: 3780, amount: 468000, success: 3610 },
    { month: 'May', processed: 3847, amount: 498000, success: 3693 }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Analytics & Insights</h1>
              <p className="text-slate-600 mt-1">Deep dive into processing metrics and trends</p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-600">Avg Processing Time</p>
              <span className="text-green-600 text-sm font-semibold">↓ 15%</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">1.8s</p>
            <p className="text-xs text-slate-500 mt-2">Per invoice</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-600">Match Accuracy</p>
              <span className="text-green-600 text-sm font-semibold">↑ 2.3%</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">97.8%</p>
            <p className="text-xs text-slate-500 mt-2">Last 30 days</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-600">Cost Savings</p>
              <span className="text-green-600 text-sm font-semibold">↑ 28%</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">$45K</p>
            <p className="text-xs text-slate-500 mt-2">This quarter</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-600">Error Rate</p>
              <span className="text-green-600 text-sm font-semibold">↓ 0.8%</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">1.5%</p>
            <p className="text-xs text-slate-500 mt-2">Below target</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Processing Volume Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Processing Volume Trend</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyData.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col-reverse items-center space-y-reverse space-y-1">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all cursor-pointer"
                      style={{ height: `${(data.processed / 4000) * 200}px` }}
                      title={`${data.processed} processed`}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-600 mt-2">{data.month}</span>
                  <span className="text-xs text-slate-500">{data.processed}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Rate Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Success Rate Trend</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyData.map((data, idx) => {
                const successRate = (data.success / data.processed) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col-reverse items-center">
                      <div
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg hover:from-green-700 hover:to-green-500 transition-all cursor-pointer"
                        style={{ height: `${(successRate / 100) * 200}px` }}
                        title={`${successRate.toFixed(1)}% success`}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-slate-600 mt-2">{data.month}</span>
                    <span className="text-xs text-slate-500">{successRate.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Performing Vendors */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Top Performing Vendors</h2>
            <div className="space-y-4">
              {[
                { name: 'Enterprise Hardware', score: 99, trend: 'up' },
                { name: 'TechSupply Corp', score: 98, trend: 'up' },
                { name: 'Digital Systems', score: 97, trend: 'stable' },
                { name: 'Office Solutions', score: 95, trend: 'up' },
                { name: 'Cloud Services', score: 94, trend: 'down' }
              ].map((vendor, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{vendor.name}</p>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full"
                        style={{ width: `${vendor.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-900">{vendor.score}</span>
                    <span className={`text-xs ${
                      vendor.trend === 'up' ? 'text-green-600' :
                      vendor.trend === 'down' ? 'text-red-600' : 'text-slate-400'
                    }`}>
                      {vendor.trend === 'up' ? '↑' : vendor.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Processing Efficiency */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Processing Efficiency</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Automated Processing</span>
                  <span className="text-sm font-bold text-green-600">94%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Manual Review</span>
                  <span className="text-sm font-bold text-yellow-600">6%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '6%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Avg Response Time</span>
                  <span className="text-sm font-bold text-blue-600">1.8s</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">System Uptime</span>
                  <span className="text-sm font-bold text-green-600">99.9%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Error Analysis</h2>
            <div className="space-y-3">
              {[
                { type: 'PO Mismatch', count: 23, percentage: 45 },
                { type: 'Amount Discrepancy', count: 15, percentage: 30 },
                { type: 'Date Invalid', count: 8, percentage: 15 },
                { type: 'Missing Data', count: 5, percentage: 10 }
              ].map((error, idx) => (
                <div key={idx} className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-red-900">{error.type}</span>
                    <span className="text-xs font-bold text-red-600">{error.count}</span>
                  </div>
                  <div className="w-full bg-red-200 rounded-full h-1.5">
                    <div
                      className="bg-red-600 h-1.5 rounded-full"
                      style={{ width: `${error.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
