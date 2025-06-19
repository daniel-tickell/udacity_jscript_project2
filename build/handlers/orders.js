import { OrderStore } from '../models/orders.js';
const orders = new OrderStore();
const index = async (req, res) => {
    const order = await orders.index(parseInt(req.params.orderid));
    res.json(order);
};
const showopen = async (req, res) => {
    const order = await orders.showopen(parseInt(req.params.userid));
    res.json(order);
};
const showclosed = async (req, res) => {
    const order = await orders.showclosed(parseInt(req.params.userid));
    res.json(order);
};
const create = async (req, res) => {
    const { userid, orderid, status, productid, qty, price } = req.params;
    try {
        if (!userid || !status || !orderid || !productid || !qty || !price) {
            return res.status(400).send('Missing required query parameters: name, price, and category are required.');
        }
        if (typeof userid !== 'number' || typeof status !== 'string' || typeof orderid !== 'string' || typeof productid !== 'string' || typeof qty !== 'string' || typeof price !== 'string') {
            return res.status(400).send('Query parameters must be strings.');
        }
        const numericUserid = parseInt(req.params.userid, 10);
        const numericOrderId = parseInt(req.params.orderid, 10);
        const numericProductId = parseInt(req.params.productid, 10);
        const numericQty = parseInt(req.params.qty, 10);
        const numericPrice = parseFloat(req.params.price);
        const order = {
            orderid: numericOrderId,
            status: req.params.status,
            userid: numericUserid,
            productid: numericProductId,
            qty: numericQty,
            price: numericPrice
        };
        const newOrder = await orders.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const add = async (req, res) => {
    const { orderid, userid, productid, qty, price } = req.params;
    try {
        const numericUserid = parseInt(req.params.userid, 10);
        const numericOrderId = parseInt(req.params.orderid, 10);
        const numericProductId = parseInt(req.params.productid, 10);
        const numericQty = parseInt(req.params.qty, 10);
        const numericPrice = parseFloat(req.params.price);
        if (!userid || !orderid || !productid || !qty || !price) {
            return res.status(400).send('Missing required query parameters: name, price, and category are required.');
        }
        if (typeof userid !== 'number' || typeof orderid !== 'string' || typeof productid !== 'string' || typeof qty !== 'string' || typeof price !== 'string') {
            return res.status(400).send('Query parameters must be strings.');
        }
        const order = {
            orderid: numericOrderId,
            userid: numericUserid,
            productid: numericProductId,
            qty: numericQty,
            price: numericPrice
        };
        const addToOrder = await orders.add(order);
        res.json(addToOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/order/:id', index);
    app.get('/order/:userid', showopen);
    app.get('/order/:userid', showclosed);
    app.post('/order', create);
    app.put('/order', add);
};
export default orderRoutes;
//# sourceMappingURL=orders.js.map