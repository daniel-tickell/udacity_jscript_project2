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

  - 127.0.0.1:3000/users/1 (replace 1 with the userid you want to query)

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

#### Orders (Tests Done)

- Current Order by user (args: user id)[token required]

  - 127.0.0.1:3000/orders/open/1

- [OPTIONAL] Completed Orders by user (args: user id)[token required]
  - 127.0.0.1:3000/orders/closed/1

## Database Schema

<table>
  <thead>
    <tr>
      <th>Table Name</th>
      <th>Column Name</th>
      <th>Data Type</th>
      <th>Constraints/Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">products</td>
      <td>id</td>
      <td>SERIAL</td>
      <td>PRIMARY KEY</td>
    </tr>
    <tr>
      <td>name</td>
      <td>varchar(30)</td>
      <td>NOT NULL</td>
    </tr>
    <tr>
      <td>price</td>
      <td>decimal(10,2)</td>
      <td>NOT NULL</td>
    </tr>
    <tr>
      <td>category</td>
      <td>varchar(30)</td>
      <td>NOT NULL</td>
    </tr>
  <tr>
      <td rowspan="4">products</td>
      <td>id</td>
      <td>SERIAL</td>
      <td>PRIMARY KEY</td>
    </tr>
    <tr>
       <td>name</td>
      <td>varchar(30)</td>
      <td>NOT NULL</td>
    </tr>
    <tr>
      <td>price</td>
      <td>decimal(10,2)</td>
      <td>NOT NULL</td>
    </tr>
    <tr>
      <td>category</td>
      <td>varchar(30)</td>
      <td>NOT NULL</td>
    </tr>
    <tr>
      <td rowspan="3">orders</td>
      <td>id</td>
      <td>SERIAL</td>
      <td>PRIMARY KEY</td>
    </tr>
    <tr>
      <td>userid</td>
      <td>INT</td>
      <td>NOT NULL, FOREIGN KEY (users.id) ON DELETE CASCADE</td>
    </tr>
    <tr>
      <td>status</td>
      <td>varchar(30)</td>
      <td>NOT NULL</td>
    </tr>
    <tr>
      <td rowspan="7">order_items</td>
      <td>id</td>
      <td>SERIAL</td>
      <td>PRIMARY KEY</td>
    </tr>
    <tr>
      <td>order_id</td>
      <td>INT</td>
      <td>NOT NULL, FOREIGN KEY (orders.id) ON DELETE CASCADE</td>
    </tr>
    <tr>
      <td>product_id</td>
      <td>INT</td>
      <td>NOT NULL, FOREIGN KEY (products.id) ON DELETE CASCADE</td>
    </tr>
    <tr>
      <td>quantity</td>
      <td>INT</td>
      <td>NOT NULL, CHECK (quantity > 0)</td>
    </tr>
    <tr>
      <td>price_at_purchase</td>
      <td>decimal(10,2)</td>
      <td>NOT NULL</td>
    </tr>
    <tr>
      <td>product_name_at_purchase</td>
      <td>varchar(30)</td>
      <td>NOT NULL</td>
    </tr>
    <tr>
      <td>product_category_at_purchase</td>
      <td>varchar(30)</td>
      <td>NOT NULL</td>
    </tr>
  </tbody>
</table>
