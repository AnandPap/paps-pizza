const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: "Name is required.",
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email is required.",
    validate: [validator.isEmail, "Invalid email format."],
  },
  password: {
    type: String,
    required: "Password is required.",
    validate: [checkLength, "Password must be at least 6 characters long."],
  },
});

function checkLength(password) {
  if (password.length < 6) return false;
  return true;
}

UserSchema.plugin(uniqueValidator, { message: "{PATH} already exists!" });

// hash password before save
UserSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 12);
  next();
});

// check if password is correct on login
UserSchema.methods.checkPassword = async function (enteredPassword) {
  let match = await bcrypt.compare(enteredPassword, this.password);
  return match;
};

const OrderSchema = new mongoose.Schema({
  pizzasPicked: Array,
  email: String,
  date: Date,
});

const User = mongoose.model("User", UserSchema);
const Order = mongoose.model("Order", OrderSchema);

module.exports = { User, Order };
