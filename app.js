import express from "express";
import path from "path";
import UsersRoutes from "./routes/UsersRoutes.js";
import cookieParser from "cookie-parser";
import mongoose from "./DbConnection/local.js";
import { authCookie } from "./middlewares/auth.js";
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authCookie("token"));

// Routers
app.get("/", (req, res) => {
  const userData = req.user;

  res.render("home", {
    user: userData,
  });
});

app.use("/user", UsersRoutes);
app.listen(PORT, () => {
  console.log(`server is running on port number ${PORT}`);
});
