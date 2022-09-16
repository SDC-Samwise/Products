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

app.get('/products/:product_id/related', (req, res) => {

console.log('product related', req.params.product_id)

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

app.get('/products/:product_id/styles', (req, res) => {

  console.log('product styles', req.params.product_id)

  let getQuery = `select pd.*, json_agg(json_build_object('feature', ft.id, 'value', ft.value)) AS features
  from products pd
  left join features ft on ft.product_id=pd.id where pd.id = ${req.params.product_id}
  group by pd.id`

  client.query(getQuery, (err, result)=>{
    if(!err){
      res.send(result.rows);
    } else {
      console.log(err.message);
      res.send(err.message)
    }
  });

  client.end;

  `select json_build_object ('product_id', st.productId,
  'results', ( select json_agg(json_build_object('style_id', st.id, 'name', st.name, 'original_price', st.original_price, 'sale_price', st.sale_price, 'default?', st.default_style))
        WHERE st.productid = 1
        GROUP BY st.productid),
  'photos', (select json_agg(json_build_object('tumbnail_url', ph.thumbnail_url, 'url', ph.url))
         FROM photos ph
         WHERE ph.styleid = 1
         GROUP BY ph.styleid
        )
  )
from styles st
WHERE st.productId = 1
GROUP BY st.productId;`

//select results within results
`select json_build_object ('product_id', st.productId,
'results', ( select json_agg(json_build_object('style_id', st.id, 'name', st.name, 'original_price', st.original_price, 'sale_price', st.sale_price, 'default?', st.default_style,
                        'photos', (select json_agg(json_build_object('tumbnail_url', ph.thumbnail_url, 'url', ph.url))
                             FROM photos ph
                             WHERE ph.styleid = st.id
                             GROUP BY ph.styleid
                            ),
                       'skus', (select json_agg(json_build_object('quantity', sk.quantity, 'size', sk.size))
                             FROM skus sk
                             WHERE sk.styleid = st.id
                             GROUP BY sk.styleid
                            )
                      ))
      WHERE st.productid = 1
      GROUP BY st.productid)
)
from styles st
WHERE st.productId = 1
GROUP BY st.productId;`

});

app.post('/cart', (req, res) => {
  console.log('product styles', req.body)

    res.send(req.body);

})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

client.connect();