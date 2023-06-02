const express = require("express");
const {
  register,
  login,
  signout,
  authenticate,
  authorize,
  getUser,
  getOrderHistory,
} = require("./controllers");

const router = express.Router();

router
  .post("/api/register", register)
  .post("/api/login", login)
  .get("/api/signout", signout)
  .get("/api/order-history", authorize, getUser, getOrderHistory)
  .get("/api/authenticate", authenticate);

module.exports = router;
