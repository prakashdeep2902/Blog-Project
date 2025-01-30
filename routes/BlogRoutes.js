import express from "express";
import {
  addBlog,
  handleAddBlog,
  upload,
  getDetailsOfBlog,
} from "../controllers/BlogController.js";

const router = express.Router();
router.get("/add", addBlog);
router.post("/add", upload.single("coverImage"), handleAddBlog);
router.get("/page/:id", getDetailsOfBlog);

export default router;
