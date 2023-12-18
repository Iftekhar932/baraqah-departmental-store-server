const JWT = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  try {
    // for localStorage bearer token
    const headersToken = req.headers.Authorization || req.headers.authorization;

    const token = headersToken?.split(" ")[1];

    JWT.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.log("AUTHENTICATEjWT -LINE-12", err.name, err.message);
        return res.status(403).json({ msg: err.message, name: err.name });
      }

      req.user = user;
      // console.log("✨ 🌟  JWT.verify  User:", user);
      next();
    });
  } catch (error) {
    console.log("✨ 🌟  authenticateJWT  error line23 ❌❌❌", error, "❌❌❌");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = authenticateJWT;
