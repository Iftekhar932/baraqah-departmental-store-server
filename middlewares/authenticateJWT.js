const JWT = require("jsonwebtoken");

const authenticateJWT = async (req, res, next) => {
  try {
    const headersToken = req.headers.Authorization || req.headers.authorization;
    const token = headersToken.split(" ")[1];

    JWT.verify(token, process.env.SECRET_KEY, (err, user) => {
      console.log("✨ 🌟  JWT.verify  user:", user);
      if (err) return res.status(403).json("token is not valid");
      req.user = user;
      next();
    });
  } catch (error) {
    console.log("✨ 🌟  authenticateJWT  error CUSTOMCODE:line23  :", error);
  }
};
module.exports = authenticateJWT;
