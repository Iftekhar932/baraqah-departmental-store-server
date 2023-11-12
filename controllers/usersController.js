const User = require("../Schemas/UserSchema");

const usersController = async (req, res) => {
  const products = await User.find();
  res.send(products);
};
module.exports = usersController;
