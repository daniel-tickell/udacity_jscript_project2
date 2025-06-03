import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import product_routes from './handlers/products'
import { Item, ItemStore } from './models/products'
import dotenv from 'dotenv'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/products', (_req: Request, res: Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.get('/products/:id', (_req: Request, res: Response) => {
    try {
       res.send('this is the SHOW route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})

app.post('/products', (req: Request, res: Response) => {
    const item: Item = {
      id: req.body.id as number,    
      name: req.body.name,
      descripton: req.body.descripton,
      units_available: req.body.units_available, 
      price: req.body.price,
      units_sold: req.body.units_sold
    }
    try {
       res.send('this is the CREATE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})

app.put('/products/:id', (req: Request, res: Response) => {
    const item: Item = {
      id: req.body.id as number,    
      name: req.body.name,
      descripton: req.body.descripton,
      units_available: req.body.units_available, 
      price: req.body.price,
      units_sold: req.body.units_sold
    }
    try {
       res.send('this is the EDIT route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})

app.delete('/products/:id', (_req: Request, res: Response) => {
    try {
       res.send('this is the DELETE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})

product_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
