# MongoDB Integration Setup

This guide explains how to set up and use the MongoDB integration for the Invoice Processing Workflow.

## Prerequisites

- MongoDB installed and running locally (default: `mongodb://localhost:27017`)
- Node.js and npm installed

## Quick Start

### 1. Ensure MongoDB is Running

Make sure MongoDB is running on your system. For local development:

```bash
# Check if MongoDB is running
mongosh --eval "db.version()"
```

### 2. Seed the Database

Run the seeding script to populate MongoDB with sample data:

```bash
npm run seed
```

This will create:
- Database: `invoiceflow`
- Collections: `invoices` and `purchase_orders`
- 5 purchase orders and 5 invoices (with mixed matching scenarios)

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Test the Workflow

1. Open http://localhost:3000/workflow
2. Select "MongoDB" as the data source
3. Optionally test the connection (works with default localhost setup)
4. Click "Start Processing"
5. The system will fetch real data from MongoDB and display validation results

## Data Structure

### Sample Data Overview

The seed script creates:
- **3 Perfect Matches** (INV-001, INV-003, INV-005): 100% field matching
- **1 Minor Mismatch** (INV-002): Payment terms differ
- **1 Multiple Mismatches** (INV-004): Vendor name, date, amount, payment terms, address, and tax differ

### Purchase Order Fields

```javascript
{
  poNumber: 'PO-2024-XXX',
  vendorName: 'Vendor Name',
  date: '2024-XX-XX',
  totalAmount: 15750.00,
  currency: 'USD',
  paymentTerms: 'Net 30',
  shippingAddress: 'Address',
  taxAmount: 1575.00,
  items: [...]
}
```

### Invoice Fields

```javascript
{
  invoiceNumber: 'INV-2024-XXX',
  poNumber: 'PO-2024-XXX',
  vendorName: 'Vendor Name',
  invoiceDate: '2024-XX-XX',
  totalAmount: 15750.00,
  currency: 'USD',
  paymentTerms: 'Net 30',
  shippingAddress: 'Address',
  taxAmount: 1575.00,
  status: 'pending'
}
```

## Field Matching Logic

The system compares 8 key fields between invoices and purchase orders:
1. PO Number
2. Vendor Name
3. Invoice Date
4. Total Amount
5. Currency
6. Payment Terms
7. Shipping Address
8. Tax Amount

**Scoring:**
- Match Score = (Matched Fields / Total Fields) × 100
- Status: `success` if score ≥ 85%, otherwise `warning`

## Environment Variables

Create a `.env.local` file if you need to customize the MongoDB connection:

```env
MONGODB_URI=mongodb://localhost:27017
```

## API Endpoints

### Test Connection
- **POST** `/api/mongodb/test`
- Tests MongoDB connectivity

### Fetch Invoices & POs
- **GET** `/api/mongodb/invoices`
- Returns all invoices and purchase orders from the database

## Troubleshooting

### MongoDB Connection Failed

If you see connection errors:

1. Ensure MongoDB is running:
   ```bash
   brew services start mongodb-community  # macOS
   sudo systemctl start mongod            # Linux
   ```

2. Check MongoDB is accessible:
   ```bash
   mongosh
   ```

3. Verify the port (default: 27017)

### No Data Returned

If the workflow shows no results:

1. Re-run the seed script:
   ```bash
   npm run seed
   ```

2. Verify data in MongoDB:
   ```bash
   mongosh invoiceflow
   db.invoices.find()
   db.purchase_orders.find()
   ```

### Clear Database

To clear the database and start fresh:

```bash
mongosh invoiceflow
db.invoices.deleteMany({})
db.purchase_orders.deleteMany({})
```

Then re-run the seed script.

## Next Steps

- The MongoDB integration also works for "Azure Storage" and "Fusion ERM" options (they use the same endpoint for demo purposes)
- You can modify the seed script to add your own custom data
- The matching algorithm can be customized in the `matchInvoiceWithPO` function in `app/workflow/page.tsx`

## Support

For issues or questions, please refer to the main README.md or create an issue in the repository.
