import mongoose from "mongoose";
import { randomBytes, createHmac } from "node:crypto";

const LoginUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userMobile: {
      type: Number,
      required: true,
      sparse: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profileImage: {
      type: String,
      default: "/images/default_profile-removebg-preview.png",
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

  console.log(user);

  // Skip hashing if the password is not modified
  if (!user.isModified("userPassword")) return next();

  try {
    // Generate a salt
    const salt = randomBytes(16).toString("hex");
    user.salt = salt;

    // Hash the password using the salt
    const hashedPassword = createHmac("sha256", salt)
      .update(user.userPassword)
      .digest("hex");
    user.userPassword = hashedPassword;

    next(); // Proceed to save the document
  } catch (err) {
    next(err); // Pass errors to the next middleware
  }
});

const SignupUsers = mongoose.model("SignupUser", LoginUserSchema);

export default SignupUsers;
