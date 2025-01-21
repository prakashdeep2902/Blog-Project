import express from "express";
import {
  getUserSignup,
  HandleUserSignup,
} from "../controllers/SignupUsersControllers.js";
const router = express.Router();

router.get("/signup", getUserSignup);
router.post("/submit", HandleUserSignup);

export default router;
