import express, { Request, Response } from 'express'
import { Item, ItemStore} from '../models/products.js'

const store = new ItemStore()

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
   const product = await store.show(parseInt(req.params.id))
   res.json(product)
}

const create = async (req: Request, res: Response) => {
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
        const product: Item = {
		    name: req.query.name as string,
		    price: parseFloat(req.query.price as string),
		    category: req.query.category as string
        }
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
}

export default productRoutes

