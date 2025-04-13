const ejs = require("ejs");
const path = require("path");

async function renderTemplate({ templateName, data }) {
  const dir = path.join(__dirname, "templates", `${templateName}.ejs`);
  const html = await ejs.renderFile(dir, data);
  return html;
}

module.exports = renderTemplate;
