import mongoose from "mongoose";
import { randomBytes, createHmac } from "node:crypto";

const LoginUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userMobile: {
      type: String,
      required: true,
      unique: true, // Enforce uniqueness in MongoDB
    },
    userPassword: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
LoginUserSchema.pre("save", function (next) {
  const user = this;
  // Only hash the password if it's new or modified
  if (!user.isModified("userPassword")) return next();
  try {
    const salt = randomBytes(16).toString("hex");
    user.salt = salt;
    const hashedPassword = createHmac("sha256", salt)
      .update(user.userPassword)
      .digest("hex");
    user.userPassword = hashedPassword;

    next();
  } catch (err) {
    next(err);
  }
});

const SignupUsers = mongoose.model("SignupUser", LoginUserSchema);
export default SignupUsers;
