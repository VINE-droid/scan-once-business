# 📦 ScanOnce – Retail POS & Inventory Management System

ScanOnce is a modern Retail POS and Inventory Management System built for **TakeOver'26 Hackathon**.

The system enables small businesses to manage products, inventory, stock receiving, barcode scanning, billing, customer credit, and invoice generation through a clean and responsive web interface.

---

# ✨ Features

## 📦 Inventory Management
- View all products
- Live inventory tracking
- Low stock detection
- Out of stock indicators
- Modern responsive inventory table

## ➕ Product Management
- Add new products
- Automatic barcode generation
- Barcode download
- Category selection
- Form validation

## 📥 Stock Receiving
- Receive inventory
- Automatic stock updates
- Adjustable low stock thresholds

## 🛒 Billing / POS
- Barcode scanning
- Manual barcode entry
- Mobile camera barcode scanner
- Shopping cart
- Invoice generation

## 👥 Customer Management
- Customer records
- Credit sales
- Customer ledger

---

# 🛠 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- html5-qrcode
- JsBarcode
- Lucide React

### Backend
- Node.js
- Express.js

### Database
- Supabase (PostgreSQL)

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd scan-once
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** folder and add the following variables:

```env
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
PORT=5000
```

Start the backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The application will usually run on:

```
http://localhost:5173
```

---

# 📁 Project Structure

```
scan-once
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── config
│   ├── services
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── services
│   │   └── assets
│   └── public
│
└── README.md
```

---

# 📱 Core Workflow

```
Add Product
      ↓
Generate Barcode
      ↓
Receive Stock
      ↓
Inventory Updated
      ↓
Billing
      ↓
Scan Barcode
      ↓
Generate Invoice
```

---

# 📸 Key Features

- Responsive UI
- Barcode Generation
- Mobile Camera Barcode Scanner
- Inventory Tracking
- Customer Credit Sales
- Invoice Generation
- Low Stock Detection
- Modern Dashboard

---

# 👨‍💻 Team

Developed for **TakeOver'26 Hackathon**.

---

# 📄 License

This project was created for educational and hackathon purposes.
