// Import pustaka yang diperlukan
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Import semua file rute
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const recRoutes = require('./routes/recRoutes'); // Menggunakan nama file yang sudah diperbaiki
const careerRoutes = require('./routes/careerRoutes');
const consultationRoutes = require('./routes/consultationRoutes');

// Muat variabel lingkungan dari file .env
dotenv.config();

// Hubungkan ke database MongoDB
connectDB();

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rute dasar untuk pengujian
app.get('/', (req, res) => {
  res.send('API Cocok.in sedang berjalan...');
});

// Gunakan Rute API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/recommendations', recRoutes); // Menggunakan rute dengan nama yang sudah diperbaiki
app.use('/api/careers', careerRoutes);
app.use('/api/consultations', consultationRoutes);

// Ekspor aplikasi agar bisa digunakan oleh Vercel
// Bagian app.listen() dihapus sesuai panduan deployment Vercel
module.exports = app;
