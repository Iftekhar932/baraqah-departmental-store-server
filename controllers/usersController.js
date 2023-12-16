const User = require("../Schemas/UserSchema");

// find all users
const usersController = async (req, res) => {
  try {
    const users = await User.find();
    await res.send(users);
  } catch (error) {
    console.log("usersController line 8  error:", error);
  }
};
module.exports = usersController;
