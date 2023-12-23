const JWT = require("jsonwebtoken");
const User = require("../Schemas/UserSchema");
const refreshTokenController = async (req, res, next) => {
  try {
    const { email } = req.body || req.headers;
    /*  console.log(
      "🚀 ~ file: refreshController.js:6 ~ refreshTokenController ~ email:",
      email
    ); */

    if (!email) {
      return res.status(403).json({ msg: "Not logged in" });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(403).json({ msg: "No user found" });
    }

    let refreshToken = foundUser?.refreshToken || "";
    if (!refreshToken) {
      return res.status(403).json({ msg: "You are not Signed up" });
    }

    try {
      // If refreshToken is expired, generate a new refreshToken
      let refreshTokenVerification = JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
        async function (err, decoded) {
          console.log("🚀 ~ file: refreshController.js:30 ~ err:", err);
          if (!err) {
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
        }
      );
      // If refreshToken is expired, generate a new refreshToken
      /*    if (refreshTokenVerification.exp) {
        console.log(refreshTokenVerification.exp, "line33 🍎🍎🍎");
        refreshToken = JWT.sign(
          { email: email },
          process.env.REFRESH_TOKEN_KEY,
          {
            expiresIn: "1d",
          }
        ); */

      // }
    } catch (err) {
      console.log(
        "REFRESH_TOKEN_CONTROLLER: LINE49",
        "refreshToken expired " + err.name,
        err.message
      );
      return res
        .status(403)
        .json({ msg: err?.message, name: err?.name, refreshTokenExpiry: true }); // if refreshToken is not renewed client-side will be aware of that with refreshTokenExpiry
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
              console.log("accessToken expired renewing 👈👈👈");
              accessToken = JWT.sign(
                { email: email, role: foundUser.role },
                process.env.SECRET_KEY,
                {
                  expiresIn: "15m",
                }
              );
              res
                .status(200)
                .json({ accessToken, srvFile: "refreshTokenController.js" });
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
