import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './handlers/products.js';
import userRoutes from './handlers/users.js';
import orderRoutes from './handlers/orders.js';
//import { Item, ItemStore } from './models/products.js'
import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
else {
    console.log(result);
}
const app = express();
const address = "0.0.0.0:3000";
app.use(bodyParser.json());
productRoutes(app);
userRoutes(app);
orderRoutes(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
//# sourceMappingURL=server.js.map