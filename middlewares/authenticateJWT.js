const JWT = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  try {
    // for localStorage bearer token
    const headersToken = req.headers.Authorization || req.headers.authorization;
    const token = headersToken?.split(" ")[1];

    // for cookies
    /* const token = req.cookies.access_token;
    console.log("✨ 🌟  authenticateJWT  token:", token); */

    JWT.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.log(
          "🚀 ~ file: authenticateJWT.js:19 ~ JWT.verify ~ err:",
          err
        );
        return res.status(403).json("token is not valid");
      }

      req.user = user;
      console.log("✨ 🌟  JWT.verify  User:", user);
      next();
    });
  } catch (error) {
    console.log("✨ 🌟  authenticateJWT  error line23 ❌❌❌", error, "❌❌❌");
  }
};
module.exports = authenticateJWT;
