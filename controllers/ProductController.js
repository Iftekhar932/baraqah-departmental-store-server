// const Product = require("../Schemas/ProductSchema");

const productController = async (req, res) => {
  try {
    res.send(req.params.category);
  } catch (error) {
    console.log(
      "🚀 ~ file: productController.js:7 ~ productController ~ error customRef:line 7:",
      error
    );
  }
};
module.exports = productController;
