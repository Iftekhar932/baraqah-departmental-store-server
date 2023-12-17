const User = require("../Schemas/UserSchema");

/* PASSWORD RESET */
const forgotPasswordController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // looking for user data and checking if the provided password matches the old one(that user thinks he forgot)
    const foundUser = await User.findOne({ email: email });
    if (foundUser.password === password) {
      return res.status(409).json("Password matched"); // conflict
    }

    // replacing old password with the new password
    foundUser.password = password;
    await foundUser.save();

    res.status(200).json({ msg: "Password changed" });
  } catch (error) {
    console.log(
      "🚀 ~ file: forgotPasswordController.js:6 ~ forgotPasswordController ~ error:",
      error
    );
  }
};
module.exports = forgotPasswordController;
