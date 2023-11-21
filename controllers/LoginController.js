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
    const accessToken = JWT.sign(
      { email: email, role: "user" },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("access_token", accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).send(accessToken);
  } catch (error) {
    console.log("✨ 🌟  LoginController  error: customRef:line22", error);
  }
};

module.exports = LoginController;
