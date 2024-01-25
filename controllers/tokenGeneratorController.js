const JWT = require("jsonwebtoken");
const User = require("../Schemas/UserSchema");
/* 
this file is made to make sure if there is some other way to register or login in front end through firebase
then they can call this api to generate a jwt token and store email & refreshToken on database
then we can verify refreshToken in "refreshController" 
*/

const tokenGeneratorController = async (req, res) => {
  const { uid, email, role } = req.body;

  // generating refreshToken and accessToken below
  const daysInMilliseconds = 20 * 24 * 60 * 60 * 1000;
  const expiresIn = daysInMilliseconds + Date.now(); // timestamp of 20 days later
  const refreshToken = JWT.sign(
    { email: email },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn,
    }
  );

  // ? refreshToken api is in the "useFirebase" hook's "signInWithGoogle" function
  const accessToken = JWT.sign({ uid, email, role }, process.env.SECRET_KEY, {
    expiresIn: "5m",
  });

  // save user info on mongoDB database
  const foundUser = await User.findOne({ email: email });
  if (foundUser) {
    foundUser.refreshToken = refreshToken;
    await foundUser?.save();
  } else {
    await User.create({ email, role, uid, refreshToken });
  }
  console.log(refreshToken, "controller");
  res.status(200).json({ accessToken, srvFile: "tokenGeneratorController.js" });
};
module.exports = tokenGeneratorController;
