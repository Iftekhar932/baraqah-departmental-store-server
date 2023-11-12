const Product = require("../Schemas/ProductSchema");

const productsController = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};
module.exports = productsController;
