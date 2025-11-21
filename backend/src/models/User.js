import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password_hash: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "mentor", "intern"],
    required: true,
  },

  mentor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  created_at: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("User", userSchema);
