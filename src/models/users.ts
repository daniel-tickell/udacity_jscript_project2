import Client from "../database.js";
import bcrypt from "bcrypt";

const pepper = process.env.BCRYPT_PASSWORD || ""; // Provide a default value
const saltRounds = process.env.SALT_ROUNDS || "10"; // Provide a default value

export type User = {
  id?: number;
  username?: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async authenticate(
    username: string,
    password: string,
  ): Promise<string | null> {
    console.log("Authenticate Route hit (users)");
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE username = $1";
      const result = await conn.query(sql, [username]);
      conn.release();
      if (result.rows.length) {
        const isValidPassword = bcrypt.compareSync(
          password + pepper,
          result.rows[0].password,
        );
        if (isValidPassword) {
          return username;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Could not authenticate user. Error: ${err}`);
    }
  }

  async index(): Promise<User[]> {
    console.log("index route hit (users)");
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    console.log("show route hit (users)");
    try {
      const sql = "SELECT * FROM users WHERE id=$1";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      result.rows[0].id = parseInt(result.rows[0].id);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(b: User): Promise<User> {
    console.log("create route hit (users)");
    try {
      const sql =
        "INSERT INTO users (username, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *";
      const conn = await Client.connect();
      const hash = bcrypt.hashSync(b.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [
        b.username,
        b.firstname,
        b.lastname,
        hash,
      ]);
      const user = result.rows[0];
      conn.release();
      if (!user) {
        throw new Error(
          "User creation failed, no user returned from database.",
        );
      }
      user.id = parseInt(user.id);
      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${b.firstname}. Error: ${err}`);
    }
  }
}
