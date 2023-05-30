const { User, OrderHistory } = require("./models");
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
        message =
          err.errors[errName].message.charAt(0).toUpperCase() +
          err.errors[errName].message.slice(1);
      }
    }
    if (err) {
      return res.status(400).json(message);
    }
    res.status(200).json("Successfully created a new user.");
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
      const token = jwt.sign({ id: user._id }, config.secret);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 30 * 60 * 1000),
        httpOnly: true,
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
  } catch (err) {
    return res.status(500).json("Server error.");
  }
};

const signout = (req, res) => {
  return res.clearCookie("token").status(200).json("User signed out.");
};

function authenticate(req, res) {
  if (req.cookies.token) res.send(true);
  else res.send(false);
}

function authorize(req, res) {
  const token = req.cookies.token;
  jwt.verify(token, "config.secret", (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.id;
    next();
  });
}

const getOrderHistory = (req, res) => {
  const userId = req.userId;
  User.findById(userId, (err, user) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    user;
    console.log(user);
  });
};

module.exports = {
  register,
  login,
  signout,
  authenticate,
  authorize,
  getOrderHistory,
};
