const JWT = require("jsonwebtoken");

const authenticateJWT = async (req, res, next) => {
  const { refreshTokenExpiry } = req.body;

  try {
    // for localStorage bearer token
    const headersToken = req.headers.Authorization || req.headers.authorization;

    const token = headersToken?.split(" ")[1];
    // console.log("🍎🍎🍎11auth🍎🍎🍎");

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
        next();
      }
    });
  } catch (error) {
    console.log("✨ 🌟  authenticateJWT  error line23 ❌❌❌", error, "❌❌❌");
    return await res.status(500);
  }
};
module.exports = authenticateJWT;
