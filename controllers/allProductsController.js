const Product = require("../Schemas/ProductSchema");

const allProductsController = async (req, res) => {
  try {
    console.log("allproduct");
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
