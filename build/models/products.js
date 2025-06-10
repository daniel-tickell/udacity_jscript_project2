import Client from '../database.js';
export class ItemStore {
    async index() {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            console.log("index route hit (models)");
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            console.log("product id query route hit (models)");
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(b) {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const conn = await Client.connect();
            console.log(b);
            const result = await conn
                .query(sql, [b.name, b.price, b.category]);
            const item = result.rows[0];
            console.log("create route hit (models)");
            conn.release();
            return item;
        }
        catch (err) {
            throw new Error(`Could not add new product ${b.name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            const item = result.rows[0];
            console.log("delete route hit (models)");
            conn.release();
            return item;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
//# sourceMappingURL=products.js.map