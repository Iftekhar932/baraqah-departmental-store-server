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

    // verifying refreshToken
    let refreshTokenVerification;
    try {
      //* If refreshToken is expired, generate a new refreshToken
      refreshTokenVerification = await JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      // console.log(refreshTokenVerification);
    } catch (err) {
      console.log(
        "❌❌❌ refreshController: LINE 34 ",
        err?.name,
        err?.message,
        "refreshToken expired ❌❌❌"
      );
      if (err?.name == "TokenExpiredError") {
        console.log(err ? err : "no errors from refreshTokenVerification");
        req.body.refreshTokenExpiry = true;
        return await res
          .status(403)
          .json({ srvFile: "refreshController", refreshTokenExpiry: true });
      }
    }

    //* Check for the existence of accessToken
    let headers = req.headers.authorization || req.headers.Authorization;
    let accessToken = headers.split(" ")[1];

    if (refreshTokenVerification?.exp >= Date.now()) {
      if (accessToken) {
        //* if accessToken expires generate a new one and send it to the client(received in route.js refreshHandlingFunction)
        let accessTokenVerification = await JWT.verify(
          accessToken,
          process.env.SECRET_KEY,
          async function (err, decoded) {
            if (err) {
              if (err?.name == "TokenExpiredError") {
                accessToken = JWT.sign(
                  { email: email, role: foundUser.role },
                  process.env.SECRET_KEY,
                  {
                    expiresIn: "5m",
                  }
                );
                return await res
                  .status(200)
                  .json({ accessToken, srvFile: "refreshTokenController.js" });
              } else {
                next();
                return await res
                  .status(200)
                  .json({ accessToken, srvFile: "refreshTokenController.js" });
              }
            }
          }
        );
      }
    }
  } catch (error) {
    // Consider returning a 500 response here instead of sending the status and then calling json.
    return await res.status(500);
  }
};

module.exports = refreshTokenController;
