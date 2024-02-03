import express from "express";

import {__dirname} from "./utils.js"
import routerProduct from './routes/product.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use("/api", routerProduct);

app.listen(5500, function(){console.log(`Server listening on port ${5500}`)});