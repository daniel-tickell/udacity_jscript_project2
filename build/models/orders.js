import Client from '../database.js';
export class OrderStore {
    async index() {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            console.log("index route hit (Order)");
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get Order. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            console.log("product id query route hit (Orders)");
            result.rows[0].price = parseFloat(result.rows[0].price);
            result.rows[0].id = parseFloat(result.rows[0].id);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find Order ${id}. Error: ${err}`);
        }
    }
    async create(b) {
        try {
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const conn = await Client.connect();
            const result = await conn
                .query(sql, [b.name, b.price, b.category]);
            const order = result.rows[0];
            console.log("create route hit (orders)");
            conn.release();
            if (!item) {
                throw new Error("Order creation failed, no item returned from database.");
            }
            order.price = parseFloat(order.price);
            order.id = parseInt(order.id);
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new Order ${b.name}. Error: ${err}`);
        }
    }
    async update(b) {
        try {
            const sql = 'update orders SET price = $2 WHERE id = $1 RETURNING orders.*;';
            const conn = await Client.connect();
            const result = await conn
                .query(sql, [b.id, b.price]);
            const order = result.rows[0];
            console.log("update route hit (orders)");
            conn.release();
            if (!order) {
                throw new Error(`Product update failed, no item returned from database.`);
            }
            order.price = parseFloat(order.price);
            order.id = parseInt(order.id);
            return item;
        }
        catch (err) {
            throw new Error(`Could not update Order ${b.id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            console.log("delete route hit (orders)");
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
//# sourceMappingURL=orders.js.map