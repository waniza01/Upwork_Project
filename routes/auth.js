const express = require("express");

const { check } = require("express-validator");
const Auth = require("../controllers/auth");
const validate = require("../middlewares/validate");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message:
      "You are in the Auth Endpoint. Register or Login to test Authentication.",
  });
});

router.post(
  "/register",
  [
    check("username").not().isEmpty().withMessage("username is required"),
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 8 })
      .withMessage("Must be at least 8 chars long"),
    check("phoneNumber")
      .not()
      .isEmpty()
      .isLength({ min: 11, max: 11 })
      .withMessage("Phone No must be exactly 11 digits"),
  ],
  validate,
  Auth.register
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password").not().isEmpty(),
  ],
  validate,
  Auth.login
);

router.post(
  "/verifyOtp",
  [check("otp").not().isEmpty()],
  validate,
  Auth.verifyOtp
);

module.exports = router;
