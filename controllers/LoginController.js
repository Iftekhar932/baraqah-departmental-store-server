const User = require("../Schemas/UserSchema.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const LoginController = async (req, res) => {
  const { email, password } = req.body;

  // matching password with database password
  const userInfo = await User.find({ email: email });
  if (userInfo.length <= 0)
    return res.status(401).send({ msg: "Credentials doesn't match" });
  const match = await bcrypt.compare(password, userInfo[0].password);

  if (!match) {
    return res.status(401).send({ msg: "Invalid Password" });
  }

  const providedJWT = JWT.sign({ email: email }, process.env.SECRET_KEY);

  res.status(200).json({ providedJWT });
};

module.exports = LoginController;
