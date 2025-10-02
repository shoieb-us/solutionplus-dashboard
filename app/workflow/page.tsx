'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';

type WorkflowStep = 'ingestion' | 'processing' | 'results';
type IngestionMethod = 'pdf' | 'mongodb' | 'azure' | 'fusion' | null;

export default function WorkflowPage() {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('ingestion');
  const [selectedMethod, setSelectedMethod] = useState<IngestionMethod>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedResults, setProcessedResults] = useState<any[]>([]);

  const ingestionMethods = [
    {
      id: 'pdf',
      name: 'PDF Upload',
      description: 'Upload invoice and PO documents',
      icon: '📄',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      description: 'Connect to database',
      icon: '🗄️',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'azure',
      name: 'Azure Storage',
      description: 'Import from cloud',
      icon: '☁️',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'fusion',
      name: 'Fusion ERM',
      description: 'ERM integration',
      icon: '⚡',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const startProcessing = () => {
    setCurrentStep('processing');
    setIsProcessing(true);
    setProgress(0);

    // Simulate processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setCurrentStep('results');
          // Generate mock results
          setProcessedResults([
            { id: 1, invoice: 'INV-2024-001', po: 'PO-2024-156', vendor: 'TechSupply Corp', amount: 15750, status: 'success', score: 98 },
            { id: 2, invoice: 'INV-2024-002', po: 'PO-2024-157', vendor: 'Office Solutions', amount: 8450, status: 'success', score: 95 },
            { id: 3, invoice: 'INV-2024-003', po: 'PO-2024-158', vendor: 'Digital Systems', amount: 23200, status: 'success', score: 97 },
            { id: 4, invoice: 'INV-2024-004', po: 'PO-2024-159', vendor: 'Global Trading', amount: 12890, status: 'warning', score: 67 },
            { id: 5, invoice: 'INV-2024-005', po: 'PO-2024-160', vendor: 'Enterprise Hardware', amount: 45600, status: 'success', score: 99 }
          ]);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const resetWorkflow = () => {
    setCurrentStep('ingestion');
    setSelectedMethod(null);
    setUploadedFiles([]);
    setIsProcessing(false);
    setProgress(0);
    setProcessedResults([]);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Invoice Processing Workflow</h1>
          <p className="text-slate-600 mt-1">Complete pipeline from data ingestion to validation results</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className={`flex items-center ${currentStep === 'ingestion' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  currentStep !== 'ingestion' ? 'bg-green-500' : 'bg-blue-600'
                }`}>
                  {currentStep !== 'ingestion' ? '✓' : '1'}
                </div>
                <span className="ml-3 font-medium text-slate-900">Data Ingestion</span>
              </div>
              <div className={`flex-1 h-1 ${currentStep !== 'ingestion' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
              
              <div className={`flex items-center ${currentStep === 'processing' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  currentStep === 'results' ? 'bg-green-500' : currentStep === 'processing' ? 'bg-blue-600' : 'bg-slate-300'
                }`}>
                  {currentStep === 'results' ? '✓' : '2'}
                </div>
                <span className="ml-3 font-medium text-slate-900">Processing</span>
              </div>
              <div className={`flex-1 h-1 ${currentStep === 'results' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
              
              <div className={`flex items-center ${currentStep === 'results' ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  currentStep === 'results' ? 'bg-blue-600' : 'bg-slate-300'
                }`}>
                  3
                </div>
                <span className="ml-3 font-medium text-slate-900">Results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* INGESTION STEP */}
          {currentStep === 'ingestion' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Data Source</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {ingestionMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id as IngestionMethod)}
                    className={`relative p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center text-3xl mb-4 mx-auto`}>
                      {method.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">{method.name}</h3>
                    <p className="text-sm text-slate-600 text-center">{method.description}</p>
                    {selectedMethod === method.id && (
                      <div className="absolute top-3 right-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {selectedMethod === 'pdf' && (
                <div className="mb-6">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-50">
                    <input
                      type="file"
                      multiple
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="text-6xl mb-4">📁</div>
                      <p className="text-lg font-medium text-slate-900 mb-2">Drop PDF files here or click to browse</p>
                      <p className="text-sm text-slate-600">Support for invoices and purchase orders</p>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-slate-900 mb-3">Uploaded Files ({uploadedFiles.length})</h4>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">📄</span>
                              <span className="text-sm text-slate-900 font-medium">{file}</span>
                            </div>
                            <span className="text-xs text-green-600 font-medium px-3 py-1 bg-green-50 rounded-full">Ready</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedMethod && selectedMethod !== 'pdf' && (
                <div className="bg-slate-50 rounded-lg p-6 mb-6">
                  <p className="text-sm text-slate-600 mb-4">Configure your {ingestionMethods.find(m => m.id === selectedMethod)?.name} connection</p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Connection details..."
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Test Connection
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={startProcessing}
                  disabled={!selectedMethod || (selectedMethod === 'pdf' && uploadedFiles.length === 0)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Start Processing →
                </button>
              </div>
            </div>
          )}

          {/* PROCESSING STEP */}
          {currentStep === 'processing' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Processing Documents</h2>
              
              <div className="text-center py-12">
                <div className="inline-block">
                  <div className="w-24 h-24 border-8 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-xl font-semibold text-slate-900 mb-2">{progress}% Complete</p>
                  <p className="text-sm text-slate-600">Extracting data and matching with purchase orders...</p>
                </div>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden mt-8">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">{uploadedFiles.length}</p>
                  <p className="text-sm text-slate-600">Files Processing</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
                  <p className="text-2xl font-bold text-purple-600">{Math.floor(progress / 20)}</p>
                  <p className="text-sm text-slate-600">Invoices Matched</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                  <p className="text-2xl font-bold text-green-600">{Math.floor(progress / 25)}%</p>
                  <p className="text-sm text-slate-600">Accuracy Rate</p>
                </div>
              </div>
            </div>
          )}

          {/* RESULTS STEP */}
          {currentStep === 'results' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Processing Complete!</h2>
                  <p className="text-slate-600 mt-1">Review validation results and insights</p>
                </div>
                <button
                  onClick={resetWorkflow}
                  className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Start New Workflow
                </button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <p className="text-sm opacity-90 mb-2">Success Rate</p>
                  <p className="text-4xl font-bold">80%</p>
                  <p className="text-sm opacity-90 mt-2">4 of 5 matched</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <p className="text-sm opacity-90 mb-2">Total Amount</p>
                  <p className="text-4xl font-bold">$105.9K</p>
                  <p className="text-sm opacity-90 mt-2">Validated</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                  <p className="text-sm opacity-90 mb-2">Avg Score</p>
                  <p className="text-4xl font-bold">91%</p>
                  <p className="text-sm opacity-90 mt-2">Match confidence</p>
                </div>
              </div>

              {/* Results Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Invoice</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">PO</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Vendor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {processedResults.map((result) => (
                      <tr key={result.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{result.invoice}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{result.po}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{result.vendor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">${result.amount.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`font-bold ${result.status === 'success' ? 'text-green-600' : 'text-yellow-600'}`}>
                            {result.score}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            result.status === 'success' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {result.status === 'success' ? 'Matched' : 'Review Required'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                  Export Report
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Approve & Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
