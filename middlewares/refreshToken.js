const JWT = require("jsonwebtoken");
const User = require("../Schemas/UserSchema");

/* 
todo make it a controller instead, make an api file, get user email and find user refreshToken, and provide user with another access token
*/

const refreshTokenController = (req, res, next) => {
  try {
    let refreshToken = ""; // last refreshToken

    if (refreshToken) {
      let refreshTokenVerification = JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
        function (err, decoded) {
          if (err) {
            console.log(
              "REFRESH_TOKEN_CONTROLLER:",
              err.name,
              err.message,
              "❌❌❌"
            );
            return res.status(403).json({ msg: err.message });
          }

          // regenerating refreshToken
          refreshToken = JWT.sign(
            { email: email },
            process.env.REFRESH_TOKEN_KEY,
            {
              expiresIn: "1d",
            }
          );
        }
      );
      next();
    } else {
      res.status(403).json({ msg: "no token found" });
    }
  } catch (error) {
    console.log("✨ 🌟  refreshTokenController  error:", error);
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = refreshTokenController;
