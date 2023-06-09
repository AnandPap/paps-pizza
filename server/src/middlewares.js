const jwt = require("jsonwebtoken");
const config = require("./config");
const { validateEmailFormat } = require("./helper-functions");
const { User } = require("./models");

const validateSignUpFields = (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  const bodyObject = {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  };
  let message = "";

  for (key in bodyObject) {
    if (
      (bodyObject[key] == undefined || bodyObject[key].length === 0) &&
      key !== "confirmPassword"
    ) {
      return res.status(400).json(`${capitalizeFirstLetter(key)} is required.`);
    } else if (key !== "password" && key !== "confirmPassword")
      bodyObject[key] = bodyObject[key].trim();
  }

  if (username.length < 2) message = "Username too short.";
  else if (!validateEmailFormat(email)) message = "Invalid email.";
  else if (password.length < 6)
    message = "Password but be at least 6 characters long.";
  else if (/\s/.test(password))
    message = "Password must not contain any whitespaces.";
  else if (!confirmPassword || password !== confirmPassword)
    message = "Password and confirm password do not match.";
  if (message.length > 0) return res.status(400).json(message);
  else next();
};

const getUser = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId, (err, user) => {
    if (err) res.json(err);
    req.user = user;
    next();
  });
};

function authenticate(req, res, next) {
  jwt.verify(req.cookies.loginToken, config.secret, (err, decoded) => {
    if (err) res.sendStatus(403);
    else {
      req.userId = decoded.id;
      req.cookieDate = decoded.iat;
      next();
    }
  });
}

module.exports = { validateSignUpFields, getUser, authenticate };
