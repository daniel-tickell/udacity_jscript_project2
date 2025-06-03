import express, { Request, Response } from 'express'
import { Item, ItemStore} from '../models/products'

const store = new ItemStore()

const index = async (_req: Request, res: Response) => {
	const items = await store.index();
	res.json(items);
}

const product_routes = (app: express.Application) => {
 	app.get('items', index);
}



export default product_routes;