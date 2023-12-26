const JWT = require("jsonwebtoken");

/* 
this file is made to make sure if there is some other way to register or login in front end through firebase
then they can call this api to generate a jwt token
*/

const tokenGeneratorController = (req, res) => {
  const { uid, email, role } = req.body;

  const accessToken = JWT.sign({ uid, email, role }, process.env.SECRET_KEY, {
    expiresIn: "5m",
  });

  res.status(200).json({ accessToken, srvFile: "tokenGeneratorController.js" });
};
module.exports = tokenGeneratorController;
