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
      //? If refreshToken is expired, generate a new refreshToken
      refreshTokenVerification = await JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
    } catch (err) {
      console.log(
        "❌❌❌ refreshController: LINE 44 ",
        err,
        "refreshToken expired ❌❌❌"
      );
      req.body.refreshTokenExpiry = true;
      next();
      return await res
        .status(403)
        .json({ srvFile: "refreshController", refreshTokenExpiry: true });
    }

    //* Check for the existence of accessToken
    let headers = req.headers.authorization || req.headers.Authorization;
    let accessToken = headers.split(" ")[1];

    console.log(refreshTokenVerification);

    console.log("expiry check er age");
    if (refreshTokenVerification?.exp >= Date.now()) console.log("age2");
    console.log("check er pore");
    if (accessToken) {
      console.log("check er pore accessToken check kori");
      // if accessToken expires generate a new one
      let accessTokenVerification = await JWT.verify(
        accessToken,
        process.env.SECRET_KEY,
        async function (err, decoded) {
          if (err) {
            console.log("REFRESH_CONTROLLER.js:65:", err?.name, err?.message);
            if (err.name == "TokenExpiredError") {
              // console.log("accessToken expired renewing 👈👈👈");
              accessToken = JWT.sign(
                { email: email, role: foundUser.role },
                process.env.SECRET_KEY,
                {
                  expiresIn: "5s",
                }
              );
              return await res
                .status(200)
                .json({ accessToken, srvFile: "refreshTokenController.js" });
            } else {
              console.log("nahole status pathacci");
              req.body.refreshTokenExpiry = true;
              next();
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
