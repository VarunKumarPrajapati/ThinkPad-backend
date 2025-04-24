const { getFrontendUrl } = require('../../utils/getURL');
const { sendMail } = require('../emailService');

async function sendResetPasswordMail({ to, token }) {
  const url = `${getFrontendUrl()}/reset-password/${token}`

  return await sendMail({
    to,
    subject: 'Reset Your Password',
    templateName: 'resetPassword',
    data: {
      url
    },
  })
}

module.exports = sendResetPasswordMail;