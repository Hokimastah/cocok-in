const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Coba hubungkan ke MongoDB menggunakan URI dari environment variable
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Terhubung...');
  } catch (err) {
    // Jika gagal, tampilkan error dan hentikan proses
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
