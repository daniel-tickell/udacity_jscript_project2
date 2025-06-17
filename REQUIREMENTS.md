	 +


 # API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)


#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]


## Data Base Schema

Table Name products 
	id (Implicit) 
	name (String) 
	price (Number)
	category (String)
	
Table Name users
	id (Implicit) 
	firstName (String) 
	lastName (String)
	password (Salted Hash)

Table Name orders
	id (Implicit) 
	user_id (Number REFERENCES users(id))
	status (String)

Table order_items (
  order_id (number REFERENCES orders(id))
  product_id (number REFERENCES products(id))
  quantity (Number)
  PRIMARY KEY (order_id, product_id)
);

{
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "user": "item_store",
    "password": "password123",
    "database": "item_store"
  }
}