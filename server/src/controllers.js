import jwt from "jsonwebtoken";
import config from "./config.js";
import { User, Order } from "./models.js";
import { getSaveErrorMessage } from "./helper-functions.js";

const checkLoggedIn = (req, res) => {
  if (req.user.username) res.status(200).json({ message: req.user.username });
  else res.sendStatus(400);
};

const signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) res.status(400).json({ error: getSaveErrorMessage(err, "user") });
    else res.status(201).json({ message: "Successfully created a new user." });
  });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else if (!req.body.email || !req.body.password)
      res.status(400).json({ error: "Please enter email and password." });
    else if (!user || !(await user.checkPassword(req.body.password)))
      res.status(404).json({ error: "Email and password do not match." });
    else {
      const loginToken = jwt.sign({ id: user._id }, config.secret);
      res
        .cookie("loginToken", loginToken, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 72),
          httpOnly: true,
        })
        .status(200)
        .json({ username: user.username, message: "Logged in" });
    }
  });
};

const signout = (req, res) => {
  res.clearCookie("loginToken").status(200).json({ message: "Signed out" });
};

const saveOrder = (req, res) => {
  const order = new Order({ userId: req.userId, ...req.body });
  order.save((err, result) => {
    if (err) res.status(400).json({ error: getSaveErrorMessage(err, "order") });
    else res.status(201).json({ message: "Successfully placed an order." });
  });
};

const getOrderHistory = (req, res, next) => {
  Order.find({ userId: req.userId }, (err, orders) => {
    if (err) res.status(500).json({ error: "Internal server error" });
    else res.status(200).json(orders);
  });
};

const changePassword = async (req, res) => {
  const user = req.user;
  user.password = req.body.newPassword;
  try {
    await user.save();
    res.status(200).json({ message: "Password changed" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    await Order.deleteMany({ userId: req.userId });
    await User.deleteOne({ _id: req.userId });
    res
      .clearCookie("loginToken")
      .status(200)
      .json({ message: "User successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  signup,
  login,
  checkLoggedIn,
  signout,
  saveOrder,
  getOrderHistory,
  changePassword,
  deleteProfile,
};
