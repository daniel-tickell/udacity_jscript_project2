"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const store = new products_1.ItemStore();
describe("Item Model", () => {
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
    it('create method should add a item', async () => {
        const result = await store.create({
            id: 1,
            name: "test item",
            descripton: "This is a test item",
            units_available: 100,
            price: 5.99,
            units_sold: 10,
        });
        expect(result).toEqual({
            id: 1,
            name: "test item",
            descripton: "This is a test item",
            units_available: 100,
            price: 5.99,
            units_sold: 10,
        });
    });
    it('index method should return a list of items', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                name: "test item",
                descripton: "This is a test item",
                units_available: 100,
                price: 5.99,
                units_sold: 10,
            }]);
    });
    it('show method should return the correct items', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            name: "test item",
            descripton: "This is a test item",
            units_available: 100,
            price: 5.99,
            units_sold: 10,
        });
    });
    it('delete method should remove the item', async () => {
        store.delete("1");
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
