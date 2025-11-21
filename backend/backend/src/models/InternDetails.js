import mongoose from "mongoose";

const internDetailsSchema = new mongoose.Schema({
  intern_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  college: String,
  degree: String,
  year: String,

  progress: {
    type: Number,
    default: 0
  },

  skills: [String],

  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("InternDetails", internDetailsSchema);
