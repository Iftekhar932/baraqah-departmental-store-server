const JWT = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  try {
    /* const headersToken = req.headers.Authorization || req.headers.authorization;
    const token = headersToken?.split(" ")[1];
    console.log(
      "🚀 ~ file: authenticateJWT.js:7 ~ authenticateJWT ~ token:",
      token
    ); */
    const token = req.cookies.access_token;
    console.log(
      "🚀 ~ file: authenticateJWT.js:12 ~ authenticateJWT ~ token:",
      token
    );

    JWT.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json("token is not valid");
      req.user = user;
      next();
    });
  } catch (error) {
    console.log("✨ 🌟  authenticateJWT  error line23 ❌❌❌", error, "❌❌❌");
  }
};
module.exports = authenticateJWT;
