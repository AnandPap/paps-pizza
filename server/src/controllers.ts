import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "./config.js";
import { User, Order } from "./models.js";
import { getSaveErrorMessage } from "./helper-functions.js";

const checkLoggedIn = (req: Request, res: Response) => {
  if (req.user.username) res.status(200).json({ message: req.user.username });
  else res.sendStatus(400);
};

const signup = async (req: Request, res: Response) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json({ message: "Successfully created a new user" });
  } catch (err) {
    res.status(500).json({ error: getSaveErrorMessage(err, "user") });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!req.body.email || !req.body.password)
      res.status(400).json({ error: "Please enter email and password" });
    else if (!user || !(await user.checkPassword(req.body.password)))
      res.status(404).json({ error: "Email and password do not match" });
    else {
      const loginToken = jwt.sign({ id: user._id }, config.secret);
      res
        .cookie("loginToken", loginToken, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 72),
          httpOnly: true,
        })
        .status(200)
        .json({ username: user.username, message: "Logged in" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const signout = (req: Request, res: Response) => {
  res.clearCookie("loginToken").status(200).json({ message: "Signed out" });
};

const saveOrder = async (req: Request, res: Response) => {
  const { pizzas, date, price, address, notes } = req.body;
  try {
    const order = new Order({
      userId: req.userId,
      pizzas: pizzas,
      date: date,
      price: price,
      address: address,
      notes: notes,
    });
    await order.save();
    res.status(201).json({ message: "Successfully placed an order" });
  } catch (err) {
    res.status(500).json({ error: getSaveErrorMessage(err, "order") });
  }
};

const getOrderHistory = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const changePassword = async (req: Request, res: Response) => {
  const user = req.user;
  user.password = req.body.newPassword;
  try {
    await user.save();
    res.status(200).json({ message: "Password changed" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProfile = async (req: Request, res: Response) => {
  try {
    await Order.deleteMany({ userId: req.userId });
    await User.deleteOne({ _id: req.userId });
    res
      .clearCookie("loginToken")
      .status(200)
      .json({ message: "User successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  signup,
  login,
  checkLoggedIn,
  signout,
  saveOrder,
  getOrderHistory,
  changePassword,
  deleteProfile,
};
