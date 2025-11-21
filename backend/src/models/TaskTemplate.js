import mongoose from "mongoose";

const taskTemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  allowed_file_types: {
    type: [String],
    default: []   // ["pdf", "docx", "xlsx", "link"]
  },

  rules: {
    word_count: Number,
    min_rows: Number,
    link_required: Boolean
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("TaskTemplate", taskTemplateSchema);
