import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productRoutes from './handlers/products.js'
import { Item, ItemStore } from './models/products.js'
import dotenv from 'dotenv'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
productRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
