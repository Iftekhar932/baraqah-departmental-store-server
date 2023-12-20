const User = require("../Schemas/UserSchema.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const LoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userInfo = await User.findOne({ email: email }); // getting user from db for password
    /* if (userInfo.length <= 0)
      return res.status(401).send({ msg: "Credentials doesn't match" }); */
    if (!userInfo)
      return res.status(401).send({ msg: "Credentials doesn't match" });

    // matching password with database password
    const match = await bcrypt.compare(password, userInfo?.password);
    if (!match) {
      return res.status(401).send({ msg: "Invalid Password" });
    }

    // jwt sign access token
    const accessToken = JWT.sign(
      { email: email, role: userInfo.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "15s",
      }
    );

    // jwt sign refresh token
    const refreshToken = JWT.sign(
      { email: email },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );

    // update the refreshToken that user has on storage
    userInfo.refreshToken = refreshToken;
    await userInfo.save();

    res.status(200).send({ accessToken, email, role: userInfo.role });
  } catch (error) {
    console.log("✨ 🌟  LoginController  error: customRef:line22", error);
  }
};

module.exports = LoginController;
