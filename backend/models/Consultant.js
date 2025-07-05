const mongoose = require('mongoose');

// Definisikan skema untuk data Konsultan
const ConsultantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Nama konsultan wajib diisi
  },
  university: {
    type: String,
    required: true // Universitas wajib diisi
  },
  major: {
    type: String,
    required: true // Jurusan atau keahlian wajib diisi
  },
  status: {
    type: String,
    // Status hanya boleh salah satu dari tiga pilihan ini
    enum: ['Mahasiswa', 'Profesional', 'Dosen'], 
    required: true
  },
  rating: {
    type: Number,
    default: 0 // Nilai default untuk rating adalah 0
  },
  reviewCount: {
    type: Number,
    default: 0 // Nilai default untuk jumlah ulasan adalah 0
  },
  profilePictureUrl: {
    type: String,
    // URL gambar profil default jika tidak ada yang disediakan
    default: 'https://placehold.co/64x64/E0E0E0/4A3780?text=C' 
  }
});

// Buat dan ekspor model Consultant agar bisa digunakan di bagian lain dari backend
module.exports = mongoose.model('Consultant', ConsultantSchema);
