import pkg from "mongoose";
const { Schema, model } = pkg;
import pkgs from "validator";
const { isEmail } = pkgs;
import { hash, compare } from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new Schema({
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
    validate: [isEmail, "Invalid email format."],
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
    this.password = await hash(this.password, 12);
  next();
});

// check if password is correct on login
UserSchema.methods.checkPassword = async function (enteredPassword) {
  let match = await compare(enteredPassword, this.password);
  return match;
};

export default model("User", UserSchema);
