const JWT = require("jsonwebtoken");
const User = require("../Schemas/UserSchema");
const refreshTokenController = async (req, res, next) => {
  try {
    const { email } = req.body || req.headers;
    console.log(
      "🚀 ~ file: refreshController.js:6 ~ refreshTokenController ~ email:",
      email
    );

    if (!email) {
      return res.status(403).json({ msg: "Not logged in" });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(403).json({ msg: "No user found" });
    }

    let refreshToken = foundUser?.refreshToken || "";
    if (!refreshToken) {
      return res.status(403).json({ msg: "You are not logged in" });
    }

    try {
      let refreshTokenVerification = JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );

      // If refreshToken is expired, generate a new refreshToken
      if (refreshTokenVerification.exp < Date.now() / 1000) {
        refreshToken = JWT.sign(
          { email: email },
          process.env.REFRESH_TOKEN_KEY,
          {
            expiresIn: "1d",
          }
        );

        // Update the refreshToken in the user document of mongoDB
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
      }
    } catch (err) {
      console.log("REFRESH_TOKEN_CONTROLLER: LINE49", err.name, err.message);
      return res.status(403).json({ msg: err.message });
    }

    // Check for the existence of accessToken
    let headers = req.headers.authorization || req.headers.Authorization;
    let accessToken = headers.split(" ")[1];

    if (accessToken) {
      // if accessToken expires generate a new one
      let accessTokenVerification = JWT.verify(
        accessToken,
        process.env.SECRET_KEY,
        function (err, decoded) {
          if (err) {
            console.log("REFRESHCONTROLLER.js:63:", err?.name, err?.message);
            if (err.name == "TokenExpiredError") {
              console.log("expired renewing 👈👈👈");
              accessToken = JWT.sign(
                { email: email, role: foundUser.role },
                process.env.SECRET_KEY,
                {
                  expiresIn: "5m",
                }
              );
              // Set the new accessToken in the request headers
              req.headers.authorization = `bearer ${accessToken}`;
              res.json({ accessToken });
              next();
            }
          }
        }
      );
    }

    // Move to the next middleware if old accessToken is not expired
    next();
  } catch (error) {
    console.log("✨ 🌟 REFRESHTOKENCONTROLLER ERROR LINE-89:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = refreshTokenController;
