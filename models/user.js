const mongo = require("mongoose");

const UserSchema = new mongo.Schema({
  username: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    max: 100,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongo.model("USER", UserSchema);
