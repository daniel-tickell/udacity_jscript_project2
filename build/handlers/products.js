import { ItemStore } from '../models/products';
const store = new ItemStore();
const index = async (_req, res) => {
    const items = await store.index();
    res.json(items);
};
const product_routes = (app) => {
    app.get('items', index);
};
export default product_routes;
