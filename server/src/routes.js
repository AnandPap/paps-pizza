const express = require("express");
const {
  register,
  login,
  signout,
  authenticate,
  authorize,
  saveOrder,
  getUser,
  getOrderHistory,
  deleteAllOrders,
} = require("./controllers");

const router = express.Router();

router
  .post("/api/register", register)
  .post("/api/login", login)
  .get("/api/signout", signout)
  .get("/api/authenticate", authenticate)
  .post("/api/order", authorize, getUser, saveOrder)
  .get("/api/order-history", authorize, getUser, getOrderHistory)
  .get("/api/delete-orders", deleteAllOrders);

module.exports = router;
