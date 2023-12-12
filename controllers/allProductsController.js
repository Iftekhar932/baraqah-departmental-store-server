const Product = require("../Schemas/ProductSchema");

/* GET ALL PRODUCTS */
const allProductsController = async (req, res) => {
  try {
    const products = await Product.find();
    await res.send(products);
  } catch (error) {
    console.log(
      "🚀 ~ file: allProductsController.js:7 ~ allProductsController ~ error customRef:line 7:",
      error
    );
  }
};
module.exports = allProductsController;
