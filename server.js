const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle form submission
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    // Configure the email transport
    const transporter = nodemailer.createTransport({
        service: "Gmail", // Replace with your email provider (e.g., Outlook, Yahoo)
        auth: {
            user: "infosiraone@gmail.com", // Your email address
            pass: "itjk vfkw xcgg iefd", // Your email password or app-specific password
        },
    });

    const mailOptions = {
        from: email,
        to: "shiransilva143@gmail.com", // Where to receive the emails
        subject: `[SIRAONE] Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email." });
    }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
