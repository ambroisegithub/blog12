import express from "express";
import { getAllUsers, login, signup } from "../controllers/user";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.get("/users", getAllUsers);

export default router;
