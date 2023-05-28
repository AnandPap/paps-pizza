const User = require("./user.model");
const config = require("./config");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json("Passwords do not match");
  const user = new User(req.body);
  user.save((err, result) => {
    let message = "";
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
    if (err) {
      return res.status(400).json(message);
    }
    res.status(200).json("Successfully created a new user.");
  });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (!req.body.email || !req.body.password)
      return res.status(400).json("Please enter email and password.");
    if (!user) return res.status(400).json("Email and password do not match.");
    if (!(await user.checkPassword(req.body.password)))
      return res.status(400).json("Email and password do not match.");
    const token = jwt.sign({ id: user._id }, config.secret);
    res.cookie("token", token, {
      expires: new Date(Date.now() + 20 * 60 * 1000),
    });
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  });
};

const signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json("User signed out.");
};

const getOrderHistory = (req, res) => {};

module.exports = { register, login, signout, getOrderHistory };
