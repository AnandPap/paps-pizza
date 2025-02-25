import "dotenv/config";

const config = {
  port: process.env.PORT || 5000,
  secret: process.env.JWT_SECRET || "secretkey",
  mongo: process.env.MONGO || `mongodb://127.0.0.1:27017/Paps-pizza`,
};

export default config;
