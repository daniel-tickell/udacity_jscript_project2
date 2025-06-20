TRUNCATE TABLE orders RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;
TRUNCATE TABLE products RESTART IDENTITY CASCADE;

-- 1. Insert 10 Users
INSERT INTO users (firstName, lastName, password) VALUES
('Alice', 'Smith', '$2b$10$a2LPNRgBGjyDtezTiB8xoezMQHSzT47/ujMkGYJwz8d4Y/JbNABSK'),
('Bob', 'Johnson', '$2b$10$Op/SlgFVNLLpIv4eC35OKeMmztXHahrbgiQuy.Z7ZMtU1hqUPhMsC'),
('Charlie', 'Brown', '$2b$10$gUYKgG6zrhUyp6W3fJ.8RO3uyE0OPUCIL6Va3ERTT5/O4Fd4flRwu'),
('Diana', 'Prince', '$2b$10$SOMQcnp6WkefiuNd6B6JHuLmswFxgyHfmH2GEYwLQOleOxiDE3.9a'),
('Eve', 'Adams', '$2b$10$K1YcVwnbXmw5oe51RDpuROPrFfQVsWhdoTsDJLVTxKKLr0yoelkZW'),
('Frank', 'White', '$2b$10$ybfDshwkuznsBzNdRNAr5eaJRZAxWFH/LewA/1d9lv8NwVyRyC.1W'),
('Grace', 'Miller', '$2b$10$a0oGLlidK7wBqMFOWXXg.eiJVnIIos8RkqnxkCrkuHUVRntBK.PTS'),
('Heidi', 'Green', '$2b$10$qpRDczFbhFGYZ2.7M550CehgE1ZDTFWRoX3.2uloW18EBuxh9Y8Im'),
('Ivan', 'Petrov', '$2b$10$aaxnndT0K/y3C4UeJmems.fm57cTVzzzvebkqKvSSlFJYZa7N5XBy'),
('Judy', 'Taylor', '$2b$10$AoMyE2OxSt/Au3b44JGsP.NwmCkx.9tH1eHHakCQO9JBrRq9TwJm2');

-- 2. Insert 15 Products (Home Help Robots)
INSERT INTO products (name, price, category) VALUES
('DustBot 3000', 199.99, 'General Cleaning'),
('DishWash-Pro', 349.50, 'General Cleaning'),
('FloorMop XL', 249.99, 'General Cleaning'),
('Window-Shine 5G', 299.00, 'Outdoors'),
('Garden-Buddy AI', 499.00, 'Outdoors'),
('Laundry-Fold Master', 599.99, 'General Cleaning'),
('Smart Cook Helper', 650.75, 'Cooking'),
('Pet-Butler AutoFeed', 150.00, 'Pet Care'),
('Dog Walker 5000', 380.00, 'Pet Care'),
('Bathroom Clean-Bot', 275.50, 'General Cleaning'),
('Fridge Stocker 2.0', 420.00, 'Cooking'),
('Trash Compactor Bot', 310.00, 'Outdoors'),
('Ironing Ace', 390.00, 'General Cleaning'),
('Book Shelf Tidy', 180.00, 'General Cleaning'),
('Kids Playroom Pickup', 220.00, 'General Cleaning');


-- 3. Insert 25 Orders

-- Order 1 (User 1 - Alice) - Open
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(1, 'open', 1001, '[
    {"product_id": 1, "quantity": 1, "price_at_purchase": 199.99},
    {"product_id": 2, "quantity": 1, "price_at_purchase": 349.50}
]');

-- Order 2 (User 2 - Bob) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(2, 'closed', 1002, '[
    {"product_id": 3, "quantity": 2, "price_at_purchase": 249.99}
]');

-- Order 3 (User 3 - Charlie) - Open
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(3, 'open', 1003, '[
    {"product_id": 4, "quantity": 1, "price_at_purchase": 299.00},
    {"product_id": 5, "quantity": 1, "price_at_purchase": 499.00}
]');

-- Order 4 (User 4 - Diana) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(4, 'closed', 1004, '[
    {"product_id": 6, "quantity": 1, "price_at_purchase": 599.99}
]');

-- Order 5 (User 5 - Eve) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(5, 'closed', 1005, '[
    {"product_id": 7, "quantity": 1, "price_at_purchase": 650.75},
    {"product_id": 8, "quantity": 3, "price_at_purchase": 150.00}
]');

-- Order 6 (User 6 - Frank) - Open
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(6, 'open', 1006, '[
    {"product_id": 9, "quantity": 1, "price_at_purchase": 380.00}
]');

