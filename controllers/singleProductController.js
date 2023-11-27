const Product = require("../Schemas/ProductSchema");

const singleProductController = async (req, res) => {
  try {
    const products = await Product.find({ _id: req.params.productId });
    await res.send(products);
  } catch (error) {
    console.log(
      "🚀 ~ file: singleProductController.js:11 ~ singleProductController ~ error:",
      error
    );
  }
};
module.exports = singleProductController;
