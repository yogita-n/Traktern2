import Submission from "../models/Submission.js";

export const autoVerify = async (submission, template) => {
  try {
    let score = 100;
    let feedback = [];

    const rules = template.rules || {};

    // TEXT LENGTH CHECK
    if (rules.word_count && submission.submission_text) {
      if (submission.submission_text.length < rules.word_count) {
        score -= 30;
        feedback.push("Text submission too short.");
      }
    }

    // LINK REQUIRED CHECK
    if (rules.link_required) {
      if (!submission.submission_link) {
        score -= 30;
        feedback.push("Required link missing.");
      }
    }

    // EXTRA: YOU CAN ADD FILE TYPE CHECK HERE LATER

    let status = score >= 60 ? "verified" : "rejected";

    await Submission.findByIdAndUpdate(submission._id, {
      status,
      score,
      feedback: feedback.join(" | ")
    });

  } catch (err) {
    console.log("Auto verification error:", err);
  }
};
