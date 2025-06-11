CREATE TABLE IF NOT EXISTS products 
	(id SERIAL PRIMARY KEY, 
		name varchar(30), 
		price decimal(10,2), 
		category varchar(30)
	);
CREATE TABLE IF NOT EXISTS users
	(id SERIAL PRIMARY KEY, 
		firstName varchar(30), 
		lastName varchar(30), 
		password varchar(30)
	);
CREATE TABLE IF NOT EXISTS orders
	(id SERIAL PRIMARY KEY, 
		user_id INT REFERENCES users(id),
		status varchar(30)
	);
CREATE TABLE IF NOT EXISTS order_items (
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT,
  PRIMARY KEY (order_id, product_id)
);