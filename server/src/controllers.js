const jwt = require("jsonwebtoken");
const config = require("./config");
const { User, Order } = require("./models");
const { getSaveErrorMessage } = require("./helper-functions");

const checkLoggedIn = (req, res) => {
  jwt.verify(req.cookies.loginToken, config.secret, (err, decoded) => {
    if (err) res.status(200).json(false);
    else res.status(200).json(true);
  });
};

const signup = (req, res, next) => {
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
        .json({ message: "Successfully logged in." });
    }
  });
};

const signout = (req, res) => {
  res
    .clearCookie("loginToken")
    .status(200)
    .json({ message: "User signed out." });
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

const deleteAllOrders = async (req, res) => {
  Order.deleteMany({}, (err, number) => {
    if (err)
      res
        .status(500)
        .json({ error: "An error occurred while deleting documents." });
    else
      res
        .status(200)
        .json({ message: `Deleted ${number.deletedCount} documents` });
  });
};

module.exports = {
  signup,
  login,
  checkLoggedIn,
  signout,
  saveOrder,
  getOrderHistory,
  deleteAllOrders,
};
