import { ItemStore } from '../models/products.js';
import jwt from 'jsonwebtoken';
const store = new ItemStore();
const index = async (req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
};
const create = async (req, res) => {
    const { name, price, category } = req.body;
    try {
        if (!name || !price || !category) {
            return res.status(400).send('Missing required query parameters: name, price, and category are required.');
        }
        if (typeof name !== 'string' || typeof category !== 'string' || typeof price !== 'string') {
            return res.status(400).send('Query parameters must be strings.');
        }
        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) {
            return res.status(400).send('The price parameter must be a valid number.');
        }
        const product = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            category: req.body.category
        };
        const newProduct = await store.create(product);
        const token = jwt.sign({ item: newProduct }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        console.log(err);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
};
export default productRoutes;
//# sourceMappingURL=products.js.map