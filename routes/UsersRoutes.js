import express from "express";
import {
  getUserSignup,
  HandleUserSignup,
  getLoginPage,
  HandleLoginUser,
  HandleLogOutUser,
} from "../controllers/UsersControllers.js";
const router = express.Router();

router.get("/signup", getUserSignup);
router.post("/submit", HandleUserSignup);
router.get("/login", getLoginPage);
router.post("/login", HandleLoginUser);
router.get("/logout", HandleLogOutUser);

export default router;
