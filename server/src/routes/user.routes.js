import { Router } from "express";
import { register, login, signout } from "../controllers/user.controller.js";

const router = Router();

router.post("/api/register", register);
router.post("/api/login", login);
router.post("/api/signout", signout);

export default router;
