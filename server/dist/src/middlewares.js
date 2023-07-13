import jwt from "jsonwebtoken";
import config from "./config.js";
import { User } from "./models.js";
import { validateEmailFormat, capitalizeFirstLetter, } from "./helper-functions.js";
const validateSignUpFields = (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    const bodyObject = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    };
    let message = "";
    for (const key in bodyObject) {
        if ((bodyObject[key] == undefined || bodyObject[key].length === 0) &&
            key !== "confirmPassword") {
            return res
                .status(400)
                .json({ error: `${capitalizeFirstLetter(key)} is required` });
        }
        else if (key !== "password" && key !== "confirmPassword")
            bodyObject[key] = bodyObject[key].trim();
    }
    if (username.length < 2)
        message = "Username too short";
    else if (!validateEmailFormat(email))
        message = "Invalid email";
    else if (password.length < 6)
        message = "Password but be at least 6 characters long";
    else if (/\s/.test(password))
        message = "Password must not contain any whitespaces";
    else if (!confirmPassword || password !== confirmPassword)
        message = "Password and confirm password do not match";
    if (message.length > 0)
        return res.status(400).json({ error: message });
    else
        next();
};
const authenticate = async (req, res, next) => {
    jwt.verify(req.cookies.loginToken, config.secret, function (err, decoded) {
        if (err)
            res.sendStatus(403).json({ error: err.message });
        else {
            if (typeof decoded !== "string") {
                req.userId = decoded?.id;
                req.cookieDate = decoded?.iat;
            }
            next();
        }
    });
};
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user)
            res.status(404).json({ error: "User not found" });
        else {
            req.user = user;
            next();
        }
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
export { validateSignUpFields, authenticate, getUser };
