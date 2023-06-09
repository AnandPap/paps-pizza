const jwt = require("jsonwebtoken");
const config = require("./config");
const { User, Order } = require("./models");
const { capitalizeFirstLetter } = require("./helper-functions");

const signup = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      let errorMessage = "Something went wrong.";
      if (err.errors) {
        for (let key in err.errors) {
          if (err.errors[key].message) {
            errorMessage = capitalizeFirstLetter(err.errors[key].message);
            break;
          }
        }
      }
      res.status(400).json(errorMessage);
    } else res.status(201).json("Successfully created a new user.");
  });
};

const login = (req, res) => {
  try {
    User.findOne({ email: req.body.email }, async (err, user) => {
      if (!req.body.email || !req.body.password)
        return res.status(400).json("Please enter email and password.");
      if (!user)
        return res.status(400).json("Email and password do not match.");
      if (!(await user.checkPassword(req.body.password)))
        return res.status(400).json("Email and password do not match.");
      const loginToken = jwt.sign({ id: user._id }, config.secret);
      res.cookie("loginToken", loginToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 72),
        httpOnly: true,
      });
      res.status(200).json({ message: "Successfully logged in." });
    });
  } catch (err) {
    return res.status(500).json("Server error.");
  }
};

const checkLoggedIn = (req, res) => {
  jwt.verify(req.cookies.loginToken, config.secret, (err, decoded) => {
    if (err) res.json(false);
    else res.json(true);
  });
};

const signout = (req, res) => {
  res.clearCookie("loginToken").status(200).json("User signed out.");
};

const saveOrder = (req, res) => {
  const order = new Order({ email: req.user.email, ...req.body });
  order.save((err, result) => {
    let message = "";
    if (err) {
      for (let errName in err.errors) {
        message =
          err.errors[errName].message.charAt(0).toUpperCase() +
          err.errors[errName].message.slice(1);
        break;
      }
      res.status(400).json(message);
    }
    res.status(200).json("Successfully placed an order.");
  });
};

const getOrderHistory = (req, res, next) => {
  Order.find({ id: req.user.id }, (err, orders) => {
    if (err) res.status(404).json("Not found.");
    res.status(200).json(orders);
  });
};

const deleteAllOrders = (req, res) => {
  const message = Order.deleteMany();
  console.log(message);
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
