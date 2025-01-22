import express from "express";
import {
  getUserSignup,
  HandleUserSignup,
  getLoginPage,
  HandleLoginUser,
} from "../controllers/SignupUsersControllers.js";
const router = express.Router();

router.get("/signup", getUserSignup);
router.post("/submit", HandleUserSignup);
router.get("/login", getLoginPage);
router.post("/login", HandleLoginUser);

export default router;
