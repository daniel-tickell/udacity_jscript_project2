import { Order, OrderStore } from "../orders.js";
import Client from "../../database.js";

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
});
console.log("Order Tests Complete");
