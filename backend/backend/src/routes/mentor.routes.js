import express from "express";
import { auth } from "../middleware/auth.js";
import { mentorOnly } from "../middleware/mentorOnly.js";
import { assignMentor, getMyInterns, getInternDetails } from "../controllers/mentor.controller.js";

const router = express.Router();

// Mentor Dashboard routes
router.get("/my-interns", auth, mentorOnly, getMyInterns);
router.get("/intern/:id", auth, mentorOnly, getInternDetails);

// Admin assigns mentor
router.post("/assign", auth, assignMentor);

export default router;
