const { getFrontendUrl } = require("../../utils/getURL");
const { sendMail } = require("../emailService");

async function sendResetPasswordMail({ to, token, username }) {
  const url = `${getFrontendUrl()}/reset-password/${token}`;

  return await sendMail({
    to,
    subject: "Reset Your Password",
    templateName: "resetPassword",
    data: {
      url,
      username,
    },
  });
}

module.exports = sendResetPasswordMail;
