/* Replace with your SQL commands */
CREATE TABLE products 
	(id SERIAL PRIMARY KEY, 
		name varchar(30), 
		descripton varchar(50), 
		units_available int, 
		price decimal, 
		units_sold int);