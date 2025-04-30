import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minLength: 8,
    },
    //   role: {
    //     type: String,
    //     enum: ["user", "admin"],
    //     default: "user",
    //   },
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   updatedAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
