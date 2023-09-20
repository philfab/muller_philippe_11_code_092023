const mongoose = require("mongoose");
const databaseUrl =
"mongodb+srv://polo:svTo4Cb7Uy65KIJp@argentbank.dhecmd7.mongodb.net/argentBankDB";

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true });
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`);
    throw new Error(error);
  }
};
