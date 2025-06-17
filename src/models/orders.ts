
import Client from '../database.js'

export type Order = {
	orderid?: number; 
	userid?: number;    
  status?: string;
  productid?: number;
  qty?: number;
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders INNER JOIN order_items ON orders.id = order_items.orderid;'
      const result = await conn.query(sql)
      conn.release()
      console.log("index route hit (Order)")
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get Order. Error: ${err}`)
    }
  }

  async show(orderid: number): Promise<Order> {
    try {
    const sql = 'SELECT * FROM orders INNER JOIN order_items ON orders.id = order_items.orderid  WHERE orders.id = $1'
    const conn = await Client.connect()
    const result = await conn.query(sql, [orderid])
    conn.release()
    console.log("product id query route hit (Orders)")
    result.rows[0].orderid = parseFloat(result.rows[0].orderid)
    result.rows[0].productid = parseFloat(result.rows[0].productid)
    result.rows[0].orderid = parseFloat(result.rows[0].orderid)
    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find Order ${orderid}. Error: ${err}`)
    }
  }

  async create(b: Order): Promise<Order> {
      try {
    const sql = 'INSERT INTO orders (userid, status) VALUES($1, $2) RETURNING *'
    const conn = await Client.connect()
    const result = await conn
        .query(sql, [b.userid, b.status])
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
      const sql = 'INSERT INTO order_items (id, productid, qty) VALUES($1, $2, $3) RETURNING *'
      const conn = await Client.connect()
      const result = await conn
          .query(sql, [b.orderid, b.productid, b.qty])
      const order = result.rows[0]
      console.log("add to order route hit (orders)")
      conn.release()
      if (!order) {
        throw new Error("Product add to order failed, no item returned from database.");
      }
      order.id = parseInt(order.orderid);
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
        const sql = 'update order_items SET qty = $3 WHERE orderid = $1 AND productid = $2 RETURNING order_items.*;'
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
          throw new Error(`Could not update order ${b.orderid}. Error: ${err}`)
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