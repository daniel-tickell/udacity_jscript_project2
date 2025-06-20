import { Item, ItemStore } from '../products.js';
import Client from '../../database.js'

const store = new ItemStore();

describe("Product Test Suite", () => {

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have an show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('showopen method should return the user 1s open products', async () => {
  const result = await store.index();
  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThanOrEqual(15);
  });

  it('show method should return product id 1s details', async () => {
  const result = await store.show(1);
  expect(result).toEqual(
    {
      id: 1,
      name: 'DustBot 3000',
      price: 199.99,
      category: 'General Cleaning'
    });
  });

  it('show method should return product id 1s details', async () => {
  const result = await store.create({
    name: 'Jasmine testBot',
    price: 123.45,
    category: 'Javascript Tests'
  });
  expect(result).toEqual(
    {
      id: jasmine.any(Number),
      name: 'Jasmine testBot',
      price: 123.45,
      category: 'Javascript Tests'
    });
  });
});
console.log('Product Tests Complete');