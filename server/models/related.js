const client = require('../dbpg.js')

module.exports = {
  findRelated: (productID) => {
    const getRelatedQuery = `select json_agg(related_product_id) AS related from related
    WHERE current_product_id = ${productID}
    GROUP BY current_product_id;`;
    return client.query(getRelatedQuery)
  }
};