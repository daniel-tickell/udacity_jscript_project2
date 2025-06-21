CREATE TABLE IF NOT EXISTS products
    (id SERIAL PRIMARY KEY,
        name varchar(30) NOT NULL,
        price decimal(10,2) NOT NULL,
        category varchar(30) NOT NULL
    );

CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY,
        username varchar(30) UNIQUE NOT NULL,
        firstName varchar(30) NOT NULL,
        lastName varchar(30) NOT NULL,
        password varchar(100) NOT NULL
    );

CREATE TABLE IF NOT EXISTS orders
    (id SERIAL PRIMARY KEY,
        userid INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status varchar(30) NOT NULL
    );

CREATE TABLE IF NOT EXISTS order_items
    (id SERIAL PRIMARY KEY,
        order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        quantity INT NOT NULL CHECK (quantity > 0),
        price_at_purchase decimal(10,2) NOT NULL,
        product_name_at_purchase varchar(30) NOT NULL,
        product_category_at_purchase varchar(30) NOT NULL
    );

INSERT INTO users (username, firstName, lastName, password) VALUES
('asmith', 'Alice', 'Smith', '$2b$10$sH2OfbWMTIb6gkXEfVKBsOEko49cMM9mHQtU2zChT66SJRPEz/HRi'), -- password123
('bobj', 'Bob', 'Johnson', '$2b$10$OA6tdHkeK4go43PTyjlfxuN6/p5fUs1nJndtTZT/.NCRTLaAuW3Ya'), -- securepass
('chuckBrown', 'Charlie', 'Brown', '$2b$10$/OgHiblti5t.e3zQL3vbZeXSZAz4dUb71cZm7ge0d.BQH1t5RW49K'), -- MySecretPass!23
('wwoman', 'Diana', 'Prince', '$2b$10$OtrojWNu1ztlfM2.Wp6vs.I/08UM.kLgS2PoXC09h1XpDtpBGnXwK'), -- AnotherHash
('evea', 'Eve', 'Adams', '$2b$10$e5zmjM38DEuQCQYi/Kj2Fut/DyPN//Dl4HxDDcS.QsyC/Mn/KDu9S'), -- WebDevRocks
('sirfrank', 'Frank', 'White', '$2b$10$17E84OdcpNmk.IoBeRxN6.Bt2UcvML5cmYJU//BkKYxaSWYTtzyuO'), -- RobotLove
('griller', 'Grace', 'Miller', '$2b$10$UYEGNHgRt7NWdBh.xF6nQ.NfQTJe95dmB9BZDBM1mM9106YABt0Ye'), -- DataSecure
('greenh', 'Heidi', 'Green', '$2b$10$pWfYKR..PQAu4YAPI8cXn.6IB3Hrdcwd0AJ4HYefFqXpdWbXnWKNy'), -- Testing123
('ipetro', 'Ivan', 'Petrov', '$2b$10$x0ZFZe2feExgYA3pDJm1seA/lGY9ylO1.3BAFtgEcP5danf.y/S/6'), -- FinalPass
('chuckswife', 'Judy', 'Taylor', '$2b$10$DVTNwJPABpPolD1TGEyEeOoNbyDDO85150Uz6EnOhdJpecaZnBima'); -- SuperStrong

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


INSERT INTO orders (userid, status) VALUES (1, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 1 AND status = 'open' ORDER BY id DESC LIMIT 1), 1, 1, 199.99, (SELECT name FROM products WHERE id = 1), (SELECT category FROM products WHERE id = 1)),
((SELECT id FROM orders WHERE userid = 1 AND status = 'open' ORDER BY id DESC LIMIT 1), 2, 1, 349.50, (SELECT name FROM products WHERE id = 2), (SELECT category FROM products WHERE id = 2));

INSERT INTO orders (userid, status) VALUES (2, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 2 AND status = 'closed' ORDER BY id DESC LIMIT 1), 3, 2, 249.99, (SELECT name FROM products WHERE id = 3), (SELECT category FROM products WHERE id = 3));

INSERT INTO orders (userid, status) VALUES (3, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 3 AND status = 'open' ORDER BY id DESC LIMIT 1), 4, 1, 299.00, (SELECT name FROM products WHERE id = 4), (SELECT category FROM products WHERE id = 4)),
((SELECT id FROM orders WHERE userid = 3 AND status = 'open' ORDER BY id DESC LIMIT 1), 5, 1, 499.00, (SELECT name FROM products WHERE id = 5), (SELECT category FROM products WHERE id = 5));

