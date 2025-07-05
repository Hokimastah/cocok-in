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
    unique: true, // Email harus unik
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
  // Tambahkan timestamp untuk createdAt dan updatedAt
}, { timestamps: true });

// Middleware (hook) yang berjalan sebelum menyimpan user ke database
// Ini digunakan untuk mengenkripsi (hash) password secara otomatis
UserSchema.pre('save', async function (next) {
  // Hanya hash password jika field password diubah
  if (!this.isModified('password')) {
    next();
  }

  // Generate salt dan hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Buat dan ekspor model User
module.exports = mongoose.model('User', UserSchema);
