const FormModel = require("../models/LeaveRequest");
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
        reason, startDate, endDate, email
    } = req.body;

    // In your submitForm controller
    const receiptPath = req.file ? `pdfs/${req.file.filename}` : null;
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
            reason,
            startDate,
            endDate,
            receiptPath,
        });
        await formData.save();

        const attachments = req.file ? [{
            filename: req.file.originalname,
            path: receiptPath,
        }] : [];

        // USER EMAIL CONTENT
        const userEmailContent = `
Hello ${name}!

We have received the following details from your leave request form:

────────────────────────────
👤 Name              : ${name}
🆔 Roll Number       : ${rollNumber}
🏫 College           : ${college}
📚 Branch            : ${branch}
📘 Semester          : ${semester}
💭 Reason            : ${reason}
📅 Start Date        : ${startDate}
📅 End Date          : ${endDate}
🕒 Submitted At      : ${submittedAt}
────────────────────────────

📌 Please keep this email for your reference. We will email you again to approve or reject.

Best regards,  
College Administration
    `;

        // ADMIN EMAIL CONTENT
        const adminEmailContent = `
📥 NEW LEAVE REQUEST RECEIVED

Submitted At: ${submittedAt}

────────────────────────────
👤 Name              : ${name}
🆔 Roll Number       : ${rollNumber}
🏫 College           : ${college}
📚 Branch            : ${branch}
📘 Semester          : ${semester}
📧 Email             : ${email}
💭 Reason:           : ${reason}
📅 Start Date        : ${startDate}
📅 End Date          : ${endDate}
📎 Receipt       : ${req.file?.originalname || "No file uploaded"}
────────────────────────────

🔔 Please review the attached receipt and application data in your admin panel.
    `;

        // Send confirmation to user
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "✅ Leave Request Confirmation",
            text: userEmailContent,
            attachments,
        });

        // Send full report to admin
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: "📥 New Leave Request Submission",
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
// Updated approveApplication function
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

        if (application.email) {
            const emailContent = `We are pleased to inform you that your leave request has been approved!\n\nApplication Details:\nName: ${application.name}\nRoll Number: ${application.rollNumber}\nCollege: ${application.college}\nSemester: ${application.semester}\nBranch: ${application.branch}\nReason: ${application.reason}\nStart Date: ${application.startDate}\nEnd Date: ${application.endDate}\nStatus: Approved`;

            const attachments = [];
            if (application.receiptPath) {
                // Use path.join to create the correct path from the root
                const absolutePath = path.join(__dirname, '../', application.receiptPath);

                // Verify the file exists before attaching
                if (fs.existsSync(absolutePath)) {
                    attachments.push({
                        filename: 'Approved_Leave_Request.pdf',
                        path: absolutePath,
                        contentType: 'application/pdf',
                    });
                } else {
                    console.warn("File not found:", absolutePath);
                }
            }

            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: application.email,
                    subject: "Leave Request Approved",
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
            message: "Request approved",
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
            const emailContent = `We regret to inform you that your leave request has been rejected.\n\nApplication Details:\nName: ${application.name}\nRoll Number: ${application.rollNumber}\nCollege: ${application.college}\nSemester: ${application.semester}\nBranch: ${application.branch}\nReason: ${application.reason}\nStart Date: ${application.startDate}\nEnd Date: ${application.endDate}\nStatus: Rejected`;

            const attachments = [];
            if (application.receiptPath) {
                // Construct proper absolute path
                const absolutePath = path.join(__dirname, '../', application.receiptPath);

                // Verify file exists before attaching
                if (fs.existsSync(absolutePath)) {
                    attachments.push({
                        filename: 'Rejected_Leave_Request.pdf',
                        path: absolutePath,
                        contentType: 'application/pdf',
                    });
                } else {
                    console.warn("File not found for rejection email:", absolutePath);
                }
            }

            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: application.email,
                    subject: "Leave Request Rejected",
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
            message: "Request rejected",
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
        if (application.receiptPath) {
            fs.unlink(application.receiptPath, (err) => {
                if (err) console.error("Error deleting file:", err);
            });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error deleting application:", error);
        res.status(500).json({ error: "Failed to delete application" });
    }
};