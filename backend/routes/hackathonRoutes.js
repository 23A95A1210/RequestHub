const express = require("express");
const router = express.Router();
const { submitForm,
  getApplications,
  approveApplication,
  rejectApplication,
  deleteApplication } = require("../controllers/hackathonController");
const multer = require("multer");
const path = require("path");


const { getApplicationsUser } = require("../controllers/hackathonController");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "hackathonuploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("hackathoncertificate");

router.post("/submit-hackathon", upload, submitForm);

router.get("/applications2", getApplications);
router.put("/approve-application2", approveApplication);
router.put("/reject-application2", rejectApplication);
router.delete("/delete-application2/:id", deleteApplication);

router.get("/applications5", getApplicationsUser);


module.exports = router;
