const JWT = require("jsonwebtoken");
const User = require("../Schemas/UserSchema");

const refreshTokenController = async (req, res, next) => {
  //!  if i can get the user, but how?

  try {
    const foundUser = await User.findOne({ email });
    console.log(foundUser.refreshToken);
    let refreshToken = foundUser.refreshToken; // last refreshToken

    if (refreshToken) {
      let refreshTokenVerification = JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
        function (err, decoded) {
          // error
          if ((err.name = "TokenExpiredError")) {
            console.log(
              "REFRESH_TOKEN_CONTROLLER:",
              err.name,
              "❌❌❌",
              err.message
            );

            // regenerating refreshToken
            refreshToken = JWT.sign(
              { email: email },
              process.env.REFRESH_TOKEN_KEY,
              {
                expiresIn: "1d",
              }
            );
          } else {
            res.status(403).json({ msg: err.message });
          }
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
