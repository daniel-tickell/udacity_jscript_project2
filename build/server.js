"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./handlers/products"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
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
        descripton: req.body.descripton,
        units_available: req.body.units_available,
        price: req.body.price,
        units_sold: req.body.units_sold
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
        descripton: req.body.descripton,
        units_available: req.body.units_available,
        price: req.body.price,
        units_sold: req.body.units_sold
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
(0, products_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
