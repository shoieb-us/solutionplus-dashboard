'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function PurchaseOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const purchaseOrders = [
    { id: 'PO-2024-156', vendor: 'TechSupply Corp', date: '2024-01-15', amount: 15750, status: 'active', items: 5 },
    { id: 'PO-2024-157', vendor: 'Office Solutions Ltd', date: '2024-01-18', amount: 8450, status: 'active', items: 3 },
    { id: 'PO-2024-158', vendor: 'Digital Systems Inc', date: '2024-01-20', amount: 23200, status: 'active', items: 8 },
    { id: 'PO-2024-159', vendor: 'Global Trading Co', date: '2024-01-22', amount: 12890, status: 'pending', items: 4 },
    { id: 'PO-2024-160', vendor: 'Enterprise Hardware', date: '2024-01-25', amount: 45600, status: 'active', items: 12 },
    { id: 'PO-2024-161', vendor: 'Software Solutions', date: '2024-01-28', amount: 34200, status: 'completed', items: 6 },
    { id: 'PO-2024-162', vendor: 'Tech Innovators', date: '2024-02-01', amount: 18900, status: 'active', items: 7 },
    { id: 'PO-2024-163', vendor: 'Cloud Services Inc', date: '2024-02-05', amount: 28400, status: 'pending', items: 5 },
  ];

  const filteredOrders = purchaseOrders.filter(po => {
    const matchesSearch = po.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         po.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || po.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: purchaseOrders.length,
    active: purchaseOrders.filter(po => po.status === 'active').length,
    pending: purchaseOrders.filter(po => po.status === 'pending').length,
    completed: purchaseOrders.filter(po => po.status === 'completed').length,
    totalValue: purchaseOrders.reduce((sum, po) => sum + po.amount, 0)
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Purchase Orders</h1>
          <p className="text-slate-600 mt-1">Manage and track all purchase orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Total POs</p>
            <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Active</p>
            <p className="text-3xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Completed</p>
            <p className="text-3xl font-bold text-blue-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Total Value</p>
            <p className="text-2xl font-bold text-purple-600">${(stats.totalValue / 1000).toFixed(0)}K</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between space-x-4">
            <input
              type="text"
              placeholder="Search by PO number or vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 shadow-lg">
              + New PO
            </button>
          </div>
        </div>

        {/* Purchase Orders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">PO Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredOrders.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-blue-600">{po.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-900">{po.vendor}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600">{po.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600">{po.items} items</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-slate-900">${po.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      po.status === 'active' ? 'bg-green-100 text-green-700' :
                      po.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    <button className="text-slate-600 hover:text-slate-800">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
