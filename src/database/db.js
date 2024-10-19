require("dotenv").config();
const { connect } = require("mongoose");

main()
  .then(() => console.log("db connected..."))
  .catch((err) => console.error(err));

async function main() {
  await connect(process.env.DB_URL);
}
