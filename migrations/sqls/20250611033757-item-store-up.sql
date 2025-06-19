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
		password varchar(100)
	);

CREATE TABLE IF NOT EXISTS orders
	(id SERIAL PRIMARY KEY, 
		userid INT REFERENCES users(id),
		status varchar(30),
		orderid INT, 
		order_line_items JSONB
	);