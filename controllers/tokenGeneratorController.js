const JWT = require("jsonwebtoken");

/* 
this file is made to make sure if there is some other way to register or login in front end through firebase
then they can call this api to generate a jwt token
*/

/* 
? I'm not generating any refreshToken for firebase google signIn
? secondly,  I'm not saving any refreshToken in mongoDB, so I need to do that, then test if it doesn't suffice then


?  I'll have to make another api for only "firebase google sign in users"


 ? maybe i can generate refreshToken here and save it on mongodb along with email and then,
 ? if accessToken expires 403 will be sent 
? to client and that'll invoke the new api that i'm going to make(if needed) to get a new accessToken
*/

const tokenGeneratorController = (req, res) => {
  const { uid, email, role } = req.body;

  const accessToken = JWT.sign({ uid, email, role }, process.env.SECRET_KEY, {
    expiresIn: "5m",
  });

  res.status(200).json({ accessToken, srvFile: "tokenGeneratorController.js" });
};
module.exports = tokenGeneratorController;
