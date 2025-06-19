
import Client from '../database.js'

export type Order = {
	id?: number;
  orderid?: number; 
	userid?: number;    
  status?: string;
  productid?: number;
  qty?: number;
  price?: number;
  order_line_items?: object;  
}

export class OrderStore {
  async index(orderid: number): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders where id = $1;'
      const result = await conn.query(sql, [orderid])
      conn.release()
      console.log("index route hit (Order)")
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not get Order ${orderid}. Error: ${err}`)
    }
  }

  async showopen(userid: number): Promise<Order> {
    try {
    const sql = `SELECT * FROM orders WHERE userid = $1 AND status = 'open';`
    const conn = await Client.connect()
    const result = await conn.query(sql, [userid])
    conn.release()
    console.log("Open order query route hit (Orders)")
    result.rows[0].userid = parseInt(result.rows[0].userid)
    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find open Orders for user ${userid}. Error: ${err}`)
    }
  }

    async showclosed(userid: number): Promise<Order> {
    try {
    const sql = `SELECT * FROM orders WHERE userid = $1 AND status = 'closed';`
    const conn = await Client.connect()
    const result = await conn.query(sql, [userid])
    conn.release()
    console.log("Closed order query route hit (Orders)")
    result.rows[0].userid = parseInt(result.rows[0].userid)
    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find closed Orders for user ${userid}. Error: ${err}`)
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
}