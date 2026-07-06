-------------------------------------------------------
-- PRODUCTS
-------------------------------------------------------

INSERT INTO products
(barcode,name,category,cost_price,selling_price)

VALUES

('8901001','Coca Cola 500ml','Beverages',28,40),

('8901002','Pepsi 500ml','Beverages',27,40),

('8901003','Sprite 500ml','Beverages',27,40),

('8901004','Maggi Noodles','Snacks',12,18),

('8901005','Lays Classic','Snacks',15,20),

('8901006','Dairy Milk','Snacks',35,50),

('8901007','Amul Milk','Dairy',28,35),

('8901008','Good Day Biscuits','Bakery',22,30),

('8901009','Sunflower Oil','Grocery',110,135),

('8901010','Sugar 1kg','Grocery',42,50),

('8901011','Rice 5kg','Grocery',245,285),

('8901012','Surf Excel','Household',185,220),

('8901013','Colgate Toothpaste','Personal Care',45,60),

('8901014','Notebook A4','Stationery',32,45),

('8901015','USB Cable','Electronics',80,120);

-------------------------------------------------------
-- INVENTORY
-------------------------------------------------------

INSERT INTO inventory
(product_id,current_quantity,low_stock_threshold)

SELECT
product_id,
20,
5
FROM products;

-------------------------------------------------------
-- CUSTOMERS
-------------------------------------------------------

INSERT INTO customers
(name,phone)

VALUES

('John Doe','9876543210'),

('Jane Smith','9876543211'),

('Rahul Kumar','9876543212'),

('Priya Sharma','9876543213'),

('Amit Patel','9876543214');