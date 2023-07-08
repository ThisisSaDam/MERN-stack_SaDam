require ('../utils/MongooseUtil');
const Models = require ('./Models');
  const ProductDAO = {
    async selectAll () {
    const query = {};
    const products = await Models.Product.find(query).exec();
    return products;
  }
};
module.exports = ProductDAO;