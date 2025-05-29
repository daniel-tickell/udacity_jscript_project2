import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import product_routes from './handlers/products.ts'

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
    const article: Article = {
      title: req.body.title,
      content: req.body.content
    }
    try {
       res.send('this is the CREATE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})

product_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
