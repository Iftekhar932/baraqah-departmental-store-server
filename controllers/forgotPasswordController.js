const User = require("../Schemas/UserSchema");

/* PASSWORD RESET */
const forgotPasswordController = async (req, res) => {
  const { email, password } = req.body;
  console.log(
    "🚀 ~ file: forgotPasswordController.js:6 ~ forgotPasswordController ~  email, password:",
    email,
    password
  );
  try {
    // looking for user data and checking if the provided password matches the old one(that user thinks he forgot)
    const foundUser = await User.findOne({ email: email });
    console.log(
      "🚀 ~ file: forgotPasswordController.js:10 ~ forgotPasswordController ~ foundUser:",
      foundUser
    );
    if (foundUser.password === password) {
      return res.status(409).json("Matched with your forgotten password"); // conflict
    }

    // replacing old password with the new password
    foundUser.password = password;
    await foundUser.save();

    res.status(200).json({ msg: "Password changed, login now!" });
  } catch (error) {
    console.log(
      "🚀 ~ file: forgotPasswordController.js:6 ~ forgotPasswordController ~ error:",
      error
    );
  }
};
module.exports = forgotPasswordController;
