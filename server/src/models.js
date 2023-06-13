const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const {
  validateUniqueUsername,
  validateUniqueEmail,
} = require("./helper-functions");

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is required.",
    validate: [validateUniqueUsername, "Username already exists."],
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required.",
    validate: [validateUniqueEmail, "Email already exists."],
  },
  password: {
    type: String,
    required: "Password is required.",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

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

const OrderSchema = new Schema({
  address: { address: String, floor: String },
  date: Date,
  userId: String,
  notes: String,
  order: Array,
  price: Number,
});

const User = model("User", UserSchema);
const Order = model("Order", OrderSchema);

module.exports = { User, Order };
