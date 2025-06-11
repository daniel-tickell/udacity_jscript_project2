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

const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, price, category } = req.body;

    try {
        const existingProduct = await store.show(parseInt(id));
        if (!existingProduct) {
            return res.status(404).json({ error: `Product with ID ${id} not found.` });
        }
        const productToUpdate: Item = {
            id: existingProduct.id, // Keep the original ID
            name: name ?? existingProduct.name,
            price: price ?? existingProduct.price,
            category: category ?? existingProduct.category,
        };
        const updatedProduct = await store.update(productToUpdate);
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ 
            error: `Failed to update product with ID ${id}.`,
            originalError: err instanceof Error ? err.message : String(err)
        });
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
  app.patch('/products/:id', update)
  app.delete('/products/:id', destroy)
}

export default productRoutes

