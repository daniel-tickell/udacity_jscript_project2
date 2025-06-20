	 +


 # TODO List
 
 # API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
	- GET 127.0.0.1:3000/products
- Show
	- GET 127.0.0.1:3000/products/1 (replace 1 with the userid you want to query)
- Create [token required]
	- POST 127.0.0.1:3000/products
	- JSON Body with the following 
	```
	{
    "name": "Gold Robot",
    "price": "10000",
    "category": "home robots"
  }
  ```
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)


#### Users
- Index [token required]
	- 127.0.0.1:3000/users

- Show [token required] 
	- 127.0.0.1:3000/users/1  (replace 1 with the userid you want to query)

- Create N[token required]
	- POST 127.0.0.1:3000/users
	- JSON Body with the following
		```
		{
	    "firstname": "Davey",
	    "lastname": "Jones",
	    "password": "RobotsRock"
	  }
	  ```

#### Orders
- Current Order by user (args: user id)[token required]
	- 127.0.0.1:3000/orders/open/1

- [OPTIONAL] Completed Orders by user (args: user id)[token required]
	- 127.0.0.1:3000/orders/closed/1

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
	userid (Number REFERENCES users(id))
	status (String)
	orderid (Number)
	order_line_items (JSONB)


