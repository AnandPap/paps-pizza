const express = require("express");
const {
  validateSignUpFields,
  getUser,
  authenticate,
} = require("./middlewares");
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
  .post("/api/signup", validateSignUpFields, signup)
  .post("/api/login", login)
  .get("/api/signout", signout)
  .get("/api/check-login", checkLoggedIn)
  .post("/api/order", authenticate, getUser, saveOrder)
  .get("/api/order-history", authenticate, getUser, getOrderHistory)
  .get("/api/delete-orders", deleteAllOrders);

module.exports = router;
