const JWT = require("jsonwebtoken");

const authenticateJWT = async (req, res, next) => {
  const { refreshTokenExpiry } = req.body;

  try {
    // for localStorage bearer token
    const headersToken = req.headers.authorization || req.headers.Authorization;
    const token =
      headersToken && headersToken.startsWith("Bearer ")
        ? headersToken.split(" ")[1]
        : null;
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }
    // verifying access token
    JWT.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) {
        console.log("AUTHENTICATEjWT -LINE-12", err.name, err.message);
        await res.status(403).json({
          msg: err.message,
          name: err.name,
          srvFile: "authenticateJWT.js",
          refreshTokenExpiry,
        });
      } else {
        req.user = user;
        console.log(user);
        next();
      }
    });
  } catch (error) {
    console.log("✨ 🌟  authenticateJWT  error line23 ❌❌❌", error, "❌❌❌");
    return await res.status(500);
  }
};
module.exports = authenticateJWT;
