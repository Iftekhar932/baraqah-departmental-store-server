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
      { email: email, role: userInfo[0].role },
      process.env.SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = JWT.sign(
      { email: email },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlmdGVraGFyMUBnbWFpbC5jb20iLCJpYXQiOjE3MDE3ODc3MDYsImV4cCI6MTcwMTg3NDEwNn0.Zy4DMCTqGb9yor2BDQaGagBS3GSeGBqGhuPAdVwM0aw
    // Save the refresh token to the user document
    userInfo.refreshToken = refreshToken;
    await userInfo.save();

    // ! NEEDS TESTING
    // ! NEEDS TESTING
    // ! NEEDS TESTING
    // ! NEEDS TESTING
    // ! NEEDS TESTING
    res.status(200).send({ accessToken, email, role: userInfo[0].role });
  } catch (error) {
    console.log("✨ 🌟  LoginController  error: customRef:line22", error);
  }
};

module.exports = LoginController;
