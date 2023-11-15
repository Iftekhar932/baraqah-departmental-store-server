const User = require("../Schemas/UserSchema.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const LoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInfo = await User.find({ email: email }); // getting user from db for password
    if (userInfo.length <= 0)
      return res.status(401).send({ msg: "Credentials doesn't match" });

    // matching password with database password
    const match = await bcrypt.compare(password, userInfo[0].password);
    if (!match) {
      return res.status(401).send({ msg: "Invalid Password" });
    }

    // jwt sign
    const providedJWT = JWT.sign({ email: email }, process.env.SECRET_KEY, {
      expiresIn: "1m",
    });

    res.status(200).json({ providedJWT });
  } catch (error) {
    console.log("✨ 🌟  LoginController  error: customRef:line22", error);
  }
};

module.exports = LoginController;
