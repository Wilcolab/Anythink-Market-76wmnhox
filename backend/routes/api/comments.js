/**
 * Express router for handling comment-related API endpoints
 * @module routes/api/comments
 * @requires express
 * @requires mongoose
 */

/**
 * GET /api/comments
 * Retrieves all comments from the database
 * @async
 * @route GET /
 * @returns {Object[]} 200 - Array of all comments
 * @returns {Object} 500 - Error object with message "Failed to fetch comments"
 */

/**
 * DELETE /api/comments/:id
 * Deletes a comment by its ID
 * @async
 * @route DELETE /:id
 * @param {string} id - The MongoDB ObjectId of the comment to delete
 * @returns {Object} 200 - Success message "Comment deleted successfully"
 * @returns {Object} 500 - Error object with message "Failed to delete comment"
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});
// add another endpoint here to delete a comment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});
module.exports = router;
// Hey Github Copilot, please help me write the API endpoints for comments below