const express = require("express");
const router = express.Router();
const { addFormData, getFormData } = require("../controllers/formController");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/form/new").post(addFormData);
router.route("/form/all").get(getFormData);

module.exports = router;
