const Product = require("../Schemas/ProductSchema");
/* GET PRODUCTS CATEGORY WISE */
const productController = async (req, res) => {
  try {
    const products = await Product.find();
    categoryProducts = products.filter(
      (p) => p.category.toLowerCase() === req.params.category.toLowerCase()
    );
    await res.send(categoryProducts);
  } catch (error) {
    console.log(
      "🚀 ~ file: productController.js:7 ~ productController ~ error customRef:line 7:",
      error
    );
  }
};
module.exports = productController;
