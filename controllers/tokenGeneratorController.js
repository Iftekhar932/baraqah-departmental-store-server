const JWT = require("jsonwebtoken");
const User = require("../Schemas/UserSchema");
/* 
this file is made to make sure if there is some other way to register or login in front end through firebase
then they can call this api to generate a jwt token and store email & refreshToken on database
then we can verify refreshToken in "refreshController" 
*/

const tokenGeneratorController = async (req, res) => {
  const { uid, email, role } = req.body;

  /* 
  ! THIS WHOLE FILE NEEDS TESTING
  */

  /*   // checking if user already exists
? maybe i don't need to check it because that's handled by "firebase"
! remove this code if it is not needed for sure
  const matchPreviousEmail = await User.find({ email: email });
  if (matchPreviousEmail.length > 0) {
    return res.status(409).json({ msg: "User already exists" });
  } */

  // generating refreshToken and accessToken below
  const refreshToken = JWT.sign(
    { email: email },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: "1d",
    }
  );

  const accessToken = JWT.sign({ uid, email, role }, process.env.SECRET_KEY, {
    expiresIn: "5m",
  });

  // save user info on mongoDB database
  User.create({ email, refreshToken });

  res.status(200).json({ accessToken, srvFile: "tokenGeneratorController.js" });
};
module.exports = tokenGeneratorController;
