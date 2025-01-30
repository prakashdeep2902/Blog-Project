import express from "express";
import {
  addBlog,
  handleAddBlog,
  upload,
} from "../controllers/BlogController.js";

const router = express.Router();
router.get("/add", addBlog);
router.post("/add", upload.single("coverImage"), handleAddBlog);

export default router;
