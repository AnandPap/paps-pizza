import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import compress from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import config from "./src/config.js";
import userRoutes from "./src/routes.js";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
mongoose.set("strictQuery", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compress());
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(userRoutes);
app.listen(config.port, () => console.log(`Server started on port: ${config.port}`));
mongoose
    .connect(config.mongo)
    .then(() => console.log("MongoDB successfully connected..."))
    .catch((err) => console.log(err));
app.use(express.static(join(__dirname, "../../client", "dist")));
app.get("/*", (req, res) => {
    res.sendFile(join(__dirname, "../../client/dist/index.html"));
});
app.use((err, req, res) => {
    console.log(err);
    res.sendStatus(404);
});
