import mongoose from "mongoose";

const internDetailsSchema = new mongoose.Schema({
  intern_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  college_name: {
    type: String,
    required: true
  },

  course: {
    type: String,
    required: true
  },

  start_date: {
    type: Date,
    required: true
  },

  end_date: {
    type: Date,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  department: {
    type: String,
    required: true
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("InternDetails", internDetailsSchema);
