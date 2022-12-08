require("dotenv").config();

const config = {
  port: process.env.PORT || 5000,
  secret: process.env.JWT_SECRET || "secretkey",
  mongo: process.env.MONGO || `mongodb://localhost:27017`,
};

module.exports = config;
