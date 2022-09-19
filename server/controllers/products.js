var Products = require('../models/products.js');

module.exports = {
  getProducts: function (req, res) {
    Products.findAll()
      .then(result => {
        res.status(201).json(result.rows);
      })
      .catch(err => res.status(404).json('bad request'))
  },

  getProductInfo: function (req, res) {
    Products.findByProductID(req.params.product_id)
      .then(result => {
        res.status(201).json(result.rows);
      })
      .catch(err => res.status(404).json(err))
  }
};