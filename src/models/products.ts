
// @ts-ignore
import Client from '../database'

export type Item = {
	id: string; 
	name: string;
	descripton: string;
	units_available: string;
	price: string;
	units_sold: string;
}


export class itemStore {
  async index(): Promise<Book[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Item> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(b: Item): Promise<Item> {
      try {
    const sql = 'INSERT INTO products (name, descripton, units_available, price, unites_sold) VALUES($1, $2, $3, $4, 0) RETURNING *'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn
        .query(sql, [b.name, b.descripton, b.units_available, b.price])

    const item = result.rows[0]

    conn.release()

    return item
      } catch (err) {
          throw new Error(`Could not add new product ${title}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Item> {
      try {
    const sql = 'DELETE FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    const item = result.rows[0]

    conn.release()

    return item
      } catch (err) {
          throw new Error(`Could not delete product ${id}. Error: ${err}`)