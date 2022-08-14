import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
