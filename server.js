const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const sanitizeHtml = require('sanitize-html');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Input validation and sanitization
const validateInput = (data) => {
    const errors = [];
    // Name: required, only letters and spaces, at least 2 chars
    if (
        !data.name ||
        typeof data.name !== 'string' ||
        data.name.trim().length < 2 ||
        !/^[A-Za-z\s]+$/.test(data.name.trim())
    ) {
        errors.push('Name must contain only letters and spaces, and be at least 2 characters.');
    }
    // Phone: required, only digits, 10 digits
    if (
        !data.phone ||
        typeof data.phone !== 'string' ||
        !/^\d{10}$/.test(data.phone.trim())
    ) {
        errors.push('Phone number must be a 10-digit number.');
    }
    // Service: required, non-empty string
    if (!data.service || typeof data.service !== 'string' || !data.service.trim()) {
        errors.push('Service is required.');
    }
    // Description: required, at least 10 chars
    if (
        !data.description ||
        typeof data.description !== 'string' ||
        data.description.trim().length < 10
    ) {
        errors.push('Description must be at least 10 characters.');
    }
    return errors;
};

// Sanitize input to prevent XSS
const sanitizeInput = (data) => {
    return {
        name: sanitizeHtml(data.name),
        phone: sanitizeHtml(data.phone),
        service: sanitizeHtml(data.service),
        description: sanitizeHtml(data.description)
    };
};

// Nodemailer setup
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// POST /contact route
app.post('/contact', async (req, res) => {
    try {
        const { name, phone, service, description } = req.body;

        // Validate inputs
        const errors = validateInput({ name, phone, service, description });
        if (errors.length > 0) {
            return res.status(400).json({ success: false, message: errors.join(' ') });
        }

        // Sanitize inputs
        const sanitizedData = sanitizeInput({ name, phone, service, description });

        // Send email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: 'New Moonlite Service Inquiry',
            html: `
                <h2>New Inquiry</h2>
                <p><strong>Name:</strong> ${sanitizedData.name}</p>
                <p><strong>Phone Number:</strong> ${sanitizedData.phone}</p>
                <p><strong>Service Selected:</strong> ${sanitizedData.service}</p>
                <p><strong>Message:</strong> ${sanitizedData.description}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});