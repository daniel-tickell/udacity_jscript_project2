
import Client from '../database.js'

export type Item = {
	id?: number; 
	name: string;    
  price: number;
	category: string;
}


export class ItemStore {
  async index(): Promise<Item[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      console.log("index route hit (products)")
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: number): Promise<Item> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    conn.release()
    console.log("show route hit (products)")
    result.rows[0].price = parseFloat(result.rows[0].price)
    result.rows[0].id = parseFloat(result.rows[0].id)
    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(b: Item): Promise<Item> {
      try {
    const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
    const conn = await Client.connect()
    const result = await conn
        .query(sql, [b.name, b.price, b.category])
    const item = result.rows[0]
    console.log("create route hit (products)")
    conn.release()
    if (!item) {
      throw new Error("Product creation failed, no item returned from database.");
    }
    item.price = parseFloat(item.price);
    item.id = parseInt(item.id);
    return item
      } catch (err) {
          throw new Error(`Could not add new product ${b.name}. Error: ${err}`)
      }
    }
}
