var Related = require('../models/related.js');

module.exports = {
  getRelated: function (req, res) {
    Related.findRelated(req.params.product_id)
      .then(result => {
        res.status(201).json(result.rows[0].related);
      })
      .catch(err => res.status(404).json('bad request'))
  }
};