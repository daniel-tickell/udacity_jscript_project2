
import Client from '../database.js'

export type User = {
	id?: number; 
	firstname: string; 
  lastname: string;    
	password: string;
}


export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()
      console.log("index route hit (users)")
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
    const sql = 'SELECT * FROM users WHERE id=($1)'
    const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    conn.release()
    console.log("product id query route hit (users)")
    result.rows[0].id = parseInt(result.rows[0].id)
    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(b: User): Promise<User> {
      try {
    const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
    const conn = await Client.connect()
    const result = await conn
        .query(sql, [b.firstname, b.lastname, b.password])
    const user = result.rows[0]
    console.log("create route hit (users)")
    conn.release()
    if (!user) {
      throw new Error("User creation failed, no user returned from database.");
    }
    user.id = parseInt(user.id);
    return user
      } catch (err) {
          throw new Error(`Could not add new user ${b.firstname}. Error: ${err}`)
      }
    }

  async update(b: User): Promise<User> {
      try {
    const sql = 'update users SET password = $2 WHERE id = $1 RETURNING users.*;'
    const conn = await Client.connect()
    const result = await conn
        .query(sql, [b.id, b.password])
    const user = result.rows[0]
    console.log("update route hit (users)")
    conn.release()
    if (!user) {
      throw new Error(`User Password update failed, no user returned from database.`);
    }
    user.id = parseInt(user.id);
    return user
      } catch (err) {
          throw new Error(`Could not update user ${b.id}. Error: ${err}`)
      }
  }

  async delete(id: number): Promise<User> { 
      try {
    const sql = 'DELETE FROM users WHERE id=($1)'
    const conn = await Client.connect()
    const result = await conn.query(sql, [id])
    const user = result.rows[0]
    console.log("delete route hit (users)")
    conn.release()
    return user
      } catch (err) {
          throw new Error(`Could not delete users ${id}. Error: ${err}`)
      }
  }
}