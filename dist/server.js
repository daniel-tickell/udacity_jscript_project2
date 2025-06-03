"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var products_1 = __importDefault(require("./handlers/products"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.get('/products', function (_req, res) {
    try {
        res.send('this is the INDEX route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.get('/products/:id', function (_req, res) {
    try {
        res.send('this is the SHOW route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
app.post('/products', function (req, res) {
    var item = {
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
app.put('/products/:id', function (req, res) {
    var item = {
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
app["delete"]('/products/:id', function (_req, res) {
    try {
        res.send('this is the DELETE route');
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
(0, products_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
