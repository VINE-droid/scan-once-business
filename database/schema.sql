-- =====================================================
-- ScanOnce Database Schema
-- =====================================================

-- PRODUCTS
CREATE TABLE IF NOT EXISTS products (
    product_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    barcode VARCHAR NOT NULL UNIQUE,

    name VARCHAR NOT NULL,

    category VARCHAR DEFAULT 'General',

    cost_price NUMERIC NOT NULL DEFAULT 0,

    selling_price NUMERIC NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

---------------------------------------------------------

-- INVENTORY

CREATE TABLE IF NOT EXISTS inventory (

    product_id BIGINT PRIMARY KEY,

    current_quantity INTEGER NOT NULL DEFAULT 0,

    low_stock_threshold INTEGER NOT NULL DEFAULT 5,

    last_updated TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT inventory_product_fk
        FOREIGN KEY(product_id)
        REFERENCES products(product_id)
        ON DELETE CASCADE
);

---------------------------------------------------------

-- CUSTOMERS

CREATE TABLE IF NOT EXISTS customers (

    customer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name VARCHAR NOT NULL,

    phone VARCHAR UNIQUE,

    credit_balance NUMERIC NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

---------------------------------------------------------

-- SALES

CREATE TABLE IF NOT EXISTS sales (

    sale_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    customer_id BIGINT,

    total_amount NUMERIC NOT NULL DEFAULT 0,

    payment_mode VARCHAR NOT NULL
        CHECK (payment_mode IN ('CASH','UPI','CREDIT')),

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT sales_customer_fk
        FOREIGN KEY(customer_id)
        REFERENCES customers(customer_id)
);

---------------------------------------------------------

-- SALE ITEMS

CREATE TABLE IF NOT EXISTS sale_items (

    sale_item_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    sale_id BIGINT NOT NULL,

    product_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL
        CHECK(quantity>0),

    unit_price NUMERIC NOT NULL,

    subtotal NUMERIC GENERATED ALWAYS AS (quantity * unit_price) STORED,

    CONSTRAINT sale_items_sale_fk
        FOREIGN KEY(sale_id)
        REFERENCES sales(sale_id)
        ON DELETE CASCADE,

    CONSTRAINT sale_items_product_fk
        FOREIGN KEY(product_id)
        REFERENCES products(product_id)
);

---------------------------------------------------------

-- CUSTOMER LEDGER

CREATE TABLE IF NOT EXISTS customer_ledger (

    ledger_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    customer_id BIGINT NOT NULL,

    sale_id BIGINT,

    transaction_type VARCHAR NOT NULL
        CHECK(transaction_type IN ('CHARGE','PAYMENT')),

    amount NUMERIC NOT NULL
        CHECK(amount>0),

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT ledger_customer_fk
        FOREIGN KEY(customer_id)
        REFERENCES customers(customer_id),

    CONSTRAINT ledger_sale_fk
        FOREIGN KEY(sale_id)
        REFERENCES sales(sale_id)
);

---------------------------------------------------------

-- EVENTS

CREATE TABLE IF NOT EXISTS events (

    event_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    event_type VARCHAR NOT NULL
        CHECK(event_type IN
        (
            'STOCK_IN',
            'SALE',
            'RETURN',
            'ADJUSTMENT',
            'CREDIT_PAYMENT'
        )),

    product_id BIGINT,

    sale_id BIGINT,

    customer_id BIGINT,

    quantity_change INTEGER NOT NULL DEFAULT 0,

    financial_amount NUMERIC NOT NULL DEFAULT 0,

    metadata JSONB,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT events_product_fk
        FOREIGN KEY(product_id)
        REFERENCES products(product_id),

    CONSTRAINT events_sale_fk
        FOREIGN KEY(sale_id)
        REFERENCES sales(sale_id),

    CONSTRAINT events_customer_fk
        FOREIGN KEY(customer_id)
        REFERENCES customers(customer_id)
);