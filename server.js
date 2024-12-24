const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config(); // Load environment variables from a `.env` file

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configure environment variables for sensitive data
const EMAIL_USER = process.env.EMAIL_USER || "infosiraone@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "your-email-password"; // Replace with your app-specific password
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "your-openai-api-key";

// Email Transport Configuration
const transporter = nodemailer.createTransport({
    service: "Gmail", // Replace with your email provider if different
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

// Route to handle form submission
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: "shiransilva143@gmail.com", // Replace with the recipient email address
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

// Initialize OpenAI with your API key
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

// Route to handle chatbot interaction
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Updated to use GPT-3.5 or any available model
            messages: [
                {
                    role: "system",
                    content:
                        "You are Ravana, the SIRAONE AI interface dedicated to helping customers with digital transformation, middleware consultancy, and software development queries.",
                },
                {
                    role: "user",
                    content: message,
                },
            ],
        });

        // Send the AI's response back to the client
        res.json({
            success: true,
            message: response.choices[0].message.content,
        });
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        res.status(500).json({
            success: false,
            message: "Sorry, I couldn't process your request.",
        });
    }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
