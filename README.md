🌙 Moonlite Events Website

A stunning, responsive event management web platform for **Moonlite Events** — your one-stop solution for magical celebrations. From birthdays and weddings to corporate functions, this website brings together elegant UI, user-friendly interactions, and seamless backend handling for client queries.

🌐 Coming soon...

 ✨ Features

- 🎨 Sleek UI/UX with a celestial dark theme and golden highlights
- 🎉 Service Showcase: Interactive grid layout for event services
- 📬 Contact Form with form validation, email delivery, and custom messages
- 🌌 Animated Starry Background with comets for immersive experience
- 📱 Responsive Design for mobile, tablet, and desktop screens
- 🔐 Input Validation & Sanitization for secure backend processing

🚀 Getting Started

 1. Clone the repository

bash
git clone https://github.com/your-username/moonlite-events.git
cd moonlite-events


2. Install backend dependencies

bash
npm install express nodemailer cors dotenv sanitize-html

 3. Create `.env` file

env

PORT=3000

SMTP_HOST=smtp.example.com

SMTP_PORT=587

EMAIL_USER=your-email@example.com

EMAIL_PASS=your-password

RECEIVER_EMAIL=moonliteevents45@gmail.com

⚠️ Never commit your `.env` file.

4. Run the server

bash
node server.js

5. Open in browser

Visit `index.html` or `contact.html` using Live Server or manually open in your browser. Ensure the backend server is running to process contact form submissions.

📬 Contact Form Flow

1. User fills out Name, Phone, Service, and Description.
2. Input is validated and sanitized in `server.js`.
3. On success, details are sent via email using Nodemailer.
4. User receives a success or error message on the page.

 🛡️ Security

All inputs are sanitized using `sanitize-html`.
Regex-based validation prevents invalid or malicious data.
CORS enabled to support cross-origin requests.


🧠 Credits

Made by :- Sharon Melhi & Aditya Banerjee
