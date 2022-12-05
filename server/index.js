import express, { json, urlencoded, static as staticServe } from "express";
import pkg from "mongoose";
const { connect } = pkg;
import cors from "cors";
import compress from "compression";
import helmet from "helmet";
import config from "./src/config/config.js";
import userRoutes from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
import { join } from "path";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//asd

const app = express();

app.use(json()); //activated body parse in our code
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(compress());
app.use(
  helmet({
    contentSecurityPolicy: {
      //blocks my login and register attempts if I don't use it
      useDefaults: true,
      directives: {
        "connect-src": ["'self'", "http://localhost:5000"],
        "style-src": [
          "'self'",
          "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css",
        ],
      },
    },
  })
);
app.use(cookieParser());

app.use(userRoutes);

app.listen(config.port, (err) => {
  if (err) return console.log(err);
  console.log(`Server started on port: ${config.port}`);
});

console.log(config.port);

connect(config.mongo)
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log(err));

app.use(staticServe(join(__dirname, "client", "dist", "assets")));
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});
