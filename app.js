import express from "express";
import path from "path";
import UsersRoutes from "./routes/UsersRoutes.js";
import mongoose from "./DbConnection/local.js";
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", UsersRoutes);
app.listen(PORT, () => {
  console.log(`server is running on port number ${PORT}`);
});
