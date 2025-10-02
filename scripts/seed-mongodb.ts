import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'invoiceflow';

const purchaseOrders = [
  {
    poNumber: 'PO-2024-156',
    vendorName: 'TechSupply Corp',
    date: '2024-01-15',
    totalAmount: 15750.00,
    currency: 'USD',
    paymentTerms: 'Net 30',
    shippingAddress: '123 Main St, NY',
    taxAmount: 1575.00,
    items: [
      { description: 'Laptop', quantity: 5, unitPrice: 3000, total: 15000 }
    ]
  },
  {
    poNumber: 'PO-2024-157',
    vendorName: 'Office Solutions',
    date: '2024-01-18',
    totalAmount: 8450.00,
    currency: 'USD',
    paymentTerms: 'Net 45',
    shippingAddress: '456 Oak Ave, CA',
    taxAmount: 845.00,
    items: [
      { description: 'Office Chairs', quantity: 10, unitPrice: 750, total: 7500 }
    ]
  },
  {
    poNumber: 'PO-2024-158',
    vendorName: 'Digital Systems',
    date: '2024-01-20',
    totalAmount: 23200.00,
    currency: 'USD',
    paymentTerms: 'Net 60',
    shippingAddress: '789 Pine Rd, TX',
    taxAmount: 2320.00,
    items: [
      { description: 'Servers', quantity: 2, unitPrice: 10000, total: 20000 }
    ]
  },
  {
    poNumber: 'PO-2024-159',
    vendorName: 'Global Trading',
    date: '2024-01-22',
    totalAmount: 12890.00,
    currency: 'USD',
    paymentTerms: 'Net 30',
    shippingAddress: '321 Elm St, FL',
    taxAmount: 1289.00,
    items: [
      { description: 'Monitors', quantity: 15, unitPrice: 800, total: 12000 }
    ]
  },
  {
    poNumber: 'PO-2024-160',
    vendorName: 'Enterprise Hardware',
    date: '2024-01-28',
    totalAmount: 45600.00,
    currency: 'USD',
    paymentTerms: 'Net 30',
    shippingAddress: '555 Tech Blvd, WA',
    taxAmount: 4560.00,
    items: [
      { description: 'Workstations', quantity: 10, unitPrice: 4000, total: 40000 }
    ]
  }
];

const invoices = [
  // Perfect match
  {
    invoiceNumber: 'INV-2024-001',
    poNumber: 'PO-2024-156',
    vendorName: 'TechSupply Corp',
    invoiceDate: '2024-01-15',
    totalAmount: 15750.00,
    currency: 'USD',
    paymentTerms: 'Net 30',
    shippingAddress: '123 Main St, NY',
    taxAmount: 1575.00,
    status: 'pending'
  },
  // Mismatch in payment terms
  {
    invoiceNumber: 'INV-2024-002',
    poNumber: 'PO-2024-157',
    vendorName: 'Office Solutions',
    invoiceDate: '2024-01-18',
    totalAmount: 8450.00,
    currency: 'USD',
    paymentTerms: 'Net 30', // PO says Net 45
    shippingAddress: '456 Oak Ave, CA',
    taxAmount: 845.00,
    status: 'pending'
  },
  // Perfect match
  {
    invoiceNumber: 'INV-2024-003',
    poNumber: 'PO-2024-158',
    vendorName: 'Digital Systems',
    invoiceDate: '2024-01-20',
    totalAmount: 23200.00,
    currency: 'USD',
    paymentTerms: 'Net 60',
    shippingAddress: '789 Pine Rd, TX',
    taxAmount: 2320.00,
    status: 'pending'
  },
  // Multiple mismatches
  {
    invoiceNumber: 'INV-2024-004',
    poNumber: 'PO-2024-159',
    vendorName: 'Global Trading Co', // Slight name difference
    invoiceDate: '2024-01-25', // Different date
    totalAmount: 12990.00, // Different amount
    currency: 'USD',
    paymentTerms: 'Net 45', // PO says Net 30
    shippingAddress: '321 Elm Street, FL', // Slight address difference
    taxAmount: 1299.00, // Different tax
    status: 'pending'
  },
  // Perfect match
  {
    invoiceNumber: 'INV-2024-005',
    poNumber: 'PO-2024-160',
    vendorName: 'Enterprise Hardware',
    invoiceDate: '2024-01-28',
    totalAmount: 45600.00,
    currency: 'USD',
    paymentTerms: 'Net 30',
    shippingAddress: '555 Tech Blvd, WA',
    taxAmount: 4560.00,
    status: 'pending'
  }
];

async function seedDatabase() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    
    // Clear existing data
    await db.collection('purchase_orders').deleteMany({});
    await db.collection('invoices').deleteMany({});
    console.log('Cleared existing data');
    
    // Insert purchase orders
    const poResult = await db.collection('purchase_orders').insertMany(purchaseOrders);
    console.log(`Inserted ${poResult.insertedCount} purchase orders`);
    
    // Insert invoices
    const invResult = await db.collection('invoices').insertMany(invoices);
    console.log(`Inserted ${invResult.insertedCount} invoices`);
    
    console.log('\n✓ Database seeded successfully!');
    console.log('\nData Summary:');
    console.log('- 3 Perfect matches (INV-001, INV-003, INV-005)');
    console.log('- 1 Minor mismatch (INV-002: payment terms)');
    console.log('- 1 Multiple mismatches (INV-004: vendor name, date, amount, payment terms, address, tax)');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

seedDatabase();
