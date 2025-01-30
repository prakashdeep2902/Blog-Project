import express from "express";
import path from "path";
import UsersRoutes from "./routes/UsersRoutes.js";
import BlogRoutes from "./routes/BlogRoutes.js";
import cookieParser from "cookie-parser";
import mongoose from "./DbConnection/local.js";
import { authCookie } from "./middlewares/auth.js";
import blog from "./models/Blog.js";
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authCookie("token"));
app.use(express.static(path.resolve("./public")));

// Routers
app.get("/", async (req, res) => {
  const userData = req.user;
  const Allblogs = await blog.find({});

  res.render("home", {
    user: userData,
    blogs: Allblogs,
  });
});

app.use("/user", UsersRoutes);
app.use("/blog", BlogRoutes);
app.listen(PORT, () => {
  console.log(`server is running on port number ${PORT}`);
});
