import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { validateUniqueUsername, validateUniqueEmail, } from "./helper-functions.js";
const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Username is required"],
        validate: [validateUniqueUsername, "Username already exists"],
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email is required"],
        validate: [validateUniqueEmail, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
UserSchema.pre("save", async function (next) {
    if (this.password && this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});
UserSchema.methods.checkPassword = async function (enteredPassword) {
    let match = await bcrypt.compare(enteredPassword, this.password);
    return match;
};
const OrderSchema = new Schema({
    userId: String,
    pizzas: Array,
    date: Date,
    price: Number,
    address: { address: String, floor: String },
    notes: String,
});
const User = model("User", UserSchema);
const Order = model("Order", OrderSchema);
export { User, Order };
