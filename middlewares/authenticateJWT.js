const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// schema
const User = require("../Schemas/UserSchema");

const authenticateJWT = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const dbPWD = await User.find({ password });
    if (!dbPWD) return res.status(403);

    const pwdMatch = bcrypt.compare(password, dbPWD);
    if (!pwdMatch) return res.status(403);

    JWT.verify(process.env.SECRET_KEY, (err, user) => {
      console.log("✨ 🌟  JWT.verify  user:", user);
      if (err) res.status(403).json("token is not valid");
      req.user = user;
      next();
    });
  } catch (error) {
    console.log("✨ 🌟  authenticateJWT  error CUSTOMCODE:line23  :", error);
  }
};
module.exports = authenticateJWT;
