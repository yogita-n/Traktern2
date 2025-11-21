import mongoose from "mongoose";

const taskInstanceSchema = new mongoose.Schema({
  template_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskTemplate",
    required: true
  },

  intern_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  mentor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  custom_files: {
    type: [String],
    default: []
  },

  status: {
    type: String,
    enum: ["assigned", "submitted", "verified"],
    default: "assigned"
  },

  deadline: {
    type: Date
  },

  submitted_at: Date,

  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("TaskInstance", taskInstanceSchema);
