-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.products (
  product_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  barcode character varying NOT NULL UNIQUE,
  name character varying NOT NULL,
  category character varying DEFAULT 'General'::character varying,
  cost_price numeric NOT NULL DEFAULT 0.00,
  selling_price numeric NOT NULL DEFAULT 0.00,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (product_id)
);
CREATE TABLE public.inventory (
  product_id bigint NOT NULL,
  current_quantity integer NOT NULL DEFAULT 0,
  low_stock_threshold integer NOT NULL DEFAULT 5,
  last_updated timestamp with time zone DEFAULT now(),
  CONSTRAINT inventory_pkey PRIMARY KEY (product_id),
  CONSTRAINT inventory_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id)
);
CREATE TABLE public.customers (
  customer_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name character varying NOT NULL,
  phone character varying UNIQUE,
  credit_balance numeric NOT NULL DEFAULT 0.00,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT customers_pkey PRIMARY KEY (customer_id)
);
CREATE TABLE public.sales (
  sale_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  customer_id bigint,
  total_amount numeric NOT NULL DEFAULT 0.00,
  payment_mode character varying NOT NULL CHECK (payment_mode::text = ANY (ARRAY['CASH'::character varying, 'CREDIT'::character varying, 'UPI'::character varying]::text[])),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT sales_pkey PRIMARY KEY (sale_id),
  CONSTRAINT sales_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id)
);
CREATE TABLE public.sale_items (
  sale_item_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  sale_id bigint NOT NULL,
  product_id bigint NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric NOT NULL,
  subtotal numeric DEFAULT ((quantity)::numeric * unit_price),
  CONSTRAINT sale_items_pkey PRIMARY KEY (sale_item_id),
  CONSTRAINT sale_items_sale_id_fkey FOREIGN KEY (sale_id) REFERENCES public.sales(sale_id),
  CONSTRAINT sale_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id)
);
CREATE TABLE public.customer_ledger (
  ledger_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  customer_id bigint NOT NULL,
  sale_id bigint,
  transaction_type character varying NOT NULL CHECK (transaction_type::text = ANY (ARRAY['CHARGE'::character varying, 'PAYMENT'::character varying]::text[])),
  amount numeric NOT NULL CHECK (amount > 0::numeric),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT customer_ledger_pkey PRIMARY KEY (ledger_id),
  CONSTRAINT customer_ledger_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id),
  CONSTRAINT customer_ledger_sale_id_fkey FOREIGN KEY (sale_id) REFERENCES public.sales(sale_id)
);
CREATE TABLE public.events (
  event_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  event_type character varying NOT NULL CHECK (event_type::text = ANY (ARRAY['STOCK_IN'::character varying, 'SALE'::character varying, 'RETURN'::character varying, 'ADJUSTMENT'::character varying, 'CREDIT_PAYMENT'::character varying]::text[])),
  product_id bigint,
  sale_id bigint,
  customer_id bigint,
  quantity_change integer NOT NULL DEFAULT 0,
  financial_amount numeric NOT NULL DEFAULT 0.00,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (event_id),
  CONSTRAINT events_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(product_id),
  CONSTRAINT events_sale_id_fkey FOREIGN KEY (sale_id) REFERENCES public.sales(sale_id),
  CONSTRAINT events_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id)
);