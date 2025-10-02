'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProcessingItem {
  id: string;
  invoiceNumber: string;
  poNumber: string;
  vendor: string;
  amount: number;
  status: 'pending' | 'processing' | 'matched' | 'failed';
  matchScore: number;
  validations: {
    poMatch: boolean;
    amountMatch: boolean;
    dateValid: boolean;
    vendorMatch: boolean;
  };
}

export default function ProcessingPage() {
  const router = useRouter();
  const [processing, setProcessing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Extracting data...');
  
  const [items, setItems] = useState<ProcessingItem[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      poNumber: 'PO-2024-156',
      vendor: 'TechSupply Corp',
      amount: 15750.00,
      status: 'pending',
      matchScore: 0,
      validations: { poMatch: false, amountMatch: false, dateValid: false, vendorMatch: false }
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      poNumber: 'PO-2024-157',
      vendor: 'Office Solutions Ltd',
      amount: 8450.50,
      status: 'pending',
      matchScore: 0,
      validations: { poMatch: false, amountMatch: false, dateValid: false, vendorMatch: false }
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      poNumber: 'PO-2024-158',
      vendor: 'Digital Systems Inc',
      amount: 23200.00,
      status: 'pending',
      matchScore: 0,
      validations: { poMatch: false, amountMatch: false, dateValid: false, vendorMatch: false }
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      poNumber: 'PO-2024-159',
      vendor: 'Global Trading Co',
      amount: 12890.75,
      status: 'pending',
      matchScore: 0,
      validations: { poMatch: false, amountMatch: false, dateValid: false, vendorMatch: false }
    },
    {
      id: '5',
      invoiceNumber: 'INV-2024-005',
      poNumber: 'PO-2024-160',
      vendor: 'Enterprise Hardware',
      amount: 45600.00,
      status: 'pending',
      matchScore: 0,
      validations: { poMatch: false, amountMatch: false, dateValid: false, vendorMatch: false }
    }
  ]);

  useEffect(() => {
    const steps = [
      'Extracting data from documents...',
      'Parsing invoice information...',
      'Matching with purchase orders...',
      'Validating amounts and dates...',
      'Performing compliance checks...',
      'Finalizing results...'
    ];

    let currentStepIndex = 0;
    let itemIndex = 0;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 2, 100);
        
        const stepProgress = Math.floor((newProgress / 100) * steps.length);
        if (stepProgress < steps.length && stepProgress !== currentStepIndex) {
          currentStepIndex = stepProgress;
          setCurrentStep(steps[stepProgress]);
        }

        if (newProgress > 20 && itemIndex < items.length) {
          const itemProgress = Math.floor((newProgress - 20) / (80 / items.length));
          if (itemProgress > itemIndex) {
            const currentIndex = itemIndex;
            setItems(prevItems => {
              const newItems = [...prevItems];
              if (currentIndex < newItems.length && newItems[currentIndex]) {
                const item = newItems[currentIndex];
                item.status = 'processing';
                
                setTimeout(() => {
                  setItems(prevItems2 => {
                    const updatedItems = [...prevItems2];
                    if (currentIndex < updatedItems.length && updatedItems[currentIndex]) {
                      const processedItem = updatedItems[currentIndex];
                      const isSuccess = Math.random() > 0.1;
                      
                      processedItem.status = isSuccess ? 'matched' : 'failed';
                      processedItem.matchScore = isSuccess ? Math.floor(Math.random() * 10) + 90 : Math.floor(Math.random() * 30) + 60;
                      processedItem.validations = {
                        poMatch: isSuccess,
                        amountMatch: isSuccess ? true : Math.random() > 0.3,
                        dateValid: isSuccess ? true : Math.random() > 0.2,
                        vendorMatch: isSuccess
                      };
                    }
                    
                    return updatedItems;
                  });
                }, 800);
              }
              
              return newItems;
            });
            itemIndex++;
          }
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setProcessing(false);
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const matchedCount = items.filter(item => item.status === 'matched').length;
  const failedCount = items.filter(item => item.status === 'failed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Data Processing</h1>
              <p className="text-sm text-gray-600 mt-1">Step 2 of 4 - Matching and validation in progress</p>
            </div>
            <button onClick={() => router.push('/login')} className="text-gray-600 hover:text-gray-900">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-2 text-sm text-gray-500">Ingestion</span>
            </div>
            <div className="flex-1 h-1 bg-blue-600"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">2</div>
              <span className="ml-2 text-sm font-medium text-gray-900">Processing</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">3</div>
              <span className="ml-2 text-sm text-gray-500">Results</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">4</div>
              <span className="ml-2 text-sm text-gray-500">Share</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Processing Status</h2>
              <p className="text-sm text-gray-600 mt-1">{currentStep}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{progress}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {!processing && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Matched</p>
                    <p className="text-2xl font-bold text-green-700">{matchedCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600 font-medium">Failed</p>
                    <p className="text-2xl font-bold text-red-700">{failedCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Total</p>
                    <p className="text-2xl font-bold text-blue-700">{items.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Invoice & PO Matching</h3>
            <p className="text-sm text-gray-600 mt-1">Real-time validation results</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Validations</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.invoiceNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.poNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.vendor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">${item.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === 'pending' || item.status === 'processing' ? (
                        <span className="text-gray-400">—</span>
                      ) : (
                        <span className={`font-bold ${item.status === 'matched' ? 'text-green-600' : 'text-red-600'}`}>
                          {item.matchScore}%
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-1">
                        {Object.entries(item.validations).map(([key, value]) => (
                          <div
                            key={key}
                            className={`w-6 h-6 rounded flex items-center justify-center ${
                              item.status === 'pending' || item.status === 'processing'
                                ? 'bg-gray-200'
                                : value
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }`}
                            title={key}
                          >
                            {(item.status === 'matched' || item.status === 'failed') && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {value ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                )}
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === 'pending' && (
                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Pending</span>
                      )}
                      {item.status === 'processing' && (
                        <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full flex items-center space-x-1">
                          <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing</span>
                        </span>
                      )}
                      {item.status === 'matched' && (
                        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Matched</span>
                      )}
                      {item.status === 'failed' && (
                        <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">Failed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => router.push('/ingestion')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Back to Ingestion
          </button>
          <button
            onClick={() => router.push('/results')}
            disabled={processing}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg disabled:opacity-50"
          >
            View Results
          </button>
        </div>
      </main>
    </div>
  );
}
