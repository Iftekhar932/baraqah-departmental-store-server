const Product = require("../Schemas/ProductSchema");

const productsController = async (req, res) => {
  try {
    const products = await Product.find();
    await res.send(products);
  } catch (error) {
    console.log(
      "🚀 ~ file: productsController.js:7 ~ productsController ~ error customRef:line 7:",
      error
    );
  }
};
module.exports = productsController;
