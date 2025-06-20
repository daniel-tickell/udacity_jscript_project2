import { OrderStore } from '../models/orders.js';
import jwt from 'jsonwebtoken';
const orders = new OrderStore();
const showOrders = async (req, res) => {
    console.log(`Show Orders ${req.params.userid}`);
    let showOrders;
    try {
        if (req.params.type = 'open') {
            showOrders = await orders.showopen(parseInt(req.params.userid));
        }
        else if (req.params.type = 'closed') {
            showOrders = await orders.showclosed(parseInt(req.params.userid));
        }
        else {
            res.status(400);
        }
        const token = jwt.sign({ Order: showOrders }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/orders/:type/:userid', showOrders);
};
export default orderRoutes;
//# sourceMappingURL=orders.js.map