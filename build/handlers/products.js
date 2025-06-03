"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const store = new products_1.ItemStore();
const index = async (_req, res) => {
    const items = await store.index();
    res.json(items);
};
const product_routes = (app) => {
    app.get('items', index);
};
exports.default = product_routes;
