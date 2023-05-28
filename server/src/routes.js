const express = require("express");
const userController = require("./controllers");

const router = express.Router();

router.post("/api/register", userController.register);
router.post("/api/login", userController.login);
router.post("/api/signout", userController.signout);
router.post("/api/order-history", userController.fetchOrderHistory);

module.exports = router;
