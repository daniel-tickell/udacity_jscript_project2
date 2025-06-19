import { ItemStore } from '../models/products.js';
const store = new ItemStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
};
const create = async (req, res) => {
    const { name, price, category } = req.query;
    try {
        // 1. Validate that the required parameters exist
        if (!name || !price || !category) {
            return res.status(400).send('Missing required query parameters: name, price, and category are required.');
        }
        // 2. Type guard against arrays (a simple way is to check if it's a string)
        if (typeof name !== 'string' || typeof category !== 'string' || typeof price !== 'string') {
            return res.status(400).send('Query parameters must be strings.');
        }
        // 3. Convert price from a string to a number
        const numericPrice = parseFloat(price);
        // 4. Validate the converted number
        if (isNaN(numericPrice)) {
            return res.status(400).send('The price parameter must be a valid number.');
        }
        const product = {
            name: req.query.name,
            price: parseFloat(req.query.price),
            category: req.query.category
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
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