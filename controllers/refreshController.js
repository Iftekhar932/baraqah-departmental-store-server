const JWT = require("jsonwebtoken");
const User = require("../Schemas/UserSchema");
const refreshTokenController = async (req, res, next) => {
  try {
    const { email } = req.body || req.headers;

    if (!email) {
      return res.status(403).json({ msg: "Not logged in" });
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(403).json({ msg: "No user found" });
    }

    // ! TESTING NEEDED IN THIS NEW CODE, THIS WHOLE FILE and also during login jwt has expiry of 10s change it if u want, more comments in "routes.js"
    // ! TESTING NEEDED IN THIS NEW CODE, THIS WHOLE FILE and also during login jwt has expiry of 10s change it if u want, more comments in "routes.js"
    // ! TESTING NEEDED IN THIS NEW CODE, THIS WHOLE FILE and also during login jwt has expiry of 10s change it if u want, more comments in "routes.js"
    // ! TESTING NEEDED IN THIS NEW CODE, THIS WHOLE FILE and also during login jwt has expiry of 10s change it if u want, more comments in "routes.js"

    let refreshToken = foundUser?.refreshToken || "";

    if (!refreshToken) {
      return res.status(403).json({ msg: "No token found" });
    }

    try {
      let refreshTokenVerification = JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      ); // ✅

      // If refreshToken is expired, generate a new refreshToken
      if (refreshTokenVerification.exp < Date.now() / 1000) {
        refreshToken = JWT.sign(
          { email: email },
          process.env.REFRESH_TOKEN_KEY,
          {
            expiresIn: "1d",
          }
        );

        // Update the refreshToken in the user document
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
      }
    } catch (err) {
      console.log("REFRESH_TOKEN_CONTROLLER: LINE49", err.name, err.message);
      return res.status(403).json({ msg: err.message });
    }

    // Check for the existence of accessToken
    let headers = req.headers.authorization || req.headers.Authorization;
    let accessToken = headers.split(" ")[1]; // ✅

    if (accessToken) {
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
                  expiresIn: "1d",
                }
              );
              // Set the new accessToken in the request headers
              req.headers.authorization = `bearer ${accessToken}`;

              res.setHeader("new-access-token", accessToken);
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
