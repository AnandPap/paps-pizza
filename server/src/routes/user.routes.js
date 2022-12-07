const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router.post("/api/register", userController.register);
router.post("/api/loginnnn", userController.login);
router.post("/api/signout", userController.signout);

module.exports = router;
