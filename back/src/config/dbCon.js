const mongoose = require("mongoose");

async function dbCon(MONGO_URI) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error conectando MongoDB:", error.message);
    process.exit(1);
  }
}

module.exports = dbCon;
