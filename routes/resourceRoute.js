const express = require("express");
const {
  createResource,
  getAllResource,
  updateResource,
  deleteResource,
  getResource,
} = require("../controllers/resourceController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/resource/new").post(isAuthenticatedUser, createResource);
router.route("/resource/all").get(getAllResource);
router
  .route("/resource/:id")
  .put(isAuthenticatedUser, updateResource)
  .delete(isAuthenticatedUser, deleteResource)
  .get(getResource);

module.exports = router;
