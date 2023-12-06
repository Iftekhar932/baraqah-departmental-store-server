const JWT = require("jsonwebtoken");

const refreshTokenController = (req, res, next) => {
  console.log(req.body.user, "refreshToken line 4"); //! not tested
  const token = JWT.verify(
    token,
    process.env.REFRESH_TOKEN_KEY,
    function (err, decoded) {
      /*     JWT.sign(
        { email: email, role: userInfo.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "10s",
        }
      ); */
    }
  );
  next();
};

module.exports = refreshTokenController;
