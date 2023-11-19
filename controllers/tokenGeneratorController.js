const JWT = require("jsonwebtoken");

const tokenGeneratorController = (req, res) => {
  const { uid, email, role } = req.body;

  const accessToken = JWT.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: "1m",
  });
  res.json({ accessToken });
};
module.exports = tokenGeneratorController;
