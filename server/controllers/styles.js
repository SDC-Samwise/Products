var Styles = require('../models/styles.js');

module.exports = {
  getStyles: function (req, res) {
    Styles.findStyles(req.params.product_id)
      .then(result => {
        res.status(201).json(result.rows[0].json_build_object);
      })
      .catch(err => res.status(404).json('bad request'))
  }
};