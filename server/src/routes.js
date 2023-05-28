const express = require("express");
const userController = require("./controllers");

const router = express.Router();

router
  .post("/api/register", userController.register)
  .post("/api/login", userController.login)
  .get("/api/signout", userController.signout)
  .get("/api/order-history", userController.getOrderHistory);

module.exports = router;
