import { Order, OrderStore } from "../orders.js";
import Client from "../../database.js";
import app from '../../server.js'
import supertest from 'supertest';

const orders = new OrderStore();

describe("Order Test Suite", () => {
  it("should have an open orders method", () => {
    expect(orders.showopen).toBeDefined();
  });
  it("should have an closed orders method", () => {
    expect(orders.showclosed).toBeDefined();
  });

  it("showopen method should return the user 1s open orders", async () => {
    const result = await orders.showopen(1);
    expect(result).toEqual({
      userid: 1,
      username: "asmith",
      firstname: "Alice",
      lastname: "Smith",
      status: "open",
      order_id: 1,
    });
  });
  it("showclosed method should return the user 1s closed orders", async () => {
    const result = await orders.showclosed(1);
    expect(result).toEqual({
      userid: 1,
      username: "asmith",
      firstname: "Alice",
      lastname: "Smith",
      status: "closed",
      order_id: 11,
    });
  });
  it('Open Order Query route should return JWT with open orders for userid 1', async () => {
    const response = await supertest(app).get('/orders/open/1');
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('string');
  });
  it('Closed order query should return closed orders for userid 1', async () => {
    const response = await supertest(app).get('/orders/open/1');
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('string');
  });
});

console.log("Order Tests Complete");