INSERT INTO orders (userid, status) VALUES (4, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 4 AND status = 'closed' ORDER BY id DESC LIMIT 1), 6, 1, 599.99, (SELECT name FROM products WHERE id = 6), (SELECT category FROM products WHERE id = 6));

INSERT INTO orders (userid, status) VALUES (5, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 5 AND status = 'closed' ORDER BY id DESC LIMIT 1), 7, 1, 650.75, (SELECT name FROM products WHERE id = 7), (SELECT category FROM products WHERE id = 7)),
((SELECT id FROM orders WHERE userid = 5 AND status = 'closed' ORDER BY id DESC LIMIT 1), 8, 3, 150.00, (SELECT name FROM products WHERE id = 8), (SELECT category FROM products WHERE id = 8));

INSERT INTO orders (userid, status) VALUES (6, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 6 AND status = 'open' ORDER BY id DESC LIMIT 1), 9, 1, 380.00, (SELECT name FROM products WHERE id = 9), (SELECT category FROM products WHERE id = 9));

INSERT INTO orders (userid, status) VALUES (7, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 7 AND status = 'closed' ORDER BY id DESC LIMIT 1), 10, 1, 275.50, (SELECT name FROM products WHERE id = 10), (SELECT category FROM products WHERE id = 10)),
((SELECT id FROM orders WHERE userid = 7 AND status = 'closed' ORDER BY id DESC LIMIT 1), 11, 1, 420.00, (SELECT name FROM products WHERE id = 11), (SELECT category FROM products WHERE id = 11));

INSERT INTO orders (userid, status) VALUES (8, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 8 AND status = 'open' ORDER BY id DESC LIMIT 1), 12, 1, 310.00, (SELECT name FROM products WHERE id = 12), (SELECT category FROM products WHERE id = 12));

INSERT INTO orders (userid, status) VALUES (9, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 9 AND status = 'closed' ORDER BY id DESC LIMIT 1), 13, 1, 390.00, (SELECT name FROM products WHERE id = 13), (SELECT category FROM products WHERE id = 13)),
((SELECT id FROM orders WHERE userid = 9 AND status = 'closed' ORDER BY id DESC LIMIT 1), 14, 1, 180.00, (SELECT name FROM products WHERE id = 14), (SELECT category FROM products WHERE id = 14));

INSERT INTO orders (userid, status) VALUES (10, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 10 AND status = 'open' ORDER BY id DESC LIMIT 1), 15, 1, 220.00, (SELECT name FROM products WHERE id = 15), (SELECT category FROM products WHERE id = 15));

INSERT INTO orders (userid, status) VALUES (1, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 1 AND status = 'closed' ORDER BY id DESC LIMIT 1), 3, 1, 249.99, (SELECT name FROM products WHERE id = 3), (SELECT category FROM products WHERE id = 3)),
((SELECT id FROM orders WHERE userid = 1 AND status = 'closed' ORDER BY id DESC LIMIT 1), 7, 1, 650.75, (SELECT name FROM products WHERE id = 7), (SELECT category FROM products WHERE id = 7));

INSERT INTO orders (userid, status) VALUES (2, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 2 AND status = 'open' ORDER BY id DESC LIMIT 1), 1, 2, 199.99, (SELECT name FROM products WHERE id = 1), (SELECT category FROM products WHERE id = 1));

INSERT INTO orders (userid, status) VALUES (3, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 3 AND status = 'closed' ORDER BY id DESC LIMIT 1), 9, 1, 380.00, (SELECT name FROM products WHERE id = 9), (SELECT category FROM products WHERE id = 9)),
((SELECT id FROM orders WHERE userid = 3 AND status = 'closed' ORDER BY id DESC LIMIT 1), 10, 1, 275.50, (SELECT name FROM products WHERE id = 10), (SELECT category FROM products WHERE id = 10));

INSERT INTO orders (userid, status) VALUES (4, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 4 AND status = 'open' ORDER BY id DESC LIMIT 1), 2, 1, 349.50, (SELECT name FROM products WHERE id = 2), (SELECT category FROM products WHERE id = 2));

INSERT INTO orders (userid, status) VALUES (5, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 5 AND status = 'closed' ORDER BY id DESC LIMIT 1), 13, 1, 390.00, (SELECT name FROM products WHERE id = 13), (SELECT category FROM products WHERE id = 13));

