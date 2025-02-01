import mongoose from "mongoose";

const LocalUrl = process.env.MONGO_URL;

mongoose
  .connect(LocalUrl)
  .then((e) => console.log("mongodbconnected"))
  .catch((error) => console.log("mongoDb Not Connected"));

export default mongoose;
