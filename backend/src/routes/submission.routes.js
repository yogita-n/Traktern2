import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { submitTask } from "../controllers/submission.controller.js";

const router = express.Router();

router.post("/submit/:id", auth, upload.array("files"), submitTask);

export default router;
