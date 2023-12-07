const JWT = require("jsonwebtoken");
const User = require("../Schemas/UserSchema");

const refreshTokenController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    console.log(foundUser.refreshToken);
    let refreshToken = foundUser?.refreshToken || ""; // last refreshToken

    // if no refreshToken found generate and provide
    if (!refreshToken) {
      return res.status(403).json({ msg: "No token found" });
    }

    if (refreshToken) {
      let refreshTokenVerification = JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
        function (err, decoded) {
          // if expired then generate new refreshToken
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
    }

    // update the refreshToken that user has on storage
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    let accessToken = "";
    if (accessToken) {
      let accessTokenVerification = JWT.verify(
        accessToken,
        process.env.SECRET_KEY,
        function (err, decoded) {
          // if expired then generate new accessToken
          if (err.name == "TokenExpiredError") {
            console.log(
              "ACCESS_TOKEN_CONTROLLER:",
              err.name,
              "❌❌❌",
              err.message
            );

            // regenerating refreshToken then using next()
            accessToken = JWT.sign(
              { email: email, role: foundUser.role },
              process.env.SECRET_KEY,
              {
                expiresIn: "1d",
              }
            );
            next();
          } else {
            // if accessToken is there and not expired then got to next middleware
            next();
          }
        }
      );
    }
  } catch (error) {
    console.log("✨ 🌟  refreshTokenController  error:", error);
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = refreshTokenController;
