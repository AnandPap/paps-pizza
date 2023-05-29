const express = require("express");
const {
  register,
  login,
  signout,
  getOrderHistory,
  validateCookie,
} = require("./controllers");

const router = express.Router();

router
  .post("/api/register", register)
  .post("/api/login", login)
  .get("/api/signout", signout)
  .get("/api/order-history", getOrderHistory)
  .get("/api/validate-cookie", validateCookie);

module.exports = router;
