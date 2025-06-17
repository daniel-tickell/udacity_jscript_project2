import express, { Request, Response } from 'express'
import { Order, OrderStore} from '../models/orders.js'

const orders = new OrderStore()


const index = async (_req: Request, res: Response) => {
  const order = await orders.index()
  res.json(order)
}

const show = async (req: Request, res: Response) => {
   const order = await orders.show(parseInt(req.params.orderid))
   res.json(order)
}

const create = async (req: Request, res: Response) => {
	const { userid, status } = req.query;
    try {

	    if (!userid || !status) {
	        return res.status(400).send('Missing required query parameters: name, price, and category are required.');
	    }

	    if (typeof userid !== 'number' || typeof status !== 'string') {
	        return res.status(400).send('Query parameters must be strings.');
	    }
	    const numericUserid = parseInt(userid, 10);
	    if (isNaN(numericUserid)) {
	        return res.status(400).send('The price parameter must be a valid number.');
	    }
        const order: Order = {
		    userid: numericUserid,
		    status: req.query.status as string
        }
        const newOrder = await orders.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const add = async (req: Request, res: Response) => {
	const { orderid, productid, qty } = req.query;
    try {

	    if (!orderid || !productid || !qty) {
	        return res.status(400).send('Missing required query parameters: oderid, productid, and qty are required.');
	    }

	    if (typeof orderid !== 'number' || typeof productid !== 'number' || typeof qty !== 'number' ) {
	        return res.status(400).send('Query parameters must be numbers.');
	    }
	    const numericOrderid = parseInt(orderid);
	    if (isNaN(numericOrderid)) {
	        return res.status(400).send('The orderid parameter must be a valid number.');
	    }
	    const numericProductId = parseInt(productid);
	    if (isNaN(numericProductId)) {
	        return res.status(400).send('The productid parameter must be a valid number.');
	    }
	    const numericQty = parseInt(qty);
	    if (isNaN(numericQty)) {
	        return res.status(400).send('The qty parameter must be a valid number.');
	    }
      const order: Order = {
		    orderid: numericOrderid,
		    productid: numericProductId,
		    qty: numericQty
        }
      const addToOrder = await orders.add(order)
        res.json(addToOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const update = async (req: Request, res: Response) => {
    const orderid = req.params.orderid;
    const { productid, qty } = req.body;

    try {	
        const existingOrder = await orders.show(parseInt(orderid));
        if (!existingOrder) {
            return res.status(404).json({ error: `Order with ID ${orderid} not found.` });
        }
        const orderToUpdate: Order = {
            orderid: existingOrder.orderid, // Keep the original ID
            productid: productid ?? existingOrder.productid,
            qty: qty ?? existingOrder.qty,
        };
        const updatedOrder = await orders.update(orderToUpdate);
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ 
            error: `Failed to update order with ID ${orderid}.`,
            originalError: err instanceof Error ? err.message : String(err)
        });
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await orders.delete(req.body.orderid)
    res.json(deleted)
}


const orderRoutes = (app: express.Application) => {
  app.get('/order', index)
  app.get('/order/:id', show)
  app.post('/order', create)
  app.put('/order', add)
  app.patch('/order/:id', update)
  app.delete('/order/:id', destroy)
}

export default orderRoutes

