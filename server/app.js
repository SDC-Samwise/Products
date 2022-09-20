const express = require('express');
const client = require('./dbpg.js');
const app = express();
const port = 3000;
const morgan = require('morgan');
const bodyParser = require("body-parser");
var productCtrl = require('./controllers/products')
var relatedCtrl = require('./controllers/related')
var stylesCtrl = require('./controllers/styles')

app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/products', productCtrl.getProducts);

app.get('/products/:product_id', productCtrl.getProductInfo);

app.get('/products/:product_id/related', relatedCtrl.getRelated);

app.get('/products/:product_id/styles', stylesCtrl.getStyles);

app.listen(port, () => {
  return console.log(`Express is listening at http://44.203.91.104:${port}`);
});

client.connect();