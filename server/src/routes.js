const express = require("express");
const { validateSignUpFields, authenticate } = require("./middlewares");
const {
  signup,
  login,
  checkLoggedIn,
  signout,
  saveOrder,
  getOrderHistory,
  deleteAllOrders,
} = require("./controllers");

const router = express.Router();

router
  .get("/api/check-login", checkLoggedIn)
  .post("/api/signup", validateSignUpFields, signup)
  .post("/api/login", login)
  .get("/api/signout", signout)
  .post("/api/order", authenticate, saveOrder)
  .get("/api/order-history", authenticate, getOrderHistory)
  .get("/api/delete-orders", deleteAllOrders);

module.exports = router;
