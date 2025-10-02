'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const vendors = [
    { id: 1, name: 'TechSupply Corp', invoices: 342, amount: 1245600, compliance: 98, status: 'active', contact: 'john@techsupply.com' },
    { id: 2, name: 'Office Solutions Ltd', invoices: 289, amount: 856700, compliance: 95, status: 'active', contact: 'sales@officesolutions.com' },
    { id: 3, name: 'Digital Systems Inc', invoices: 256, amount: 1023400, compliance: 97, status: 'active', contact: 'info@digitalsystems.com' },
    { id: 4, name: 'Global Trading Co', invoices: 198, amount: 687500, compliance: 92, status: 'active', contact: 'contact@globaltrading.com' },
    { id: 5, name: 'Enterprise Hardware', invoices: 167, amount: 934200, compliance: 99, status: 'active', contact: 'support@enthard.com' },
    { id: 6, name: 'Cloud Services Inc', invoices: 145, amount: 678900, compliance: 94, status: 'active', contact: 'hello@cloudservices.com' },
    { id: 7, name: 'Software Solutions', invoices: 123, amount: 567800, compliance: 96, status: 'inactive', contact: 'info@softsolutions.com' },
  ];

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Vendors</h1>
          <p className="text-slate-600 mt-1">Manage vendor relationships and performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Total Vendors</p>
            <p className="text-4xl font-bold">{vendors.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Active</p>
            <p className="text-4xl font-bold">{vendors.filter(v => v.status === 'active').length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Total Invoices</p>
            <p className="text-4xl font-bold">{vendors.reduce((sum, v) => sum + v.invoices, 0)}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90 mb-2">Avg Compliance</p>
            <p className="text-4xl font-bold">{Math.round(vendors.reduce((sum, v) => sum + v.compliance, 0) / vendors.length)}%</p>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 shadow-lg">
              + Add Vendor
            </button>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{vendor.name}</h3>
                  <p className="text-sm text-slate-600">{vendor.contact}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  vendor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Invoices</p>
                  <p className="text-xl font-bold text-slate-900">{vendor.invoices}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Total Value</p>
                  <p className="text-xl font-bold text-slate-900">${(vendor.amount / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Compliance</p>
                  <p className={`text-xl font-bold ${vendor.compliance >= 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {vendor.compliance}%
                  </p>
                </div>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${vendor.compliance}%` }}
                ></div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  View Details
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
