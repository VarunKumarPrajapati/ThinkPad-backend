const nm = require("nodemailer");

// const transporter = nm.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.GMAIL_EMAIL,
//     clientId: process.env.GMAIL_CLIENT_ID,
//     clientSecret: process.env.GMAIL_CLIENT_SECRET,
//     refreshToken: process.env.GMAIL_REFRESH_TOKEN,
//   },
// });

const transporter = nm.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;
