const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Muat variabel lingkungan
dotenv.config();

// Hubungkan ke Database
connectDB();

// Inisialisasi aplikasi
const app = express();
app.use(cors());
app.use(express.json());

// Import dan Gunakan Rute
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));
app.use('/api/recommendations', require('./routes/recRoutes'));
app.use('/api/careers', require('./routes/careerRoutes'));
app.use('/api/consultations', require('./routes/consultationRoutes'));

// Jalankan server untuk pengembangan lokal
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
}

// Ekspor aplikasi untuk Vercel
module.exports = app;