-- Order 7 (User 7 - Grace) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(7, 'closed', 1007, '[
    {"product_id": 10, "quantity": 1, "price_at_purchase": 275.50},
    {"product_id": 11, "quantity": 1, "price_at_purchase": 420.00}
]');

-- Order 8 (User 8 - Heidi) - Open
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(8, 'open', 1008, '[
    {"product_id": 12, "quantity": 1, "price_at_purchase": 310.00}
]');

-- Order 9 (User 9 - Ivan) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(9, 'closed', 1009, '[
    {"product_id": 13, "quantity": 1, "price_at_purchase": 390.00},
    {"product_id": 14, "quantity": 1, "price_at_purchase": 180.00}
]');

-- Order 10 (User 10 - Judy) - Open
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(10, 'open', 1010, '[
    {"product_id": 15, "quantity": 1, "price_at_purchase": 220.00}
]');

-- Remaining 15 Orders (Mix of users, products, and statuses)

-- Order 11 (User 1 - Alice) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(1, 'closed', 1011, '[
    {"product_id": 3, "quantity": 1, "price_at_purchase": 249.99},
    {"product_id": 7, "quantity": 1, "price_at_purchase": 650.75}
]');

-- Order 12 (User 2 - Bob) - Open
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(2, 'open', 1012, '[
    {"product_id": 1, "quantity": 2, "price_at_purchase": 199.99}
]');

-- Order 13 (User 3 - Charlie) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(3, 'closed', 1013, '[
    {"product_id": 9, "quantity": 1, "price_at_purchase": 380.00},
    {"product_id": 10, "quantity": 1, "price_at_purchase": 275.50}
]');

-- Order 14 (User 4 - Diana) - Open
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(4, 'open', 1014, '[
    {"product_id": 2, "quantity": 1, "price_at_purchase": 349.50}
]');

-- Order 15 (User 5 - Eve) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(5, 'closed', 1015, '[
    {"product_id": 13, "quantity": 1, "price_at_purchase": 390.00}
]');

-- Order 16 (User 6 - Frank) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(6, 'closed', 1016, '[
    {"product_id": 15, "quantity": 1, "price_at_purchase": 220.00},
    {"product_id": 1, "quantity": 1, "price_at_purchase": 199.99}
]');

-- Order 17 (User 7 - Grace) - Open
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(7, 'open', 1017, '[
    {"product_id": 4, "quantity": 1, "price_at_purchase": 299.00}
]');

-- Order 18 (User 8 - Heidi) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(8, 'closed', 1018, '[
    {"product_id": 8, "quantity": 2, "price_at_purchase": 150.00},
    {"product_id": 12, "quantity": 1, "price_at_purchase": 310.00}
]');

-- Order 19 (User 9 - Ivan) - Open
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(9, 'open', 1019, '[
    {"product_id": 5, "quantity": 1, "price_at_purchase": 499.00}
]');

-- Order 20 (User 10 - Judy) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(10, 'closed', 1020, '[
    {"product_id": 6, "quantity": 1, "price_at_purchase": 599.99}
]');

-- Order 21 (User 1 - Alice) - Open (Multiple items, including repeat product)
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(1, 'open', 1021, '[
    {"product_id": 1, "quantity": 3, "price_at_purchase": 199.99},
    {"product_id": 10, "quantity": 1, "price_at_purchase": 275.50},
    {"product_id": 14, "quantity": 1, "price_at_purchase": 180.00}
]');

-- Order 22 (User 2 - Bob) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(2, 'closed', 1022, '[
    {"product_id": 11, "quantity": 1, "price_at_purchase": 420.00},
    {"product_id": 12, "quantity": 1, "price_at_purchase": 310.00}
]');

-- Order 23 (User 3 - Charlie) - Open
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(3, 'open', 1023, '[
    {"product_id": 15, "quantity": 2, "price_at_purchase": 220.00}
]');

-- Order 24 (User 4 - Diana) - closed
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(4, 'closed', 1024, '[
    {"product_id": 5, "quantity": 1, "price_at_purchase": 499.00},
    {"product_id": 7, "quantity": 1, "price_at_purchase": 650.75}
]');

-- Order 25 (User 5 - Eve) - Open
INSERT INTO orders (user_id, status, orderid, order_line_items) VALUES
(5, 'open', 1025, '[
    {"product_id": 9, "quantity": 1, "price_at_purchase": 380.00},
    {"product_id": 13, "quantity": 1, "price_at_purchase": 390.00}
]');