import express from 'express';
import bodyParser from 'body-parser';
import product_routes from './handlers/products';
const app = express();
const address = "0.0.0.0:3000";
app.use(bodyParser.json());
app.get('/products', (_req, res) => {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/products/:id', (_req, res) => {
    try {
        res.send('this is the SHOW route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.post('/products', (req, res) => {
    const item = {
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
    };
    try {
        res.send('this is the CREATE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.put('/products/:id', (req, res) => {
    const item = {
        id: req.body.id,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
    };
    try {
        res.send('this is the EDIT route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.delete('/products/:id', (_req, res) => {
    try {
        res.send('this is the DELETE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
product_routes(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
