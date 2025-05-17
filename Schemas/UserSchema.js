const mongoose = require("mongoose");

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
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: function (value) {
        // Regex for strong password: at least 1 uppercase, 1 lowercase, 1 number, 1 special character
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
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

module.exports = mongoose.model("user", UserSchema);
