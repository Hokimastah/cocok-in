const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definisikan skema untuk pengguna
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
}, { timestamps: true });

// Middleware (hook) yang berjalan SEBELUM menyimpan user ke database
// Ini digunakan untuk mengenkripsi (hash) password secara otomatis
UserSchema.pre('save', async function (next) {
  // Hanya hash password jika field password diubah (atau saat user baru)
  if (!this.isModified('password')) {
    return next(); // Jika password tidak diubah, langsung lanjutkan
  }

  try {
    // Generate salt dan hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // <-- PERINTAH PENTING: Lanjutkan ke langkah berikutnya (menyimpan user)
  } catch (error) {
    next(error); // Jika ada error, teruskan errornya
  }
});

// Buat dan ekspor model User
module.exports = mongoose.model('User', UserSchema);
