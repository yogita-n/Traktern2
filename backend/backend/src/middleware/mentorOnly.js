export const mentorOnly = (req, res, next) => {
  if (req.user.role !== "mentor" && req.user.role !== "admin") {
    return res.status(403).json({ message: "Mentors only" });
  }
  next();
};
