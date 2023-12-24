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

    let refreshToken = foundUser?.refreshToken || "";
    if (!refreshToken) {
      return res.status(403).json({ msg: "You are not Signed up" });
    }

    //!ok the problem i'm facing now is
    // ! when i comment out the res.status(200).json({accessToken:}) below get an error :
    //!Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    let refreshTokenVerification;
    try {
      // If refreshToken is expired, generate a new refreshToken
      refreshTokenVerification = await JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY
      );
      /*  if (refreshTokenVerification.exp >= Date.now()) {
        await res.status(403).json({
          msg: "RefreshToken expired",
          srvFile: "refreshController.js",
          refreshTokenExpiry: true,
        });
        req.body.refreshTokenExpiry = true;
        next();
      } */
    } catch (err) {
      console.log(
        "❌❌❌ refreshController: LINE 44 ",
        "refreshToken expired ❌❌❌",
        err
      );
      req.body.refreshTokenExpiry = true;
      next();
    }
    console.log("ekhane");
    // Check for the existence of accessToken
    let headers = req.headers.authorization || req.headers.Authorization;
    let accessToken = headers.split(" ")[1];
    console.log(refreshTokenVerification);
    if (refreshTokenVerification?.exp >= Date.now())
      if (accessToken) {
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
                const response = await res
                  .status(200)
                  .json({ accessToken, srvFile: "refreshTokenController.js" });
                /* console.log(
                Boolean(response) == false ? false + "79 refreshController" : ""
              );

              return response; */
              } else {
                next();
              }
            }
          }
        );
      }
  } catch (error) {
    console.log("❌❌❌ REFRESH_CONTROLLER ERROR LINE-91: ❌❌❌", error);
    // Consider returning a 500 response here instead of sending the status and then calling json.
    return res.status(500);
  }
};

module.exports = refreshTokenController;
