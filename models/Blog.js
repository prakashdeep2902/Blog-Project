import mongoose, { Schema } from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    coverImage: {
      type: String,
      require: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "SignupUser",
    },
  },
  { timestamps: true }
);

const blog = mongoose.model("Blogs", BlogSchema);

export default blog;
