import express from "express";
import { validateSignUpFields, authenticate, getUser } from "./middlewares.js";
import {
  signup,
  login,
  checkLoggedIn,
  signout,
  saveOrder,
  getOrderHistory,
  changePassword,
  deleteProfile,
} from "./controllers.js";

const router = express.Router();

router
  .get("/api/check-login", authenticate, getUser, checkLoggedIn)
  .post("/api/signup", validateSignUpFields, signup)
  .post("/api/login", login)
  .get("/api/signout", signout)
  .post("/api/order", authenticate, saveOrder)
  .get("/api/order-history", authenticate, getOrderHistory)
  .patch("/api/change-password", authenticate, getUser, changePassword)
  .delete("/api/delete-profile", authenticate, deleteProfile);

export default router;
