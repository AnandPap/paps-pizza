const express = require("express");
const mongoose = require("mongoose");
const compress = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const config = require("./src/config/config");
const userRoutes = require("./src/routes/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://paps-pizza-vercel-full.vercel.app/",
    credentials: true,
  })
);

app.use(userRoutes);

app.listen(config.port, (err) => {
  if (err) return console.log(err);
  console.log(`Server started on port: ${config.port}`);
});

mongoose
  .connect(config.mongo)
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "../client", "dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});
