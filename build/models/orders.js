import Client from "../database.js";
export class OrderStore {
    async showopen(userid) {
        console.log("show open route hit (orders)");
        try {
            const sql = ` SELECT
          o.id AS order_id,
          u.id as userid,
          u.username,
          u.firstName,
          u.lastName,
          o.status
        FROM orders o
        JOIN users u ON o.userid = u.id
        WHERE o.status = 'open' AND u.id = $1;`;
            const conn = await Client.connect();
            const result = await conn.query(sql, [userid]);
            conn.release();
            result.rows[0].userid = parseInt(result.rows[0].userid);
            return result.rows[0];
        }
        catch (err) {
            console.log(err);
            throw new Error(`Could not find open Orders for user ${userid}. Error: ${err}`);
        }
    }
    async showclosed(userid) {
        try {
            console.log("show closed route hit (orders)");
            const sql = ` SELECT
          o.id AS order_id,
          u.id as userid,
          u.username,
          u.firstName,
          u.lastName,
          o.status
        FROM orders o
        JOIN users u ON o.userid = u.id
        WHERE o.status = 'closed' AND u.id = $1;`;
            const conn = await Client.connect();
            const result = await conn.query(sql, [userid]);
            conn.release();
            result.rows[0].userid = parseInt(result.rows[0].userid);
            return result.rows[0];
        }
        catch (err) {
            console.log(err);
            throw new Error(`Could not find closed Orders for user ${userid}. Error: ${err}`);
        }
    }
}
//# sourceMappingURL=orders.js.map