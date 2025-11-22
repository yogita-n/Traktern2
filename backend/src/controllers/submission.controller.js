import TaskInstance from "../models/TaskInstance.js";
import Submission from "../models/Submission.js";
import SubmissionArtifact from "../models/SubmissionArtifact.js";
import { supabase } from "../config/supabaseClient.js";

export const submitTask = async (req, res) => {
  try {
    const instanceId = req.params.id;

    // 1. Validate task instance
    const instance = await TaskInstance.findById(instanceId);
    if (!instance)
      return res.status(404).json({ message: "Task not found" });

    // Only owner intern can submit
    if (instance.intern_id.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    // 2. Create submission record
    const submission = await Submission.create({
      task_instance_id: instanceId,
      intern_id: req.user.id,
      submission_text: req.body.text || null,
      submission_link: req.body.link || null
    });

    const fileIds = [];

    // 3. Upload each file to Supabase
    for (const file of req.files) {
      const fileName = `${Date.now()}-${file.originalname}`;

      const { error } = await supabase.storage
        .from("submissions")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype
        });

      if (error) return res.status(500).json({ message: "Upload failed" });

      // Generate public URL
      const { data: publicUrl } = supabase.storage
        .from("submissions")
        .getPublicUrl(fileName);

      // 4. Create file artifact record
      const artifact = await SubmissionArtifact.create({
        submission_id: submission._id,
        file_url: publicUrl.publicUrl,
        original_name: file.originalname,
        mime_type: file.mimetype,
        size_in_bytes: file.size
      });

      fileIds.push(artifact._id);
    }

    // 5. Update submission with linked files
    submission.files = fileIds;
    await submission.save();

    // 6. Update task instance status ONLY
    instance.status = "submitted";
    instance.submitted_at = new Date();
    await instance.save();

    res.json({
      message: "Submission saved successfully",
      submission
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

