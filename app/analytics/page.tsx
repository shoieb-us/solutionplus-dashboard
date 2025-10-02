'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('overview');

  // Base data for different time ranges
  const allData = {
    '7d': {
      monthly: [
        { month: 'Day 1', processed: 580, amount: 68400, success: 554, validationRate: 95.5 },
        { month: 'Day 2', processed: 624, amount: 77000, success: 595, validationRate: 95.4 },
        { month: 'Day 3', processed: 689, amount: 84200, success: 658, validationRate: 95.5 },
        { month: 'Day 4', processed: 756, amount: 93600, success: 722, validationRate: 95.5 },
        { month: 'Day 5', processed: 769, amount: 99600, success: 738, validationRate: 96.0 },
        { month: 'Day 6', processed: 712, amount: 88800, success: 681, validationRate: 95.6 },
        { month: 'Day 7', processed: 698, amount: 86200, success: 667, validationRate: 95.6 }
      ],
      metrics: {
        avgProcessingTime: '1.6s',
        matchAccuracy: '98.1%',
        costSavings: '$12K',
        errorRate: '1.2%',
        trends: { processing: '↓ 8%', accuracy: '↑ 1.8%', savings: '↑ 15%', errors: '↓ 0.5%' }
      }
    },
    '30d': {
      monthly: [
        { month: 'Jan', processed: 2850, amount: 342000, success: 2720, validationRate: 95.4 },
        { month: 'Feb', processed: 3120, amount: 385000, success: 2974, validationRate: 95.3 },
        { month: 'Mar', processed: 3445, amount: 421000, success: 3290, validationRate: 95.5 },
        { month: 'Apr', processed: 3780, amount: 468000, success: 3610, validationRate: 95.5 },
        { month: 'May', processed: 3847, amount: 498000, success: 3693, validationRate: 96.0 }
      ],
      metrics: {
        avgProcessingTime: '1.8s',
        matchAccuracy: '97.8%',
        costSavings: '$45K',
        errorRate: '1.5%',
        trends: { processing: '↓ 15%', accuracy: '↑ 2.3%', savings: '↑ 28%', errors: '↓ 0.8%' }
      }
    },
    '90d': {
      monthly: [
        { month: 'Month 1', processed: 8950, amount: 1125000, success: 8542, validationRate: 95.4 },
        { month: 'Month 2', processed: 9420, amount: 1285000, success: 8985, validationRate: 95.4 },
        { month: 'Month 3', processed: 10145, amount: 1421000, success: 9689, validationRate: 95.5 }
      ],
      metrics: {
        avgProcessingTime: '2.1s',
        matchAccuracy: '97.2%',
        costSavings: '$128K',
        errorRate: '1.8%',
        trends: { processing: '↓ 22%', accuracy: '↑ 3.1%', savings: '↑ 35%', errors: '↓ 1.2%' }
      }
    },
    '6m': {
      monthly: [
        { month: 'Jan', processed: 18950, amount: 2342000, success: 18087, validationRate: 95.4 },
        { month: 'Feb', processed: 21120, amount: 2685000, success: 20137, validationRate: 95.3 },
        { month: 'Mar', processed: 23445, amount: 2921000, success: 22375, validationRate: 95.4 },
        { month: 'Apr', processed: 25780, amount: 3268000, success: 24594, validationRate: 95.4 },
        { month: 'May', processed: 27847, amount: 3598000, success: 26733, validationRate: 96.0 },
        { month: 'Jun', processed: 29234, amount: 3785000, success: 28065, validationRate: 96.0 }
      ],
      metrics: {
        avgProcessingTime: '2.3s',
        matchAccuracy: '96.8%',
        costSavings: '$285K',
        errorRate: '2.1%',
        trends: { processing: '↓ 28%', accuracy: '↑ 4.2%', savings: '↑ 42%', errors: '↓ 1.8%' }
      }
    }
  };

  // Get current data based on selected time range
  const monthlyData = allData[timeRange as keyof typeof allData].monthly;
  const currentMetrics = allData[timeRange as keyof typeof allData].metrics;

  const validationMetrics = [
    { name: 'Duplicate Check', successRate: 99.8, failures: 8, category: 'document' },
    { name: 'Supplier Name', successRate: 97.2, failures: 108, category: 'supplier' },
    { name: 'Asset Name', successRate: 95.8, failures: 162, category: 'document' },
    { name: 'Billing Address', successRate: 94.3, failures: 219, category: 'supplier' },
    { name: 'Document Type', successRate: 98.9, failures: 42, category: 'document' },
    { name: 'Tax Invoice', successRate: 96.7, failures: 127, category: 'financial' },
    { name: 'Invoice or Credit Note', successRate: 99.1, failures: 35, category: 'document' },
    { name: 'Supplier TRN Number', successRate: 93.2, failures: 262, category: 'supplier' },
    { name: 'Customer TRN Number', successRate: 91.8, failures: 316, category: 'supplier' },
    { name: 'Bank Account Number', successRate: 96.4, failures: 139, category: 'financial' },
    { name: 'IBAN Number', successRate: 95.1, failures: 189, category: 'financial' },
    { name: 'Swift Code', successRate: 97.8, failures: 85, category: 'financial' },
    { name: 'Sort Code', successRate: 98.2, failures: 69, category: 'financial' },
    { name: 'ABA Routing Number', successRate: 99.3, failures: 27, category: 'financial' },
    { name: 'Invoice Number', successRate: 98.7, failures: 50, category: 'document' },
    { name: 'Invoice Date', successRate: 97.5, failures: 96, category: 'document' },
    { name: 'Invoice Currency', successRate: 99.4, failures: 23, category: 'financial' },
    { name: 'Invoice Amount before Tax', successRate: 94.8, failures: 200, category: 'financial' },
    { name: 'VAT Amount', successRate: 93.6, failures: 246, category: 'financial' },
    { name: 'Invoice Total Amount', successRate: 95.2, failures: 185, category: 'financial' },
    { name: 'Description', successRate: 89.7, failures: 397, category: 'document' },
    { name: 'Invoice FTA Requirements', successRate: 92.4, failures: 293, category: 'financial' },
    { name: 'PO Invoice', successRate: 96.8, failures: 123, category: 'document' },
    { name: 'Purchase Order/Work Order', successRate: 94.1, failures: 227, category: 'document' },
    { name: 'Supporting Documents', successRate: 87.3, failures: 489, category: 'document' },
    { name: 'Invoice Attached', successRate: 99.6, failures: 15, category: 'document' },
    { name: 'Split Gross Amount and VAT', successRate: 91.2, failures: 339, category: 'financial' }
  ];

  const categoryData = {
    document: validationMetrics.filter(m => m.category === 'document'),
    supplier: validationMetrics.filter(m => m.category === 'supplier'),
    financial: validationMetrics.filter(m => m.category === 'financial')
  };

  const errorTrends = [
    { month: 'Jan', document: 45, supplier: 32, financial: 28 },
    { month: 'Feb', document: 42, supplier: 35, financial: 31 },
    { month: 'Mar', document: 38, supplier: 29, financial: 25 },
    { month: 'Apr', document: 35, supplier: 27, financial: 22 },
    { month: 'May', document: 32, supplier: 24, financial: 19 }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
              <p className="text-gray-500 text-sm mt-1">Invoice validation insights</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="6m">Last 6 months</option>
              </select>
              <button className="px-3 py-2 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-600">Processing Time</p>
              <span className="text-xs text-green-600 font-medium">{currentMetrics.trends.processing}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{currentMetrics.avgProcessingTime}</p>
            <p className="text-xs text-gray-500 mt-1">Per invoice</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-600">Match Accuracy</p>
              <span className="text-xs text-green-600 font-medium">{currentMetrics.trends.accuracy}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{currentMetrics.matchAccuracy}</p>
            <p className="text-xs text-gray-500 mt-1">{timeRange === '7d' ? 'Last 7 days' : timeRange === '30d' ? 'Last 30 days' : timeRange === '90d' ? 'Last 90 days' : 'Last 6 months'}</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-600">Cost Savings</p>
              <span className="text-xs text-green-600 font-medium">{currentMetrics.trends.savings}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{currentMetrics.costSavings}</p>
            <p className="text-xs text-gray-500 mt-1">{timeRange === '7d' ? 'This week' : timeRange === '30d' ? 'This month' : timeRange === '90d' ? 'This quarter' : 'Last 6 months'}</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-600">Error Rate</p>
              <span className="text-xs text-green-600 font-medium">{currentMetrics.trends.errors}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">{currentMetrics.errorRate}</p>
            <p className="text-xs text-gray-500 mt-1">Below target</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Processing Volume Chart */}
          <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Processing Volume</h2>
            <div className="h-48 flex items-end justify-between space-x-2">
              {(() => {
                const maxProcessed = Math.max(...monthlyData.map(d => d.processed));
                return monthlyData.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col-reverse items-center space-y-reverse space-y-1">
                      <div
                        className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                        style={{ height: `${(data.processed / maxProcessed) * 160}px` }}
                        title={`${data.processed.toLocaleString()} processed`}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                    <span className="text-xs text-gray-400">{data.processed.toLocaleString()}</span>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Success Rate Chart */}
          <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Success Rate Trend</h2>
            <div className="h-48 relative">
              <svg className="w-full h-full" viewBox="0 0 400 192">
                {(() => {
                  const successRates = monthlyData.map(data => (data.success / data.processed) * 100);
                  const minRate = Math.min(...successRates);
                  const maxRate = Math.max(...successRates);
                  const range = maxRate - minRate || 1;
                  
                  const points = successRates.map((rate, idx) => ({
                    x: 40 + (320 * idx) / (successRates.length - 1),
                    y: 160 - ((rate - minRate) / range) * 120,
                    rate: rate
                  }));

                  // Generate smooth path
                  let path = `M ${points[0].x} ${points[0].y}`;
                  for (let i = 1; i < points.length; i++) {
                    const prev = points[i - 1];
                    const curr = points[i];
                    const cpx = (prev.x + curr.x) / 2;
                    path += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
                  }

                  return (
                    <>
                      {/* Grid lines */}
                      <line x1="40" y1="40" x2="360" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="40" y1="100" x2="360" y2="100" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1="40" y1="160" x2="360" y2="160" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 2" />
                      
                      {/* Y-axis labels */}
                      <text x="10" y="45" className="text-xs fill-gray-400">{maxRate.toFixed(1)}%</text>
                      <text x="10" y="105" className="text-xs fill-gray-400">{((minRate + maxRate) / 2).toFixed(1)}%</text>
                      <text x="10" y="165" className="text-xs fill-gray-400">{minRate.toFixed(1)}%</text>
                      
                      {/* Line path */}
                      <path
                        d={path}
                        stroke="#10b981"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Data points */}
                      {points.map((point, idx) => (
                        <g key={idx}>
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill="#fff"
                            stroke="#10b981"
                            strokeWidth="2.5"
                            className="hover:r-6 transition-all cursor-pointer"
                          />
                        </g>
                      ))}
                      
                      {/* X-axis labels */}
                      {points.map((point, idx) => (
                        <g key={idx}>
                          <text x={point.x} y="180" textAnchor="middle" className="text-xs fill-gray-600">
                            {monthlyData[idx].month}
                          </text>
                          <text x={point.x} y="192" textAnchor="middle" className="text-xs fill-gray-400">
                            {point.rate.toFixed(1)}%
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'document', label: 'Document' },
              { key: 'supplier', label: 'Supplier' },
              { key: 'financial', label: 'Financial' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedCategory === tab.key
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Validation Overview */}
        {selectedCategory === 'overview' && (
          <div className="space-y-6">
            {/* Validation Success Rate by Category */}
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Validation Success Rate</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeDasharray="95.5, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-900">95.5%</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">Document</h3>
                  <p className="text-sm text-gray-500">12 validations</p>
                </div>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="94.4, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-900">94.4%</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">Supplier</h3>
                  <p className="text-sm text-gray-500">4 validations</p>
                </div>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeDasharray="95.8, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-900">95.8%</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900">Financial</h3>
                  <p className="text-sm text-gray-500">11 validations</p>
                </div>
              </div>
            </div>

            {/* Top Validation Issues */}
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Issues</h2>
              <div className="space-y-3">
                {validationMetrics
                  .sort((a, b) => b.failures - a.failures)
                  .slice(0, 6)
                  .map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className={`w-2 h-2 rounded-full ${
                            metric.category === 'document' ? 'bg-blue-500' :
                            metric.category === 'supplier' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}></span>
                          <span className="font-medium text-gray-900 text-sm">{metric.name}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                          <span>Success: {metric.successRate}%</span>
                          <span>Failures: {metric.failures}</span>
                        </div>
                      </div>
                      <div className="w-16">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              metric.successRate >= 95 ? 'bg-green-500' :
                              metric.successRate >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${metric.successRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Document Validation Details */}
        {selectedCategory === 'document' && (
          <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Validation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryData.document.map((metric, idx) => (
                <div key={idx} className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 text-sm">{metric.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      metric.successRate >= 95 ? 'bg-green-100 text-green-700' :
                      metric.successRate >= 90 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.successRate}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          metric.successRate >= 95 ? 'bg-green-500' :
                          metric.successRate >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric.successRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Failures: {metric.failures}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supplier Validation Details */}
        {selectedCategory === 'supplier' && (
          <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Supplier Validation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryData.supplier.map((metric, idx) => (
                <div key={idx} className="p-5 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">{metric.name}</h3>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      metric.successRate >= 95 ? 'bg-green-100 text-green-700' :
                      metric.successRate >= 90 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.successRate}%
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          metric.successRate >= 95 ? 'bg-green-500' :
                          metric.successRate >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric.successRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Failures: {metric.failures}</span>
                      <span className="text-xs text-gray-500">
                        {metric.failures > 200 ? 'High Impact' : metric.failures > 100 ? 'Medium Impact' : 'Low Impact'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financial Validation Details */}
        {selectedCategory === 'financial' && (
          <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Financial Validation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryData.financial.map((metric, idx) => (
                <div key={idx} className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 text-sm">{metric.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      metric.successRate >= 95 ? 'bg-green-100 text-green-700' :
                      metric.successRate >= 90 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.successRate}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          metric.successRate >= 95 ? 'bg-green-500' :
                          metric.successRate >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric.successRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Failures: {metric.failures}</span>
                      {(metric.name.includes('Amount') || metric.name.includes('VAT')) && (
                        <span>Impact: ${(metric.failures * 1250).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
