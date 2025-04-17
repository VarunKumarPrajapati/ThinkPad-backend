const { sendMail } = require("../emailService");
const { getFrontendUrl } = require("../../utils/getURL");

async function sendVerificationMail({ to, token, username }) {
  const verificationUrl = `${getFrontendUrl()}/verify-email?token=${token}`;

  return await sendMail({
    subject: "Verify Your Email Address",
    to,
    templateName: "verification",
    data: {
      username,
      verificationUrl,
    },
  });
}

module.exports = sendVerificationMail;
