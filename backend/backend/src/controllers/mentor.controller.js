import User from "../models/User.js";
import InternDetails from "../models/InternDetails.js";

// GET all interns assigned to this mentor
export const getMyInterns = async (req, res) => {
  const interns = await User.find({ mentor_id: req.user._id })
    .select("name email created_at");

  res.json(interns);
};

// GET a specific intern + details
export const getInternDetails = async (req, res) => {
  const intern = await User.findOne({ _id: req.params.id, mentor_id: req.user._id });

  if (!intern)
    return res.status(404).json({ message: "Intern not found or unauthorized" });

  const details = await InternDetails.findOne({ intern_id: intern._id });

  res.json({ intern, details });
};

// ADMIN: assign mentor to intern
export const assignMentor = async (req, res) => {
  const { internId, mentorId } = req.body;

  const updated = await User.findByIdAndUpdate(
    internId,
    { mentor_id: mentorId },
    { new: true }
  );

  res.json({ message: "Mentor assigned", updated });
};
