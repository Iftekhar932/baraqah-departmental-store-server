const User = require("../Schemas/UserSchema");

const usersController = async (req, res) => {
  try {
    const users = await User.find();
    await res.send(users);
  } catch (error) {
    console.log("✨ 🌟  usersController  error:", error);
  }
};
module.exports = usersController;
