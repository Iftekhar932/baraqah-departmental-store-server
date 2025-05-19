const bcrypt = require("bcrypt");
const User = require("../Schemas/UserSchema.js");
const JWT = require("jsonwebtoken");

const RegisterController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking if user already exists
    const matchPreviousEmail = await User.findOne({ email: email });
    if (matchPreviousEmail != null) {
      return res.status(409).json({ msg: "User already exists" });
    }
    // hashing password
    // const hashedPWD = await bcrypt.hash(password, 10);

    // refreshToken creation
    const refreshToken = JWT.sign(
      { email: email },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );

    // Save the user to the database with credentials
    await User.create({ email: email, password: hashedPWD, refreshToken });

    res.status(201).send({ msg: "User account created" });
  } catch (error) {
    console.log("✨ 🌟  RegisterController  error customRef:line21:", error);
  }
};

module.exports = RegisterController;
