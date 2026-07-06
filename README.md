# 📦 ScanOnce – Retail POS & Inventory Management System

### **Scan Once, Run Your Whole Business.**

ScanOnce is a modern Retail POS and Inventory Management System developed for **TakeOver'26 Hackathon**.

It enables small businesses to manage products, inventory, stock receiving, barcode scanning, billing, customer credit, and invoice generation through a clean, responsive, and user-friendly interface.

---

# Screenshots

<img width="1917" height="968" alt="image" src="https://github.com/user-attachments/assets/a2dec6c9-7f94-44a1-8ea6-1b3841e84647" />

<img width="1917" height="972" alt="image" src="https://github.com/user-attachments/assets/3e908974-fd98-4263-b1b6-b9825a8a8ad9" />

<img width="1917" height="967" alt="image" src="https://github.com/user-attachments/assets/db6f67bc-53d8-4105-ab58-174846a0effe" />

<img width="1917" height="970" alt="image" src="https://github.com/user-attachments/assets/69f0f45c-27d5-458b-8eaf-b60530890fd7" />


# 🚀 Features

## 📦 Inventory Management
- Live inventory tracking
- Product listing
- Low stock alerts
- Out-of-stock indicators
- Responsive inventory dashboard

## ➕ Product Management
- Add new products
- Automatic barcode generation
- Download barcode labels
- Category selection
- Form validation
- Success confirmation

## 📥 Stock Receiving
- Receive inventory
- Automatic inventory updates
- Configurable low-stock thresholds

## 🛒 Billing / POS
- Barcode lookup
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

# 📂 Project Structure

```
scan-once-business
│
├── backend
│   ├── config
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── package.json
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
├── database
│   ├── schema.sql
│   ├── seed.sql
│   └── schema-reference.sql
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/VINE-droid/scan-once-business.git
cd scan-once-business
```

---

## 2. Create a Supabase Project

1. Create a new project at https://supabase.com
2. Open the **SQL Editor**.
3. Execute:

```
database/schema.sql
```

4. (Optional but recommended) Populate the database with sample data by executing:

```
database/seed.sql
```

---

## 3. Configure Backend

Navigate to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** directory.

```env
SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
PORT=5000
```

Start the backend:

```bash
npm run dev
```

---

## 4. Configure Frontend

Open a new terminal.

```bash
cd frontend
npm install
npm run dev
```

The application will usually be available at:

```
http://localhost:5173
```

---

# 📱 Application Workflow

```
Add Product
      ↓
Generate Barcode
      ↓
Download Barcode
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

# 🌟 Highlights

- 📦 Inventory Management
- 🛒 Retail POS Billing
- 📷 Mobile Camera Barcode Scanner
- 🏷 Automatic Barcode Generation
- 📥 Stock Receiving
- 👥 Customer Credit Ledger
- 🧾 Invoice Generation
- 📱 Fully Responsive UI
- ☁️ Supabase Cloud Database

---

# 🗄 Database

The project includes:

| File | Purpose |
|------|---------|
| `database/schema.sql` | Creates all required tables and constraints |
| `database/seed.sql` | Inserts sample products, customers, and inventory |
| `database/schema-reference.sql` | Reference export of the original database schema |

---

# 🔒 Environment Variables

For security reasons, the `.env` file is **not included** in this repository.

Create a `.env` file inside the `backend` directory before running the project.

Required variables:

```env
SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
PORT=5000
```

---

# 👨‍💻 Developed By

Developed as part of **TakeOver'26 Hackathon**.

---

# 📄 License

This project is intended for educational and hackathon purposes.
