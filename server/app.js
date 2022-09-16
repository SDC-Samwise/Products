const express = require('express');
const client = require('./dbpg.js');
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/products', (req, res) => {

  let getQuery = `Select * from public.products
  ORDER BY id ASC LIMIT 100`

  client.query(getQuery, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
  });

  client.end;
});

app.get('/products/:product_id', (req, res) => {

  let getQuery = `select pd.*, json_agg(json_build_object('feature', ft.id, 'value', ft.value)) AS features
  from products pd
  left join features ft on ft.product_id=pd.id where pd.id = ${req.params.product_id}
  group by pd.id`

  //joins product table with features table

  client.query(getQuery, (err, result)=>{
      if(!err){
          res.send(result.rows);
      } else {
        console.log(err.message);
        res.send(err.message)
      }
  });
  client.end;

});

app.get('/products/:product_id/styles', (req, res) => {

console.log('product styles', req.params.product_id)

let getQuery = `select json_agg(related_product_id) AS related from related
WHERE current_product_id = ${req.params.product_id}
GROUP BY current_product_id;`

  client.query(getQuery, (err, result)=>{
    if(!err){
      res.send(result.rows[0].related);
    } else {
      console.log(err.message);
      res.send(err.message)
    }
  });

  client.end;

});

app.get('/products/:product_id/related', (req, res) => {

  // let getQuery = `Select * from public.products
  // ORDER BY id ASC LIMIT 100`

  // client.query(getQuery, (err, result)=>{
  //   if(!err){
  //       res.send(result.rows);
  //   }
  // });

  // client.end;
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

client.connect();