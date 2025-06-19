import { OrderStore } from '../models/orders.js';
const orders = new OrderStore();
const index = async (_req, res) => {
    const order = await orders.index();
    res.json(order);
};
const show = async (req, res) => {
    const order = await orders.show(parseInt(req.params.id));
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
const update = async (req, res) => {
    const id = req.params.id;
    const { productid, qty } = req.body;
    try {
        const existingOrder = await orders.show(parseInt(id));
        if (!existingOrder) {
            return res.status(404).json({ error: `Order with ID ${id} not found.` });
        }
        const orderToUpdate = {
            id: existingOrder.id, // Keep the original ID
            productid: productid ?? existingOrder.productid,
            qty: qty ?? existingOrder.qty,
        };
        const updatedOrder = await orders.update(orderToUpdate);
        res.json(updatedOrder);
    }
    catch (err) {
        res.status(500).json({
            error: `Failed to update order with ID ${id}.`,
            originalError: err instanceof Error ? err.message : String(err)
        });
    }
};
const destroy = async (req, res) => {
    const deleted = await orders.delete(req.body.id);
    res.json(deleted);
};
const orderRoutes = (app) => {
    app.get('/order', index);
    app.get('/order/:id', show);
    app.post('/order', create);
    app.put('/order', add);
    app.patch('/order/:id', update);
    app.delete('/order/:id', destroy);
};
export default orderRoutes;
//# sourceMappingURL=orders.js.map