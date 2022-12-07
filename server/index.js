const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const compress = require("compression");
const helmet = require("helmet");
const config = require("./src/config/config");
const userRoutes = require("./src/routes/user.routes");
const cookieParser = require("cookie-parser");

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

app.use(express.static(path.join(__dirname, "../client", "dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

mongoose
  .connect(config.mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

    // remove poolSize or set according to your need
    // read docs before setting poolSize
    // default to 5
    poolSize: 1,
  })
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log(err));
