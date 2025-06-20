
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

  async showopen(userid: number): Promise<Order | null> {
    console.log("show open route hit (orders)")
    try {
      const sql = `SELECT * FROM orders WHERE userid = $1 AND status = 'open';`
      const conn = await Client.connect()
      const result = await conn.query(sql, [userid])
      conn.release()
      result.rows[0].userid = parseInt(result.rows[0].userid)
      return result.rows[0]
    } catch (err) {
      console.log(err);
        throw new Error(`Could not find open Orders for user ${userid}. Error: ${err}`)

    }
  }

    async showclosed(userid: number): Promise<Order> {
    try {
      console.log("show closed route hit (orders)")
      const sql = `SELECT * FROM orders WHERE userid = $1 AND status = 'closed';`
      const conn = await Client.connect()
      const result = await conn.query(sql, [userid])
      conn.release()
      result.rows[0].userid = parseInt(result.rows[0].userid)
      return result.rows[0]
    } catch (err) {
      console.log(err);
        throw new Error(`Could not find closed Orders for user ${userid}. Error: ${err}`)
    }
  }
}
