export const internOnly = (req, res, next) => {
  if (req.user.role !== "intern") {
    return res.status(403).json({ message: "Interns only" });
  }
  next();
};
