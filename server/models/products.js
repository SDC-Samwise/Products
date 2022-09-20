const client = require('../dbpg.js')

module.exports = {
  findAll: () => {
    const getProductsQuery = `
    Select * from public.products
    ORDER BY id ASC LIMIT 100
    `;
    return client.query(getProductsQuery)
  },

  findByProductID: (productID) => {
    const getProductInfoQuery = `select pd.*, json_agg(json_build_object('feature', ft.id, 'value', ft.value)) AS features
    from products pd
    left join features ft on ft.product_id=pd.id where pd.id = ${productID}
    group by pd.id`;
    return client.query(getProductInfoQuery)
  }
};