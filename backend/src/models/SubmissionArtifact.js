import mongoose from "mongoose";

const submissionArtifactSchema = new mongoose.Schema({
  submission_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
    required: true
  },

  file_url: {
    type: String,
    required: true
  },

  original_name: {
    type: String,
    required: true
  },

  mime_type: {
    type: String,
    required: true
  },

  size_in_bytes: {
    type: Number,
    required: true
  },

  uploaded_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("SubmissionArtifact", submissionArtifactSchema);
