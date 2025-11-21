import express from "express";
import auth from "../middleware/auth.js";
import mentorOnly from "../middleware/mentorOnly.js";
import {
  createTemplate,
  getTemplates,
  assignTemplate,
  getAllTaskInstances,
  getTaskInstance,
  undoAssignment
} from "../controllers/task.controller.js";

const router = express.Router();

// Create task template
router.post("/template", auth, mentorOnly, createTemplate);

// List templates
router.get("/template", auth, mentorOnly, getTemplates);

// Assign to interns
router.post("/assign", auth, mentorOnly, assignTemplate);

// Get all task instances
router.get("/instances", auth, mentorOnly, getAllTaskInstances);

// Get one task instance
router.get("/instance/:id", auth, mentorOnly, getTaskInstance);

// Undo assignment
router.delete("/instance/:id", auth, mentorOnly, undoAssignment);

export default router;
