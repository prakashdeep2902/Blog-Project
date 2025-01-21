import mongoose from "mongoose";

const LocalUrl = "mongodb://localhost:27017/blogTech";

mongoose
  .connect(LocalUrl)
  .then((e) => console.log("mongodbconnected"))
  .catch((error) => console.log("mongoDb Not Connected"));

export default mongoose;
