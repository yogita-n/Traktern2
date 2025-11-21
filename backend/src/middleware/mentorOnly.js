export default function mentorOnly(req, res, next) {
  if (req.user.role !== "mentor") {
    return res.status(403).json({ message: "Mentor access required" });
  }
  next();
}
