import { Order,OrderStore } from '../orders.js';
import Client from '../../database.js';

const orders = new OrderStore();

describe("Order Test Suite", () => {

  it('should have an open orders method', () => {
    expect(orders.showopen).toBeDefined();
  });
  it('should have an closed orders method', () => {
    expect(orders.showclosed).toBeDefined();
  });

  it('showopen method should return the user 1s open orders', async () => {
  const result = await orders.showopen(1);
  expect(result).toEqual({
      id: 1,        
      userid: 1,
      status: 'open',
      orderid: 1001,
      order_line_items: jasmine.arrayContaining([
          jasmine.objectContaining(
            {
                quantity: '1',
                product_id: '1',
                product_name: 'DustBot 3000',
                product_category: 'General Cleaning',
                price_at_purchase: '199.99'
                
            }),
          jasmine.objectContaining(
            {
                quantity: '1',
                product_id: '2',
                product_name: 'DishWash-Pro',
                product_category: 'General Cleaning',
                price_at_purchase: '349.50'
            }
          )
      ])
    });
  });
  it('showclosed method should return the user 1s closed orders', async () => {
  const result = await orders.showclosed(1);
  expect(result).toEqual({
      id: 11,        
      userid: 1,
      status: 'closed',
      orderid: 1011,
      order_line_items: jasmine.arrayContaining([
          jasmine.objectContaining(
            {
                quantity: '1',
                product_id: '3',
                product_name: 'FloorMop XL',
                product_category: 'General Cleaning',
                price_at_purchase: '249.99'
                
            }),
          jasmine.objectContaining(
            {
                quantity: '1',
                product_id: '7',
                product_name: 'Smart Cook Helper',
                product_category: 'Cooking',
                price_at_purchase: '650.75'
            }
          )
      ])
    });
  });
});
console.log('Order Tests Complete');