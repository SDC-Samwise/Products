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

  let getQuery = `Select * from public.products
  where id=${req.params.product_id}`

  let getQuery2 = `Select * from public.products
  where id=${req.params.product_id}`

  // let getQuery2 = `SELECT public.reviews, json_agg(json_build_object('id', id, 'url', url)) AS agg
  // FROM public.reviews_photos JOIN (
  // SELECT code FROM project
  // ) AS p ON p.code=activity.pcode
  // GROUP BY pid;`;

  client.query(getQuery, (err, result)=>{
      if(!err){
          res.send(result.rows);
      }
  });
  client.end;

});

app.get('/products/:product_id/styles', (req, res) => {

  let getQuery = `Select * from public.products
  ORDER BY id ASC LIMIT 100`

  client.query(getQuery, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
  });

  client.end;
});

app.get('/products/:product_id/related', (req, res) => {

  let getQuery = `Select * from public.products
  ORDER BY id ASC LIMIT 100`

  client.query(getQuery, (err, result)=>{
    if(!err){
        res.send(result.rows);
    }
  });

  client.end;
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

client.connect();