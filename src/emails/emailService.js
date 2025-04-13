const transporter = require("../utils/mailer");
const renderTemplate = require("./renderTemplate");

async function sendMail({ to, subject, templateName, data }) {
  const html = await renderTemplate({ templateName, data });

  return transporter.sendMail({
    from: "ThinkPad Support <testrobber@gmail.com>",
    to,
    subject,
    html,
  });
}

module.exports = { sendMail };
