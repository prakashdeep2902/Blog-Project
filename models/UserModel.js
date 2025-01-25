import mongoose from "mongoose";
import { error } from "node:console";
import { randomBytes, createHmac } from "node:crypto";
import { createTokenForUser } from "../utils/authentication.js";

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

export async function matchPass(userMobile, password) {
  try {
    const userData = await SignupUsers.findOne({ userMobile });
    if (!userData) {
      const error = new Error("User Not Found");
      error.status = 404;
      throw error;
    }
    const hashedPass = userData.userPassword;
    const userSlat = userData.salt;
    const MakeHashedIncomingPass = createHmac("sha256", userSlat)
      .update(password)
      .digest("hex");

    const isPassMatch = MakeHashedIncomingPass == hashedPass;

    const token = createTokenForUser(userData);
    return { token, isPassMatch };
  } catch (error) {
    console.error("Error in matchPass:", error);
    throw error; // Re-throw the error for further handling
  }
}

export default SignupUsers;
