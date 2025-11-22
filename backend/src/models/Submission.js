import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  task_instance_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskInstance",
    required: true,
  },

  intern_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubmissionArtifact"
    }
  ],

  submission_text: {
    type: String,
    default: null
  },

  submission_link: {
    type: String,
    default: null
  },

  status: {
    type: String,
    enum: ["submitted"],
    default: "submitted"
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Submission", submissionSchema);
