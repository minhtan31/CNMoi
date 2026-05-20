const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.warn("MONGODB_URI is not set — database features disabled");
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(
      `MongoDB Connected (${mongoose.connection.name} @ ${mongoose.connection.host})`
    );
    return true;
  } catch (error) {
    console.error("DB Error:", error.message);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    console.warn("Server will continue without database (development mode)");
    return false;
  }
};

module.exports = connectDB;