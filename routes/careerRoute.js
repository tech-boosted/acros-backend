const express = require("express");
const {
  createCareer,
  getAllCareer,
  updateCareer,
  deleteCareer,
  getCareer,
} = require("../controllers/careerController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/career/new").post(isAuthenticatedUser, createCareer);
router.route("/career/all").get(getAllCareer);
router
  .route("/career/:id")
  .put(isAuthenticatedUser, updateCareer)
  .delete(isAuthenticatedUser, deleteCareer)
  .get(getCareer);

module.exports = router;
