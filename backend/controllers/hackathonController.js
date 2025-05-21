const FormModel = require("../models/hackathonModel");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
});

exports.submitForm = async (req, res) => {
  const {
    name, rollNumber, college, branch, semester,
    hackathonInstitute, startDate, endDate, email
  } = req.body;

  const hackathonCertificatePath = req.file ? path.join(__dirname, '..', 'hackathonuploads', req.file.filename) : null;
  const submittedAt = new Date().toLocaleString();

  try {
    // Save form data
    const formData = new FormModel({
      name,
      rollNumber,
      college,
      branch,
      semester,
      email,
      hackathonInstitute,
      startDate,
      endDate,
      hackathonCertificatePath: hackathonCertificatePath
    });
    await formData.save();

    const attachments = req.file ? [{
      filename: req.file.originalname,
      path: hackathonCertificatePath,
    }] : [];

    // USER EMAIL CONTENT
    const userEmailContent = `
🎉 Hello ${name}!

Thank you for submitting your Hackathon Application. We have received the following details:

────────────────────────────
👤 Name              : ${name}
🆔 Roll Number       : ${rollNumber}
🏫 College           : ${college}
📚 Branch            : ${branch}
📘 Semester          : ${semester}
🏢 Hackathon Institute: ${hackathonInstitute}
📅 Start Date        : ${startDate}
📅 End Date          : ${endDate}
🕒 Submitted At      : ${submittedAt}
────────────────────────────

📌 Please keep this email for your reference. We'll reach out if anything else is needed.

Best regards,  
College Support Team
    `;

    // ADMIN EMAIL CONTENT
    const adminEmailContent = `
📥 NEW HACKATHON APPLICATION RECEIVED

Submitted At: ${submittedAt}

────────────────────────────
👤 Name              : ${name}
🆔 Roll Number       : ${rollNumber}
🏫 College           : ${college}
📚 Branch            : ${branch}
📘 Semester          : ${semester}
📧 Email             : ${email}
🏢 Hackathon Institute: ${hackathonInstitute}
📅 Start Date        : ${startDate}
📅 End Date          : ${endDate}
📎 Certificate       : ${req.file?.originalname || "No file uploaded"}
────────────────────────────

🔔 Please review the attached certificate and application data in your admin panel.
    `;

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✅ Hackathon Application Confirmation",
      text: userEmailContent,
      attachments,
    });

    // Send full report to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "📥 New Hackathon Application Submission",
      text: adminEmailContent,
      attachments,
    });

    res.status(200).json({ success: true, message: "Form submitted and emails sent!" });

  } catch (error) {
    console.error("❌ Error in submitting form:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await FormModel.find();
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("❌ Error fetching submissions:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

// Updated approveApplication to match rejectApplication
exports.approveApplication = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const application = await FormModel.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, error: "Application not found" });
    }

    // Only send email if email exists
    if (application.email) {
      const emailContent = `We are pleased to inform you that your hackathon application has been approved!\n\nApplication Details:\nName: ${application.name}\nRoll Number: ${application.rollNumber}\nCollege: ${application.college}\nSemester: ${application.semester}\nBranch: ${application.branch}\nHackathon Institute: ${application.hackathonInstitute}\nStart Date: ${application.startDate}\nEnd Date: ${application.endDate}\nStatus: Approved`;

      const attachments = [];
      if (application.hackathonCertificatePath) {
        const absolutePath = path.join(__dirname, '..', application.hackathonCertificatePath.replace(/\//g, path.sep));
        attachments.push({
          filename: 'Approved_Hackathon_Application.pdf',
          path: absolutePath,
          contentType: 'application/pdf',
        });
      }

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: application.email,
          subject: "Hackathon Application Approved",
          text: emailContent,
          attachments: attachments,
        });
        console.log("Approval email sent to:", application.email);
      } catch (emailError) {
        console.error("Error sending approval email:", emailError);
      }
    }

    res.status(200).json({
      success: true,
      message: "Application approved",
      application,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.rejectApplication = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "ID is required" });

    const application = await FormModel.findByIdAndUpdate(
      id,
      { status: "Rejected" },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, error: "Application not found" });
    }

    // Only send email if email exists
    if (application.email) {
      const emailContent = `We are sorry to inform you that your hackathon application has been rejected.\n\nApplication Details:\nName: ${application.name}\nRoll Number: ${application.rollNumber}\nCollege: ${application.college}\nSemester: ${application.semester}\nBranch: ${application.branch}\nHackathon Institute: ${application.hackathonInstitute}\nStart Date: ${application.startDate}\nEnd Date: ${application.endDate}`;

      const attachments = [];
      if (application.hackathonCertificatePath) {
        const absolutePath = path.join(__dirname, '..', application.hackathonCertificatePath.replace(/\//g, path.sep));
        attachments.push({
          filename: 'Rejected_Hackathon_Application.pdf',
          path: absolutePath,
          contentType: 'application/pdf',
        });
      }

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: application.email,
          subject: "Hackathon Application Rejected",
          text: emailContent,
          attachments: attachments,
        });
        console.log("Rejection email sent to:", application.email);
      } catch (emailError) {
        console.error("Error sending rejection email:", emailError);
      }
    }

    res.status(200).json({
      success: true,
      message: "Application rejected",
      application,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

exports.deleteApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await FormModel.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Delete the associated file if it exists
    if (application.hackathonCertificatePath) {
      fs.unlink(application.hackathonCertificatePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Failed to delete application" });
  }
};


exports.getApplicationsUser = async (req, res) => {
  try {
    const { rollNumber } = req.query;
    const query = rollNumber ? { 
      rollNumber: { $regex: new RegExp(`^${rollNumber}$`, 'i') } 
    } : {};
    
    const applications = await FormModel.find(query);
    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("❌ Error fetching submissions:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};