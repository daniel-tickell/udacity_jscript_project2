import { ItemStore } from '../products.js';
import Client from '../../database.js';
const store = new ItemStore();
let createdProduct;
let createdProductId;
describe("Product test suite: ", () => {
    beforeAll(async () => {
        console.log('--- CLEANING PRODUCT DATABASE TABLES ---');
        const conn = await Client.connect();
        const sql = 'TRUNCATE products RESTART IDENTITY CASCADE;';
        await conn.query(sql);
        conn.release();
        console.log('--- CREATING TEST PRODUCTS ---');
        createdProduct = await store.create({
            name: 'Item to Test',
            price: 99.99,
            category: 'This is a test item'
        });
        if (createdProduct && createdProduct.id) {
            createdProductId = createdProduct.id;
        }
        else {
            fail('User creation did not return a valid ID.');
            return;
        }
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });
    it('created product should exist', async () => {
        expect(createdProduct).toEqual({
            id: createdProductId,
            name: "Item to Test",
            price: 99.99,
            category: "This is a test item",
        });
    });
    it('index method should return a list of items', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('show method should return the correct items', async () => {
        const result = await store.show(createdProductId);
        expect(result).toEqual({
            id: createdProductId,
            name: "Item to Test",
            price: 99.99,
            category: "This is a test item",
        });
    });
});
//# sourceMappingURL=products_spec.js.map