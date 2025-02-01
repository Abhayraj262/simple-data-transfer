import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user/user.route.js";
import profileRoute from "./routes/user/profile.route.js";
import fileUpload from 'express-fileupload';
import { cloudinaryConnect } from "./config/cloudinary.js";
import nodemailer from 'nodemailer';

// Configure dotenv
dotenv.config();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

// Create Gmail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use the 16-character app password here
    }
});

// Verify email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('Email verification error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

// .............................................................................
// API endpoint to handle form submission
app.post('/api/submit-form', async (req, res) => {
  const { name, email, phone } = req.body;
  console.log("Received form data:", { name, email, phone });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // You'll receive emails at the same Gmail address
    subject: 'New Contact Form Submission',
    html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    res.status(200).json({ 
        success: true, 
        message: 'Form submitted successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
        success: false, 
        message: 'Error sending email',
        error: error.message 
    });
  }
});

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

cloudinaryConnect();


// Testing the server
app.get("/", (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Server is up and running ...",
    });
  });


//Api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/profile", profileRoute);

// Listening to the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
