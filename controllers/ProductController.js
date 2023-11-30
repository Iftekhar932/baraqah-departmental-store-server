const Product = require("../Schemas/ProductSchema");

const productController = async (req, res) => {
  try {
    console.log("productController");
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
