import mongoose, { Schema } from "mongoose";

const replayScema = new mongoose.Schema(
  {
    replay: {
      type: String,
      required: true,
    },
    createBy: {
      type: Schema.Types.ObjectId,
      ref: "SignupUser",
    },
  },
  { timestamps: true }
);

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  createBy: {
    type: Schema.Types.ObjectId,
    ref: "SignupUser",
  },
  createByName: {
    type: String, // Changed from Schema.Types.userName to String
  },
  replies: [replayScema],
});

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
    comments: [CommentSchema],
  },
  { timestamps: true }
);

const blog = mongoose.model("Blogs", BlogSchema);

export default blog;
