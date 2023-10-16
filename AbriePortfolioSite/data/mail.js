const { createTransport } = require("nodemailer");

// Setup transporter
const transporter = createTransport({
    host: process.env.BREVO_HOST,
    port: process.env.BREVO_PORT,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_KEY,
    },
});

// Send email using transporter
const sendMail = async (mailData) => {
    await transporter.sendMail(mailData);
};

module.exports = {
    sendMail,
};
