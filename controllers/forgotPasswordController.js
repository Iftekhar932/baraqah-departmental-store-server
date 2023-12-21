const User = require("../Schemas/UserSchema");
const bcrypt = require("bcrypt");

/* PASSWORD RESET */
const forgotPasswordController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // looking for user data and checking if the provided password matches the old one(that user thinks he forgot)
    const foundUser = await User.findOne({ email: email });
    const matched = await bcrypt.compare(password, foundUser.password);
    if (matched) {
      return res
        .status(409)
        .json({ msg: "Matched with your forgotten password" }); // conflict
    }

    // encrypting new password and replacing it with the new one
    const hashedPassword = await bcrypt.hash(password, 10);
    foundUser.password = hashedPassword;
    await foundUser.save();

    res
      .status(200)
      .json({
        msg: "Password changed, login now!",
        srvFile: "forgotPasswordController.js",
      });
  } catch (error) {
    console.log(
      "🚀 ~ file: forgotPasswordController.js:6 ~ forgotPasswordController ~ error:",
      error
    );
  }
};
module.exports = forgotPasswordController;
