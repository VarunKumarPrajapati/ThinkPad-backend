const { sendMail } = require("../emailService");

async function sendWelcomeMail({ to, username }) {
  const mailData = await sendMail({
    to,
    subject: `Welcome, ${username}`,
    templateName: "welcome",
    data: { username },
  });

  return mailData;
}

module.exports = sendWelcomeMail;
