const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const USER = require("../models/user");
const { sendOTP, otp } = require("../helper/otp");

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, username, phoneNumber } = req.body;
    console.log("email", email);

    // Make sure this account doesn't already exist
    const existingUser = await USER.findOne({ email });

    if (existingUser)
      return res.status(401).json({
        message:
          "The email address you have entered is already associated with another account.",
      });

    bcrypt.hash(password, 12).then(async (hashedPassword) => {
      const user = new USER({
        username,
        email,
        password: hashedPassword,
        phoneNumber,
      });

      await user.save();
      res.json({ success: true, message: "Registered successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await USER.findOne({ email });

    if (!user)
      return res.status(401).json({
        msg:
          "The email address " +
          email +
          " is not associated with any account. Double-check your email address and try again.",
      });

    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
        const { _id, username, email, phoneNumber } = user;

        return res.json({
          message: "Sign In Successfully",
          token: token,
          user: { _id, username, email, phoneNumber },
        });
      } else {
        return res.status(422).json({ error: "Invalid Password" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Working

exports.verifyOtp = async (req, res) => {
  try {
    const { OTP } = req.body;

    if (otp != OTP) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
