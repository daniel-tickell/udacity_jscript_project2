
import Client from '../database.js'

export type Order = {
	id?: number;
  orderid?: number; 
	userid?: number;    
  status?: string;
  productid?: number;
  qty?: number;
  price?: number;
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders;'
      const result = await conn.query(sql)
      conn.release()
      console.log("index route hit (Order)")
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get Order. Error: ${err}`)
    }
  }

  async show(id: number): Promise<Order> {
    try {
    const sql = 'SELECT * FROM orders WHERE orderid = $1'
    const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    conn.release()
    console.log("product id query route hit (Orders)")
    result.rows[0].id = parseInt(result.rows[0].id)
    result.rows[0].productid = parseInt(result.rows[0].productid)
    result.rows[0].qty = parseInt(result.rows[0].qty)
    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find Order ${id}. Error: ${err}`)
    }
  }

  async create(b: Order): Promise<Order> {
      try {
    const line_item_string = {"product_id": b.productid, "quantity": b.qty, "price_at_purchase": b.price};
    const sql = `INSERT INTO orders (orderid, userid, status, order_line_items) VALUES($1, $2, $3, $4) RETURNING *`;
    const conn = await Client.connect()
    const result = await conn
        .query(sql, [b.orderid, b.userid, b.status, line_item_string])
    const order = result.rows[0]
    console.log("create route hit (orders)")
    conn.release()
    if (!order) {
      throw new Error("Order creation failed, no item returned from database.");
    }
    order.userid = parseFloat(order.userid);
    order.id = parseInt(order.id);
    return order
      } catch (err) {
          throw new Error(`Could not add new Order. Error: ${err}`)
      }
    }

   async add(b: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (orderid, productid, qty) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()
      const result = await conn
          .query(sql, [b.orderid, b.productid, b.qty])
      const order = result.rows[0]
      console.log("add to order route hit (orders)")
      conn.release()
      if (!order) {
        throw new Error("Product add to order failed, no item returned from database.");
      }
      order.orderid = parseInt(order.orderid);
      order.productid = parseInt(order.productid);
      order.qty = parseInt(order.qty);
      return order;
      } 
      catch (err) {
        throw new Error(`Could not add new item Order ${b.orderid}. Error: ${err}`)
      }
    }
    async update(b: Order): Promise<Order> {
      try {
        const sql = 'update orders SET qty = $3 WHERE id = $1 AND productid = $2 RETURNING *;'
        const conn = await Client.connect()
        const result = await conn
            .query(sql, [b.orderid, b.productid, b.qty])
        const order = result.rows[0]
        console.log("update route hit (orders)")
        conn.release()
        if (!order) {
          throw new Error(`Order update failed, no item returned from database.`);
        }
        order.qty = parseFloat(order.qty);
        order.productid = parseInt(order.productid);
        return order
      } catch (err) {
          throw new Error(`Could not update order ${b.id}. Error: ${err}`)
      }
  }
   async delete(id: number): Promise<Order> { 
      try {
    const sql = 'DELETE FROM orders WHERE id=($1)'
    const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    const order = result.rows[0]
    console.log("delete route hit (orders)")
    conn.release()
    return order
      } catch (err) {
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  }

}