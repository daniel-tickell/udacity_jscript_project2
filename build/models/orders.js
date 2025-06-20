import Client from '../database.js';
export class OrderStore {
    async showopen(userid) {
        try {
            const sql = `SELECT * FROM orders WHERE userid = $1 AND status = 'open';`;
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
            console.log(userid);
            const sql = `SELECT * FROM orders WHERE userid = $1 AND status = 'closed';`;
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