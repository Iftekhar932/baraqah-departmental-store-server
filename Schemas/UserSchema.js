const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("user", UserSchema);