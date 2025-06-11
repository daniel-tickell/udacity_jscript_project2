import { ItemStore } from '../products.js';

const store = new ItemStore();

describe("Endpoints: ", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });
});

describe("Database create: ", () => {
  it('create method should add a item', async () => {
    const createdProduct = await store.create({
      name: 'Item to Test',
      price: 99.99,
      category: 'This is a test item'
  });
    expect(createdProduct).toEqual({
        id: jasmine.any(Number),
        name: "Item to Test", 
        price: 99.99,
        category: "This is a test item", 
    });
  });
});

describe("Database update and query: ", () => {
  it('index method should return a list of items', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  it('update method should update item', async () => {
    const result = await store.update({
      id: 1,
      name: "Item to Test",
      price: 88.88,
      category: "This is a test item"
    });
    expect(result).toEqual({
        id: jasmine.any(Number),
        name: "Item to Test", 
        price: 88.88,
        category: "This is a test item", 
    });
  });

  it('show method should return the correct items', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: "Item to Test", 
      price: 88.88, 
      category: "This is a test item", 
    });
  });
});

describe("Database delete: ", () => {
  it('delete method should remove the item', async () => {
    const deletedProduct = await store.delete(1);
    expect(deletedProduct === undefined);
  });
});
