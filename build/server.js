import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './handlers/products.js';
const app = express();
const address = "0.0.0.0:3000";
app.use(bodyParser.json());
productRoutes(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
//# sourceMappingURL=server.js.map