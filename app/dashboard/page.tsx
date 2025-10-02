'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  // Mock real-time data update
  const [realtimeData, setRealtimeData] = useState({
    processingRate: 97.8,
    activeJobs: 12,
    queuedItems: 45
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        processingRate: Math.min(99.9, prev.processingRate + (Math.random() - 0.5) * 0.5),
        activeJobs: Math.max(0, prev.activeJobs + Math.floor(Math.random() * 3 - 1)),
        queuedItems: Math.max(0, prev.queuedItems + Math.floor(Math.random() * 5 - 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const kpiData = [
    {
      title: 'Total Invoices Processed',
      value: '3,847',
      change: '+12.5%',
      trend: 'up',
      icon: '📄',
      color: 'blue',
      subtext: 'This month'
    },
    {
      title: 'Processing Accuracy',
      value: `${realtimeData.processingRate.toFixed(1)}%`,
      change: '+2.3%',
      trend: 'up',
      icon: '✓',
      color: 'green',
      subtext: 'Last 30 days'
    },
    {
      title: 'Total Amount Validated',
      value: '$4.2M',
      change: '+18.2%',
      trend: 'up',
      icon: '💰',
      color: 'purple',
      subtext: 'This quarter'
    },
    {
      title: 'Average Processing Time',
      value: '1.8s',
      change: '-15.7%',
      trend: 'down',
      icon: '⚡',
      color: 'yellow',
      subtext: 'Per invoice'
    },
    {
      title: 'Active Vendors',
      value: '247',
      change: '+8.3%',
      trend: 'up',
      icon: '🏢',
      color: 'indigo',
      subtext: 'Total registered'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '-12.1%',
      trend: 'down',
      icon: '⏳',
      color: 'orange',
      subtext: 'Requires action'
    }
  ];

  const recentActivity = [
    { id: 1, type: 'success', message: 'Invoice INV-2024-156 matched with PO-2024-789', time: '2 mins ago', score: 98 },
    { id: 2, type: 'processing', message: 'Processing batch of 15 invoices from TechSupply Corp', time: '5 mins ago', score: null },
    { id: 3, type: 'warning', message: 'Amount mismatch detected on INV-2024-157', time: '8 mins ago', score: 67 },
    { id: 4, type: 'success', message: 'Successfully validated $45,600 across 3 transactions', time: '12 mins ago', score: 99 },
    { id: 5, type: 'info', message: 'New vendor "Global Trading Co" added to system', time: '18 mins ago', score: null },
    { id: 6, type: 'success', message: 'Monthly compliance report generated', time: '25 mins ago', score: 100 }
  ];

  const topVendors = [
    { name: 'TechSupply Corp', invoices: 342, amount: 1245600, trend: 'up', compliance: 98 },
    { name: 'Office Solutions Ltd', invoices: 289, amount: 856700, trend: 'up', compliance: 95 },
    { name: 'Digital Systems Inc', invoices: 256, amount: 1023400, trend: 'down', compliance: 97 },
    { name: 'Global Trading Co', invoices: 198, amount: 687500, trend: 'up', compliance: 92 },
    { name: 'Enterprise Hardware', invoices: 167, amount: 934200, trend: 'up', compliance: 99 }
  ];

  const processingStats = {
    byStatus: [
      { status: 'Completed', count: 3245, percentage: 84.3, color: 'bg-green-500' },
      { status: 'In Progress', count: 312, percentage: 8.1, color: 'bg-blue-500' },
      { status: 'Pending Review', count: 234, percentage: 6.1, color: 'bg-yellow-500' },
      { status: 'Failed', count: 56, percentage: 1.5, color: 'bg-red-500' }
    ],
    byMonth: [
      { month: 'Jan', processed: 2850, failed: 45 },
      { month: 'Feb', processed: 3120, failed: 38 },
      { month: 'Mar', processed: 3445, failed: 52 },
      { month: 'Apr', processed: 3780, failed: 42 },
      { month: 'May', processed: 3847, failed: 56 }
    ]
  };

  const complianceMetrics = [
    { metric: 'PO Match Rate', value: 96.8, target: 95, status: 'excellent' },
    { metric: 'Amount Accuracy', value: 98.2, target: 98, status: 'excellent' },
    { metric: 'Date Validation', value: 99.1, target: 99, status: 'excellent' },
    { metric: 'Vendor Compliance', value: 94.5, target: 95, status: 'warning' },
    { metric: 'Document Completeness', value: 97.3, target: 96, status: 'excellent' }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
              <p className="text-slate-600 mt-1">Real-time insights into your invoice processing workflow</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all">
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Export Report</span>
                </span>
              </button>
            </div>
          </div>
          
          {/* Real-time Status Bar */}
          <div className="flex items-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-600">System Status: <span className="font-semibold text-green-600">Operational</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-600">Active Jobs: <span className="font-semibold text-blue-600">{realtimeData.activeJobs}</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-600">Queue: <span className="font-semibold text-orange-600">{realtimeData.queuedItems}</span></span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-600">Last Updated: <span className="font-semibold">Just now</span></span>
            </div>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 hover:border-blue-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => setActiveWidget(activeWidget === kpi.title ? null : kpi.title)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 mb-1">{kpi.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-${kpi.color}-100 flex items-center justify-center text-2xl`}>
                  {kpi.icon}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{kpi.subtext}</span>
                <span className={`flex items-center space-x-1 text-sm font-semibold ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <svg className={`w-4 h-4 ${kpi.trend === 'down' && 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span>{kpi.change}</span>
                </span>
              </div>
              {activeWidget === kpi.title && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Today:</span>
                      <span className="font-semibold">+{Math.floor(Math.random() * 100)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Yesterday:</span>
                      <span className="font-semibold">+{Math.floor(Math.random() * 100)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">7-day avg:</span>
                      <span className="font-semibold">+{Math.floor(Math.random() * 100)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Processing Statistics */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Processing Statistics</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View Details →</button>
            </div>
            
            {/* Status Distribution */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">By Status</h3>
              <div className="space-y-4">
                {processingStats.byStatus.map((stat, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{stat.status}</span>
                      <span className="text-sm font-semibold text-slate-900">{stat.count.toLocaleString()} ({stat.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div className={`${stat.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${stat.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Trend */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Monthly Trend</h3>
              <div className="flex items-end justify-between space-x-2 h-48">
                {processingStats.byMonth.map((month, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col items-center space-y-1 mb-2">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all cursor-pointer"
                        style={{ height: `${(month.processed / 4000) * 100}%` }}
                        title={`${month.processed} processed`}
                      ></div>
                      {month.failed > 0 && (
                        <div
                          className="w-full bg-red-500 rounded-t-lg"
                          style={{ height: `${(month.failed / 4000) * 100}%` }}
                          title={`${month.failed} failed`}
                        ></div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-slate-600">{month.month}</span>
                    <span className="text-xs text-slate-500">{month.processed}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' :
                    activity.type === 'processing' ? 'bg-blue-500 animate-pulse' :
                    'bg-slate-400'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 leading-relaxed">{activity.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-slate-500">{activity.time}</span>
                      {activity.score && (
                        <span className="text-xs font-semibold text-green-600">{activity.score}%</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Vendors */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Top Vendors</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All →</button>
            </div>
            <div className="space-y-4">
              {topVendors.map((vendor, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{vendor.name}</p>
                      <p className="text-sm text-slate-600">{vendor.invoices} invoices • ${(vendor.amount / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{vendor.compliance}%</p>
                      <p className="text-xs text-slate-500">Compliance</p>
                    </div>
                    <svg className={`w-5 h-5 ${vendor.trend === 'up' ? 'text-green-500' : 'text-red-500'} ${vendor.trend === 'down' && 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Metrics */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Compliance Metrics</h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">98.2% Overall</span>
            </div>
            <div className="space-y-5">
              {complianceMetrics.map((metric, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{metric.metric}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-slate-900">{metric.value}%</span>
                      <span className={`w-2 h-2 rounded-full ${
                        metric.status === 'excellent' ? 'bg-green-500' :
                        metric.status === 'warning' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}></span>
                    </div>
                  </div>
                  <div className="relative w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${
                        metric.status === 'excellent' ? 'bg-gradient-to-r from-green-500 to-green-400' :
                        metric.status === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                        'bg-gradient-to-r from-red-500 to-red-400'
                      }`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                    <div
                      className="absolute top-0 left-0 h-2 border-r-2 border-slate-400"
                      style={{ width: `${metric.target}%` }}
                      title={`Target: ${metric.target}%`}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-slate-500">Target: {metric.target}%</span>
                    {metric.value >= metric.target ? (
                      <span className="text-xs text-green-600 font-medium">✓ Met</span>
                    ) : (
                      <span className="text-xs text-yellow-600 font-medium">⚠ Below Target</span>
                    )}
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
