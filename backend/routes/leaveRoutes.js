const express = require("express");
const router = express.Router();
const { submitForm,
    getApplications,
    approveApplication,
    rejectApplication,
    deleteApplication } = require("../controllers/leaveController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../pdfs');
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage }).single("receipt");


router.post("/submit-leave", upload, submitForm);

router.get("/applications3", getApplications);
router.put("/approve-application3", approveApplication);
router.put("/reject-application3", rejectApplication);
router.delete("/delete-application3/:id", deleteApplication);


module.exports = router;
