import { OrderStore } from '../orders.js';
import { UserStore } from '../users.js';
import { ItemStore } from '../products.js';
import Client from '../../database.js';
const order = new OrderStore();
const user = new UserStore();
const item = new ItemStore();
describe("Order Test Suite", () => {
    let testOrder;
    let testOrderId;
    let testItem;
    let testUser;
    let testUserId;
    let testAddToOrder;
    beforeAll(async () => {
        console.log('--- CLEANING DATABASE TABLES ---');
        const conn = await Client.connect();
        const sql = 'TRUNCATE orders, order_items RESTART IDENTITY CASCADE;';
        await conn.query(sql);
        conn.release();
        testUser = await user.create({
            firstname: 'TestFirstname',
            lastname: 'TestLastname',
            password: 'testUserPassword'
        });
        if (testUser && testUser.id) {
            testUserId = testUser.id;
        }
        else {
            fail(`User creation did not return a valid ID. ${testUser}`);
            return;
        }
        testOrder = await order.create({
            userid: testUserId,
            status: 'open',
        });
        if (testOrder && testOrder.orderid) {
            testOrderId = testOrder.orderid;
        }
        else {
            fail('User creation did not return a valid ID.');
            return;
        }
    });
    it('should have an index method', () => {
        expect(order.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    });
    it('create method should add a user & a order', async () => {
        expect(testOrder).toEqual({
            orderid: testOrderId,
            userid: testUserId,
            status: "open",
        });
    });
    it('index method should return a list of orders', async () => {
        const result = await order.index();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    it('show method should return the correct orders', async () => {
        console.log(testOrderId);
        const result = await order.show(testOrderId);
        expect(result).toEqual({
            orderid: testOrderId,
            userid: testUserId,
            status: "open",
        });
    });
});
//# sourceMappingURL=order_spec.js.map