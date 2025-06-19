import { Order,OrderStore } from '../orders.js';
import { User, UserStore } from '../users.js';
import { Item, ItemStore } from '../products.js';
import Client from '../../database.js'

const order = new OrderStore();
const user = new UserStore();
const item = new ItemStore();

let testOrder: Order;
let testOrdeAdd: Order;
let testItem: Item;
let testUser: User;
let testUserId: number;
let testOrderId: number;
let testItemId: number;

describe("Order Test Suite", () => {

  beforeAll(async () => {
    console.log('--- CLEANING ORDER DATABASE TABLES ---');
    const conn = await Client.connect();
    const sql = 'TRUNCATE orders RESTART IDENTITY CASCADE;';
    await conn.query(sql);
    conn.release();
   console.log('--- CREATING TEST USER ---');
    testUser = await user.create({
        firstname: 'TestFirstname',
        lastname: 'TestLastname',
        password: 'testUserPassword'
    });
    if (testUser && testUser.id) {
      testUserId = testUser.id;
    } else {
      fail(`User creation did not return a valid ID. ${testUser}`);
      return; 
    }  
    console.log('--- CREATING TEST Product ---');
    testItem = await item.create({
      name: 'Order test product',
      price: 66.66,
      category: 'Test Items'
    });
    if (testItem && testItem.id) {
      testItemId = testItem.id;
    } else {
      fail('Item creation did not return a valid ID.');
      return; 
    }
    console.log('--- CREATING TEST ORDER ---');
    try {
    testOrder = await order.create({
        orderid: 1,
        userid: testUserId,
        status: 'open',
        productid: testItemId,
        qty: 10, 
        price: testItem.price
    });
    if (testOrder && testOrder.id) {
      testOrderId = testOrder.id;
    } else {
      fail('Order creation did not return a valid ID.');
      return; 
    }
  } catch(err) {
        console.log(err)
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

  it('Test objects should exist', async () => {
  expect(testOrder).toBeDefined();
  expect(testUser).toBeDefined();
  expect(testItem).toBeDefined();
  });


  it('index method should return a list of orders', async () => {
    const result = await order.index();
    expect(result.length).toBeGreaterThan(0);
  });


  it('show method should return the correct orders', async () => {
    console.log(testOrderId);
    const result = await order.show(testOrderId);
    expect(result).toEqual({
      id: 1,
      orderid: testOrderId,
      userid: testUserId,
      productid: NaN,
      qty: NaN,
      status: "open", 
      order_line_items: Object({ quantity: 10, product_id: testItemId, price_at_purchase: testItem.price })

    });
  });
});


