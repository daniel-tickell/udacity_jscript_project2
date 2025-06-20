import express, { Request, Response } from 'express'
import { Item, ItemStore} from '../models/products.js'
import jwt from 'jsonwebtoken'

const store = new ItemStore()

const index = async (req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
   const product = await store.show(parseInt(req.params.id))
   res.json(product)
}

const create = async (req: Request, res: Response) => {
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
        const product: Item = {
		    name: req.body.name as string,
		    price: parseFloat(req.body.price as string),
		    category: req.body.category as string
        }
        const newProduct = await store.create(product)
        const token = jwt.sign({ item: newProduct }, process.env.TOKEN_SECRET);
        res.json(token);
    } catch(err) {
        res.status(400)
        console.log(err)
        res.json(err)
    }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
}

export default productRoutes

