const JWT = require("jsonwebtoken");

/* 
this file is made to make sure if there is some other way to register or login in front end through firebase
then they can call this api to generate a token 
*/

const tokenGeneratorController = (req, res) => {
  const { uid, email, role } = req.body;

  const accessToken = JWT.sign(
    { uid, email: email, role },
    process.env.SECRET_KEY,
    {
      expiresIn: "1m",
    }
  );
  res.json({ accessToken });
};
module.exports = tokenGeneratorController;
