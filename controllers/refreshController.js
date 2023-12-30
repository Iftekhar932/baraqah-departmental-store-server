const JWT = require("jsonwebtoken");
const User = require("../Schemas/UserSchema");
const refreshTokenController = async (req, res, next) => {
  try {
    const { email } = req.body || req.headers;
    if (!email) {
      return await res.status(403).json({ msg: "Not logged in" });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return await res.status(403).json({ msg: "No user found" });
    }

    let refreshToken = foundUser?.refreshToken || "";
    if (!refreshToken) {
      return await res.status(403).json({ msg: "You are not Signed up" });
    }

    let refreshTokenVerification;
    try {
      // console.log("🍎🍎🍎 22 🍎🍎🍎");

      //* If refreshToken is expired, generate a new refreshToken
      refreshTokenVerification = await JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      // console.log("🍎🍎🍎 29 🍎🍎🍎");
    } catch (err) {
      console.log(
        "❌❌❌ refreshController: LINE 29 ",
        err?.name,
        err?.message,
        "refreshToken expired ❌❌❌"
      );
      if (err?.name == "TokenExpiredError") {
        req.body.refreshTokenExpiry = true;
        return await res
          .status(403)
          .json({ srvFile: "refreshController", refreshTokenExpiry: true });
      }
    }

    //* Check for the existence of accessToken
    let headers = req.headers.authorization || req.headers.Authorization;
    let accessToken = headers.split(" ")[1];

    console.log("✨ 🌟  refreshTokenController  accessToken:", accessToken);
    console.log(refreshTokenVerification, "line 55");
    if (refreshTokenVerification?.exp >= Date.now())
      if (accessToken) {
        /* console.log(
        "✨ 🌟  refreshTokenController  refreshTokenVerification?.exp >= Date.now():",
        refreshTokenVerification?.exp >= Date.now()
      ); 
        console.log("🍎🍎🍎 57 🍎🍎🍎");

        console.log("🍎🍎🍎 60 🍎🍎🍎");
*/
        //* if accessToken expires generate a new one and send it to the client(received in route.js refreshHandlingFunction)
        let accessTokenVerification = await JWT.verify(
          accessToken,
          process.env.SECRET_KEY,
          async function (err, decoded) {
            if (err) {
              console.log("REFRESH_CONTROLLER.js:55:", err?.name, err?.message);
              if (err?.name == "TokenExpiredError") {
                // console.log("🍎🍎🍎68 🍎🍎🍎");
                accessToken = JWT.sign(
                  { email: email, role: foundUser.role },
                  process.env.SECRET_KEY,
                  {
                    expiresIn: "10s",
                  }
                );
                // console.log("🍎🍎🍎 67 🍎🍎🍎");

                return await res
                  .status(200)
                  .json({ accessToken, srvFile: "refreshTokenController.js" });
              } else {
                // console.log("🍎🍎🍎 82 🍎🍎🍎");
                next();
                // console.log("🍎🍎🍎84🍎🍎🍎");
                return await res
                  .status(200)
                  .json({ accessToken, srvFile: "refreshTokenController.js" });
              }
            }
          }
        );
      }
  } catch (error) {
    console.log("❌❌❌ REFRESH_CONTROLLER ERROR LINE-91: ❌❌❌", error);
    // Consider returning a 500 response here instead of sending the status and then calling json.
    return await res.status(500);
  }
};

module.exports = refreshTokenController;
