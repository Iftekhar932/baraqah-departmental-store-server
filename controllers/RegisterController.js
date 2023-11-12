const bcrypt = require("bcrypt");
const User = require("../Schemas/UserSchema.js");
const JWT = require("jsonwebtoken");

const RegisterController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // checking if user already exists
    const matchPreviousEmail = await User.find({ email: email });
    if (matchPreviousEmail.length > 0) {
      return res.status(409).json({ msg: "User already exists" });
    }

    // hashing password
    const hashedPWD = await bcrypt.hash(password, 10);

    // Save the user to the database
    await User.create({ email: email, password: hashedPWD });

    res.status(201).send({ msg: "User account created" });
  } catch (error) {
    console.log("✨ 🌟  RegisterController  error customRef:line21:", error);
  }
};

module.exports = RegisterController;
