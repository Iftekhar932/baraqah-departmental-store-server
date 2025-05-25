const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  refreshToken: {
    type: String,
  },
  createdAt: {
    type: String,
    default: new Date().now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Regex for strong password: at least 1 uppercase, 1 lowercase, 1 number, 1 special character
  /*   const strongPWD =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
      this.password
    );
  if (!strongPWD) {
    return next(
      new Error(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
        )
        );
        } */

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("user", UserSchema);
