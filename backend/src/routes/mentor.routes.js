import express from "express";
import auth from "../middleware/auth.js";
import mentorOnly from "../middleware/mentorOnly.js";
import { 
  createIntern,
  getMyInterns,
  getInternDetails 
} from "../controllers/mentor.controller.js";

const router = express.Router();

// Mentor creates intern
router.post("/create-intern", auth, mentorOnly, createIntern);

// Mentor sees all interns
router.get("/my-interns", auth, mentorOnly, getMyInterns);

// Mentor sees 1 intern details
router.get("/intern/:id", auth, mentorOnly, getInternDetails);

export default router;

