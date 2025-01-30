import express from "express";
import {
  addBlog,
  handleAddBlog,
  upload,
  getDetailsOfBlog,
  HandelCommentS,
} from "../controllers/BlogController.js";

const router = express.Router();
router.get("/add", addBlog);
router.post("/add", upload.single("coverImage"), handleAddBlog);
router.get("/page/:id", getDetailsOfBlog);
router.post("/page/comment", HandelCommentS);

export default router;
