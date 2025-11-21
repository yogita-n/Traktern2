import User from "../models/User.js";
import InternDetails from "../models/InternDetails.js";
import bcrypt from "bcryptjs";

// ------------------ CREATE INTERN ------------------
export const createIntern = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      college_name,
      course,
      start_date,
      end_date,
      phone,
      department
    } = req.body;

    // Check if email already used
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Intern email already used" });

    const hash = await bcrypt.hash(password, 10);

    // Create intern user
    const intern = await User.create({
      name,
      email,
      password_hash: hash,
      role: "intern",
      mentor_id: req.user._id  // 🔥 auto-map intern to mentor
    });

    // Create intern details
    await InternDetails.create({
      intern_id: intern._id,
      college_name,
      course,
      start_date,
      end_date,
      phone,
      department
    });

    res.status(201).json({
      message: "Intern created successfully",
      intern_id: intern._id
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ GET ALL INTERNS OF THIS MENTOR ------------------
export const getMyInterns = async (req, res) => {
  const interns = await User.find({ mentor_id: req.user._id })
    .select("name email created_at");

  res.json(interns);
};

// ------------------ GET SPECIFIC INTERN DETAILS ------------------
export const getInternDetails = async (req, res) => {
  const intern = await User.findOne({ 
    _id: req.params.id,
    mentor_id: req.user._id
  });

  if (!intern)
    return res.status(404).json({ message: "Intern not found or unauthorized" });

  const details = await InternDetails.findOne({ intern_id: intern._id });

  res.json({ intern, details });
};

// ------------------ ADMIN ONLY: ASSIGN MENTOR TO INTERN ------------------
export const assignMentor = async (req, res) => {
  const { internId, mentorId } = req.body;

  const updated = await User.findByIdAndUpdate(
    internId,
    { mentor_id: mentorId },
    { new: true }
  );

  res.json({ message: "Mentor assigned", updated });
};