INSERT INTO orders (userid, status) VALUES (6, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 6 AND status = 'closed' ORDER BY id DESC LIMIT 1), 15, 1, 220.00, (SELECT name FROM products WHERE id = 15), (SELECT category FROM products WHERE id = 15)),
((SELECT id FROM orders WHERE userid = 6 AND status = 'closed' ORDER BY id DESC LIMIT 1), 1, 1, 199.99, (SELECT name FROM products WHERE id = 1), (SELECT category FROM products WHERE id = 1));

INSERT INTO orders (userid, status) VALUES (7, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 7 AND status = 'open' ORDER BY id DESC LIMIT 1), 4, 1, 299.00, (SELECT name FROM products WHERE id = 4), (SELECT category FROM products WHERE id = 4));

INSERT INTO orders (userid, status) VALUES (8, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 8 AND status = 'closed' ORDER BY id DESC LIMIT 1), 8, 2, 150.00, (SELECT name FROM products WHERE id = 8), (SELECT category FROM products WHERE id = 8)),
((SELECT id FROM orders WHERE userid = 8 AND status = 'closed' ORDER BY id DESC LIMIT 1), 12, 1, 310.00, (SELECT name FROM products WHERE id = 12), (SELECT category FROM products WHERE id = 12));

INSERT INTO orders (userid, status) VALUES (9, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 9 AND status = 'open' ORDER BY id DESC LIMIT 1), 5, 1, 499.00, (SELECT name FROM products WHERE id = 5), (SELECT category FROM products WHERE id = 5));

INSERT INTO orders (userid, status) VALUES (10, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 10 AND status = 'closed' ORDER BY id DESC LIMIT 1), 6, 1, 599.99, (SELECT name FROM products WHERE id = 6), (SELECT category FROM products WHERE id = 6));

INSERT INTO orders (userid, status) VALUES (1, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 1 AND status = 'open' ORDER BY id DESC LIMIT 1), 1, 3, 199.99, (SELECT name FROM products WHERE id = 1), (SELECT category FROM products WHERE id = 1)),
((SELECT id FROM orders WHERE userid = 1 AND status = 'open' ORDER BY id DESC LIMIT 1), 10, 1, 275.50, (SELECT name FROM products WHERE id = 10), (SELECT category FROM products WHERE id = 10)),
((SELECT id FROM orders WHERE userid = 1 AND status = 'open' ORDER BY id DESC LIMIT 1), 14, 1, 180.00, (SELECT name FROM products WHERE id = 14), (SELECT category FROM products WHERE id = 14));

INSERT INTO orders (userid, status) VALUES (2, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 2 AND status = 'closed' ORDER BY id DESC LIMIT 1), 11, 1, 420.00, (SELECT name FROM products WHERE id = 11), (SELECT category FROM products WHERE id = 11)),
((SELECT id FROM orders WHERE userid = 2 AND status = 'closed' ORDER BY id DESC LIMIT 1), 12, 1, 310.00, (SELECT name FROM products WHERE id = 12), (SELECT category FROM products WHERE id = 12));

INSERT INTO orders (userid, status) VALUES (3, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 3 AND status = 'open' ORDER BY id DESC LIMIT 1), 15, 2, 220.00, (SELECT name FROM products WHERE id = 15), (SELECT category FROM products WHERE id = 15));

INSERT INTO orders (userid, status) VALUES (4, 'closed');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 4 AND status = 'closed' ORDER BY id DESC LIMIT 1), 5, 1, 499.00, (SELECT name FROM products WHERE id = 5), (SELECT category FROM products WHERE id = 5)),
((SELECT id FROM orders WHERE userid = 4 AND status = 'closed' ORDER BY id DESC LIMIT 1), 7, 1, 650.75, (SELECT name FROM products WHERE id = 7), (SELECT category FROM products WHERE id = 7));

INSERT INTO orders (userid, status) VALUES (5, 'open');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, product_name_at_purchase, product_category_at_purchase) VALUES
((SELECT id FROM orders WHERE userid = 5 AND status = 'open' ORDER BY id DESC LIMIT 1), 9, 1, 380.00, (SELECT name FROM products WHERE id = 9), (SELECT category FROM products WHERE id = 9)),
((SELECT id FROM orders WHERE userid = 5 AND status = 'open' ORDER BY id DESC LIMIT 1), 13, 1, 390.00, (SELECT name FROM products WHERE id = 13), (SELECT category FROM products WHERE id = 13));
