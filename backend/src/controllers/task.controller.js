import TaskTemplate from "../models/TaskTemplate.js";
import TaskInstance from "../models/TaskInstance.js";

// ---------------- CREATE TEMPLATE ----------------
export const createTemplate = async (req, res) => {
  try {
    const { title, description, allowed_file_types, rules } = req.body;

    const template = await TaskTemplate.create({
      title,
      description,
      allowed_file_types,
      rules,
      created_by: req.user.id
    });

    res.status(201).json({
      message: "Task template created",
      template
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating task template" });
  }
};

// ---------------- LIST TEMPLATES ----------------
export const getTemplates = async (req, res) => {
  try {
    const templates = await TaskTemplate.find({
      created_by: req.user.id
    });

    res.json(templates);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching templates" });
  }
};

// ---------------- ASSIGN TEMPLATE ----------------
export const assignTemplate = async (req, res) => {
  try {
    const { template_id, interns, deadline } = req.body;

    const mentor_id = req.user.id;

    const instances = await Promise.all(
      interns.map(intern_id =>
        TaskInstance.create({
          template_id,
          intern_id,
          mentor_id,
          deadline
        })
      )
    );

    res.json({
      message: "Task assigned successfully",
      instances
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error assigning task" });
  }
};

// ---------------- GET TASK INSTANCES ----------------
export const getAllTaskInstances = async (req, res) => {
  try {
    const tasks = await TaskInstance.find({ mentor_id: req.user.id })
      .populate("intern_id", "name email")  
      .populate("template_id", "title description");

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching task instances" });
  }
};

// ---------------- GET ONE INSTANCE ----------------
export const getTaskInstance = async (req, res) => {
  try {
    const instance = await TaskInstance.findOne({
      _id: req.params.id,
      mentor_id: req.user.id
    })
      .populate("intern_id", "name email")
      .populate("template_id", "title description rules");

    if (!instance)
      return res.status(404).json({ message: "Task instance not found" });

    res.json(instance);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting task instance" });
  }
};

// ---------------- UNDO ASSIGNMENT ----------------
export const undoAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const instance = await TaskInstance.findById(id);
    if (!instance)
      return res.status(404).json({ message: "Task instance not found" });

    if (instance.status !== "assigned")
      return res.status(400).json({ message: "Cannot undo, already submitted" });

    await TaskInstance.findByIdAndDelete(id);

    res.json({ message: "Assignment undone successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error undoing assignment" });
  }
};
