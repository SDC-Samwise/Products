const client = require('../dbpg.js')

module.exports = {
  findStyles: (productID) => {
    const getStylesQuery = `select json_build_object
    (
    'product_id', st.productId,
    'results', (select json_agg(json_build_object(
                  'style_id', st.id,
                    'name', st.name,
                    'original_price', st.original_price,
                    'sale_price', st.sale_price,
                    'default?', st.default_style,
                    'photos', (select json_agg(json_build_object('tumbnail_url', ph.thumbnail_url, 'url', ph.url))
                         FROM photos ph
                         WHERE ph.styleid = st.id
                         GROUP BY ph.styleid
                         ),
                   'skus', (SELECT json_object_agg(
                        sk.id, (SELECT json_build_object('quantity', sk.quantity, 'size', sk.size)))
                           FROM skus sk
                           WHERE sk.styleid = st.id
                           GROUP BY sk.styleid)
                  ))
            WHERE st.productid = ${productID}
            GROUP BY st.productid)
    )
    from styles st
    WHERE st.productId = ${productID}
    GROUP BY st.productId;`;
    return client.query(getStylesQuery)
  }
};