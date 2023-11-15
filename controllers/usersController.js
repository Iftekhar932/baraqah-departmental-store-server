const User = require("../Schemas/UserSchema");

const usersController = async (req, res) => {
  console.log("THIS IS USER 🍎🍎🍎");
  const products = await User.find();
  res.send(products);
};
module.exports = usersController;
