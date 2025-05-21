const express = require("express");
const router = express.Router();
const { 
  submitForm, 
  getApplications, 
  approveApplication, 
  rejectApplication, 
  deleteApplication 
} = require("../controllers/formController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("offerLetter");

router.post("/submit-form", upload, submitForm);

router.get("/applications", getApplications);
router.put("/approve-application", approveApplication);
router.put("/reject-application", rejectApplication);
router.delete("/delete-application/:id", deleteApplication);

module.exports = router;